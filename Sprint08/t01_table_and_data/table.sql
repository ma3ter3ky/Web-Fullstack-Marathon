USE ucode_web;
DROP TABLE IF EXISTS heroes;

CREATE TABLE heroes
(
    id          SERIAL PRIMARY KEY                NOT NULL,
    name        VARCHAR(30)                       NOT NULL,
    description VARCHAR(1024)                     NOT NULL,
    class_role  ENUM ('tankman', 'healer', 'dps') NOT NULL
);