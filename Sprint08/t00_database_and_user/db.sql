CREATE DATABASE ucode_web;

CREATE USER 'ykolesnykov'@'localhost' IDENTIFIED BY 'securepass';

GRANT ALl PRIVILEGES ON ucode_web.* TO 'ykolesnykov'@'localhost';
FLUSH PRIVILEGES;