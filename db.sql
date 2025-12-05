CREATE TABLE users(
id SERIAL PRIMARY KEY,
Name varchar(255) NOT NULL,
email varchar(255) UNIQUE NOT NULL,
hashedpassword varchar(255) NOT NULL
);