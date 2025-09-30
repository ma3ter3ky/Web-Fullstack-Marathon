DROP DATABASE IF EXISTS Sprint09_DB;
CREATE DATABASE Sprint09_DB;

USE Sprint09_DB;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    login VARCHAR(63) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    fullname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);


CREATE USER IF NOT EXISTS 'sprint_admin'@'localhost' IDENTIFIED BY 'securepass';
GRANT ALL PRIVILEGES ON Sprint09_DB.* TO 'sprint_admin'@'localhost';
FLUSH PRIVILEGES;

-- command to run: sudo mysql -u root < db.sql