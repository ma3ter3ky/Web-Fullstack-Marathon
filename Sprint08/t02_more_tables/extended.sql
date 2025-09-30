USE ucode_web;

CREATE TABLE IF NOT EXISTS powers
(
    id   SERIAL PRIMARY KEY         NOT NULL,
    name VARCHAR(255)               NOT NULL,
    type ENUM ('attack', 'defense') NOT NULL
);

CREATE TABLE IF NOT EXISTS heroes_powers
(
    hero_id      BIGINT UNSIGNED NOT NULL,
    power_id     BIGINT UNSIGNED NOT NULL,
    power_points INT NOT NULL,
    PRIMARY KEY (hero_id, power_id),

    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (power_id) REFERENCES powers (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS races
(
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255)       NOT NULL
);

INSERT INTO races (name) VALUES ('Human'), ('Kree');

ALTER TABLE heroes ADD COLUMN race_id BIGINT UNSIGNED;
UPDATE heroes SET heroes.race_id = 1 WHERE heroes.name NOT IN ('Groot', 'Rocket Raccoon', 'Thor', 'Vision');
UPDATE heroes SET heroes.race_id = 2 WHERE heroes.name IN ('Groot', 'Rocket Raccoon', 'Thor', 'Vision');

ALTER TABLE heroes
    MODIFY race_id BIGINT UNSIGNED NOT NULL,
    ADD CONSTRAINT fk_hero_race FOREIGN KEY (race_id) REFERENCES races(id) ON DELETE CASCADE;

CREATE TABLE IF NOT EXISTS teams
(
    id   SERIAL PRIMARY KEY NOT NULL,
    name VARCHAR(255)       NOT NULL
);

CREATE TABLE IF NOT EXISTS heroes_teams
(
    hero_id BIGINT UNSIGNED NOT NULL,
    team_id BIGINT UNSIGNED NOT NULL,
    PRIMARY KEY (hero_id, team_id),

    FOREIGN KEY (hero_id) REFERENCES heroes (id) ON DELETE CASCADE,
    FOREIGN KEY (team_id) REFERENCES teams (id) ON DELETE CASCADE
);