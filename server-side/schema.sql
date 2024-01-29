-- CREATE DATABASE books;
-- USE books;

-- CREATE TABLE books (
--   id INT(10) PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
--   title VARCHAR(255) NOT NULL,
--   author VARCHAR(255) NOT NULL,
--   year INT(4) NOT NULL,
--   deleted_flag INT(1) NOT NULL DEFAULT 0
-- );

-- INSERT INTO books (title, author, year)
-- VALUES 
-- ('The Great Gatsby', 'F. Scott Fitzgerald', 1925),
-- ('To Kill a Mockingbird', 'Harper Lee', 1960),
-- ('1984', 'George Orwell', 1949),
-- ('Pride and Prejudice', 'Jane Austen', 1813),
-- ('Moby-Dick', 'Herman Melville', 1851),
-- ('The Catcher in the Rye', 'J.D. Salinger', 1951),
-- ('The Lord of the Rings', 'J.R.R. Tolkien', 1954);

-- CREATE TABLE user (
--   id INT(11) PRIMARY KEY NOT NULL UNIQUE AUTO_INCREMENT,
--   user_name VARCHAR(11) NOT NULL,
--   fname VARCHAR(11) NOT NULL,
--   lname VARCHAR(11) NOT NULL,
--   password BLOB NOT NULL,
-- );

-- INSERT INTO users (user_name, fname, lname, password)
-- VALUES 
-- ('john_doe', 'John', 'Doe', 'password123'),
-- ('jane_smith', 'Jane', 'Smith', 'password456'),
-- ('alice_walker', 'Alice', 'Walker', 'password789'),
-- ('bob_johnson', 'Bob', 'Johnson', 'passwordabc'),
-- ('emma_davis', 'Emma', 'Davis', 'passworddef');

