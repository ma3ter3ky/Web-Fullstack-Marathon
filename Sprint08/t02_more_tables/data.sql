USE ucode_web;

INSERT INTO races (name)
VALUES ('Human'),
       ('Kree');

UPDATE heroes
SET race_id = 2
WHERE name IN ('Groot', 'Thor');
UPDATE heroes
SET race_id = 1
WHERE race_id IS NULL;

INSERT INTO teams (name)
VALUES ('Avengers'),
       ('Hydra');

INSERT INTO powers (name, type)
VALUES ('bloody fist', 'attack'),
       ('iron shield', 'defense'),
       ('energy blast', 'attack'),
       ('cloaking device', 'defense'),
       ('telekinesis', 'attack');

INSERT INTO heroes_powers (hero_id, power_id, power_points)
VALUES (1, 1, 110),
       (1, 2, 200),
       (2, 3, 80),
       (3, 5, 70),
       (4, 4, 60),
       (5, 5, 95),
       (6, 1, 50),
       (7, 3, 40),
       (8, 2, 200),
       (9, 4, 65);

INSERT INTO heroes_teams (hero_id, team_id)
VALUES (1, 1),
       (1, 2),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 2),
       (7, 2),
       (8, 1),
       (9, 1),
       (10, 2);
