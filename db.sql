CREATE TABLE
    recipe(
        id SERIAL,
        title VARCHAR NOT NULL,
        ingredients TEXT NOT NULL,
        category VARCHAR NOT NULL,
        photo VARCHAR NOT NULL
    );

CREATE TABLE 
    category (
    id SERIAL,
    name VARCHAR NOT NULL,
    description TEXT
);

CREATE TABLE users (
    id SERIAL,
    username VARCHAR NOT NULL,
    password VARCHAR NOT NULL,
    email VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
