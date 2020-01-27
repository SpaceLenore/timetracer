CREATE TABLE IF NOT EXISTS users (
    username VARCHAR(64) NOT NULL,
    password VARCHAR(255) NOT NULL,
    UNIQUE(username)
);
CREATE TABLE IF NOT EXISTS timestamps (
    username VARCHAR(64) NOT NULL,
    title VARCHAR(255),
    start DATETIME,
    stop DATETIME,
    FOREIGN KEY (username) REFERENCES users(username)
);
