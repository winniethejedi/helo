CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR,
    password VARCHAR,
    profile_pic TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INTEGER,
    FOREIGN KEY (author_id) REFERENCES users(id)
);

SELECT * FROM users;
SELECT * FROM posts;