import db from "./connection.js";

const isDeleteMode = process.argv.findIndex((argument) => argument === "delete_mode") === -1 ? false : true;

if (isDeleteMode) {
  db.exec(`DROP TABLE IF EXISTS users;`);
  db.exec(`DROP TABLE IF EXISTS posts;`);
}

// DDL
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    token TEXT,
    token_expiration TEXT
  );
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS posts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    is_published BOOLEAN NOT NULL DEFAULT false,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
  );
`);


// DML
if (isDeleteMode) {
  db.exec(`INSERT INTO users (first_name, last_name, email, password) VALUES ('John', 'Doe', 'john_doe@emailprovider.com', '$2a$12$hxhnvxSh0THAcHji9Ac2k.9UWma2HzwviezFENVcmsHhWNod3bdmC')`);
  db.exec(`INSERT INTO posts (title, content, is_published, user_id) VALUES ('My first post', 'This is my first post', true, 1)`);
  db.exec(`INSERT INTO posts (title, content, is_published, user_id) VALUES ('My second post', 'This is my second post', false, 1)`);
  
}
