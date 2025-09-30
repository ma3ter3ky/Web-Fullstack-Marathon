USE ucode_web;

SELECT heroes.name AS hero_name, teams.name AS team_name
FROM heroes
         LEFT JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
         LEFT JOIN teams ON heroes_teams.team_id = teams.id;

SELECT heroes.name AS hero_name, powers.name AS power_name
FROM heroes
         LEFT JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
         RIGHT JOIN powers ON heroes_powers.power_id = powers.id;

SELECT heroes.name AS hero_name, powers.name AS power_name, teams.name AS team_name
FROM heroes
         JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
         JOIN powers ON heroes_powers.power_id = powers.id
         JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
         JOIN teams ON heroes_teams.team_id = teams.id;
