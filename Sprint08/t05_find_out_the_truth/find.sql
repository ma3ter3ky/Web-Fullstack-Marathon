USE ucode_web;

SELECT heroes.name
FROM heroes
         JOIN races ON heroes.race_id = races.id
         JOIN heroes_teams ON heroes.id = heroes_teams.hero_id
WHERE heroes.class_role IN ('tankman', 'healer')
  AND heroes.name LIKE '%a%'
  AND races.name != 'Human'
GROUP BY heroes.id
HAVING COUNT(heroes_teams.team_id) >= 2
ORDER BY heroes.id ASC
    LIMIT 1;
