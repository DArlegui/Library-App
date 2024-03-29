import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
dotenv.config(); // Allows us to access the .env

const app = express();
const port = process.env.PORT; // default port to listen

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const corsOptions = {
  origin: '*',
  credentials: true,
  'access-control-allow-credentials': true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Makes Express parse the JSON body of any requests and adds the body to the req object
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    // Connecting to our SQL db. req gets modified and is available down the line in other middleware and endpoint functions
    req.db = await pool.getConnection();
    req.db.connection.config.namedPlaceholders = true;

    // Traditional mode ensures not null is respected for unsupplied fields, ensures valid JavaScript dates, etc.
    await req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
    await req.db.query(`SET time_zone = '-8:00'`);

    // Moves the request on down the line to the next middleware functions and/or the endpoint it's headed for
    next();

    // After the endpoint has been reached and resolved, disconnects from the database
    req.db.release();
  } catch (err) {
    // If anything downstream throw an error, we must release the connection allocated for the request
    console.log(err);
    // If an error occurs, disconnects from the database
    if (req.db) req.db.release();
    throw err;
  }
});

// app.get('/books/:id', async function (req, res) {
//   try {
//     const bookId = req.params.id;
//     const [book] = await req.db.query('SELECT * FROM books WHERE id = ? LIMIT 1', [bookId]);

//     if (!book || book.length === 0) {
//       res.status(404).json({ success: false, message: 'Book not found', data: null });
//     } else {
//       res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
//     }
//   } catch (err) {
//     res.status(500).json({ success: false, message: 'Internal server error', data: null });
//   }
// });

/* LOGIN DB BELOW */
// Hashes the password and inserts the info into the `user` table
app.post('/register', async function (req, res) {
  try {
    const { password, username } = req.body;

    if (!password || !username) {
      return res.json({ error: 'Username or password is not defined!', success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await req.db.query(
      `INSERT INTO user (user_name, password)
      VALUES (:username, :hashedPassword);`,
      { username, hashedPassword }
    );

    const jwtEncodedUser = jwt.sign({ userId: user.insertId, ...req.body }, process.env.JWT_KEY);

    res.json({ jwt: jwtEncodedUser, success: true });
  } catch (error) {
    console.log('error', error);
    res.json({ error, success: false });
  }
});

app.post('/log-in', async function (req, res) {
  try {
    const { username, password: userEnteredPassword } = req.body;
    const [[user]] = await req.db.query(`SELECT * FROM user WHERE user_name = :username`, { username });

    if (!user || !user.password) {
      res.json({ error: 'User or password is not defined!', success: false });
      return;
    }

    const hashedPassword = `${user.password}`;
    const passwordMatches = await bcrypt.compare(userEnteredPassword, hashedPassword);

    if (passwordMatches) {
      const payload = {
        userId: user.id,
        username: user.username,
      };

      const jwtEncodedUser = jwt.sign(payload, process.env.JWT_KEY);

      res.json({ jwt: jwtEncodedUser, success: true });
    } else {
      res.json({ error: 'Invalid password', success: false });
    }
  } catch (err) {
    console.log('Error in /authenticate', err);
  }
});

//Jwt verification checks to see if there is an authorization header with a valid jwt in it.
app.use(async function verifyJwt(req, res, next) {
  const { authorization: authHeader } = req.headers;

  if (!authHeader) {
    res.json('Invalid authorization, no authorization headers');
    return;
  }

  const [scheme, jwtToken] = authHeader.split(' ');

  if (scheme !== 'Bearer') res.json('Invalid authorization, invalid authorization scheme');

  try {
    const decodedJwtObject = jwt.verify(jwtToken, process.env.JWT_KEY);

    req.user = decodedJwtObject;
  } catch (err) {
    console.log(err);
    if (err.message && (err.message.toUpperCase() === 'INVALID TOKEN' || err.message.toUpperCase() === 'JWT EXPIRED')) {
      req.status = err.status || 500;
      req.body = err.message;
      req.app.emit('jwt-error', err, req);
    } else {
      throw (err.status || 500, err.message);
    }
  }

  await next();
});

app.post('/books', async (req, res) => {
  const { img_url, title, author, year } = req.body;
  const { userId } = req.user;

  const [insert] = await req.db.query(
    `INSERT INTO books (img_url, title, author, year, user_id, date_created, deleted_flag) 
    VALUES (:img_url, :title, :author, :year, :user_id, NOW(), :deleted_flag)`,
    { img_url, title, author, year, user_id: userId, deleted_flag: 0 }
  );

  //To Check
  res.status(201).json({
    id: insert.insertId,
    img_url,
    title,
    author,
    year,
    userId,
  });
});

app.get('/books', async (req, res) => {
  const { userId } = req.user;
  const [books] = await req.db.query('SELECT * FROM books WHERE user_id = :userId AND deleted_flag = 0', { userId });

  res.status(200).json({ books });
});

app.delete('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  await req.db.query('UPDATE books SET deleted_flag = 1 WHERE id = :id AND user_id = :userId', { id, userId });

  res.status(204).json({ success: true, message: 'Book successfully deleted' });
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { userId } = req.user;

  const [book] = await req.db.query('SELECT * FROM books WHERE id = :id AND user_id = :userId', { id, userId });

  if (!book || book.length === 0) {
    res.status(404).json({ success: false, message: 'Book not found' });
  } else {
    res.status(200).json({ success: true, message: 'Book retrieved successfully', data: book });
  }
});

app.put('/books/:id', async (req, res) => {
  const { id } = req.params;
  const { img_url, title, author, year } = req.body;
  const { userId } = req.user;

  await req.db.query(
    'UPDATE books SET img_url = :img_url, title = :title, author = :author, year = :year WHERE id = :id AND user_id = :userId',
    { img_url, title, author, year, id, userId }
  );

  res.status(200).json({ success: true, message: 'Book successfully updated' });
});

// Start the Express server
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
