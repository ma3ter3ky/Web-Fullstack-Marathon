USE ucode_web;

SELECT heroes.name
FROM heroes
         JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
GROUP BY heroes.id
ORDER BY SUM(heroes_powers.power_points) DESC, heroes.id ASC LIMIT 1;



SELECT heroes.name
FROM heroes
         JOIN heroes_powers ON heroes.id = heroes_powers.hero_id
         JOIN powers ON heroes_powers.power_id = powers.id
WHERE powers.type = 'defense'
GROUP BY heroes.id
ORDER BY SUM(heroes_powers.power_points) ASC, heroes.id ASC LIMIT 1;



SELECT heroes.name
FROM heroes
         JOIN heroes_teams AS av_team_link ON heroes.id = av_team_link.hero_id
         JOIN teams AS av_team ON av_team_link.team_id = av_team.id
WHERE av_team.name = 'Avengers'
  AND heroes.id NOT IN (SELECT heroes_teams.hero_id
                        FROM heroes_teams
                                 JOIN teams AS hydra_team ON heroes_teams.team_id = hydra_team.id
                        WHERE hydra_team.name = 'Hydra')
GROUP BY heroes.id
ORDER BY (SELECT SUM(heroes_powers.power_points)
          FROM heroes_powers
          WHERE heroes_powers.hero_id = heroes.id) DESC;



SELECT teams.name, SUM(heroes_powers.power_points) AS total_power
FROM teams
         JOIN heroes_teams ON teams.id = heroes_teams.team_id
         JOIN heroes_powers ON heroes_teams.hero_id = heroes_powers.hero_id
WHERE teams.name IN ('Avengers', 'Hydra')
GROUP BY teams.id
ORDER BY total_power ASC;
