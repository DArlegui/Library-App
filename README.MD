# Book Management System

This project is a Book Management System that allows users to register, log in, add, view, update, and delete books. It consists of both client-side and server-side components. Uses MySQL for the database, Express for the server, and React for the client.

## Client Side

### Features

1. **Registration and Login:** Users can register for an account and log in securely.
2. **User Authentication:** JWT (JSON Web Token) is used for user authentication.
3. **User Interface:** The user interface is built using React for a seamless and interactive experience.
4. **Adding Books:** Users can add books to their collection by providing details such as image URL, title, author, and publication year.
5. **Viewing Books:** Users can view their collection of books, including details such as image, title, author, and publication year.
6. **Updating Books:** Users can update the details of existing books in their collection.
7. **Deleting Books:** Users can delete books from their collection.

## Server Side

### Features

1. **RESTful API:** The server provides a RESTful API for handling CRUD operations on books.
2. **Database Integration:** MySQL is used as the database to store book information and user data.
3. **Password Hashing:** User passwords are securely hashed using bcrypt before storing them in the database.
4. **User Authentication:** JWT is used for user authentication, ensuring secure access to protected endpoints.
5. **Middleware:** Express middleware is used for error handling, CORS (Cross-Origin Resource Sharing) configuration, and database connection management.

## Getting Started

To run the project locally, follow these steps:

1. Clone the repository.
2. Navigate to the `client` directory and run `npm install` to install dependencies.
3. Navigate to the `server` directory and run `npm install` to install server dependencies.
4. Create a `.env` file in the `server` directory and configure the following environment variables:
   - `PORT`: Port number for the server to listen on.
   - `DB_HOST`: MySQL database host.
   - `DB_USER`: MySQL database user.
   - `DB_PASSWORD`: MySQL database password.
   - `DB_NAME`: MySQL database name.
   - `JWT_KEY`: Secret key for JWT encryption.
5. Run `npm start` in both the `client` and `server` directories to start the client and server respectively.

## Dependencies

- React
- Express
- bcrypt
- jsonwebtoken
- mysql2
- dotenv
- body-parser
- cors

## Contributing

Contributions are welcome! Feel free to open issues or pull requests for any improvements or additional features you'd like to see in the project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
