CREATE TABLE main(
    user_id int, -- this is the primary key for the user table
    name VARCHAR(50),
    password VARCHAR(100),
    profile_id int, -- this is the primary key for the profile table
    fitness_goals VARCHAR(200),
    equipment VARCHAR(50),
    workout_duration VARCHAR(100),
    rest_days VARCHAR(500)
);

ALTER TABLE main ADD COLUMN application_id int GENERATED ALWAYS AS IDENTITY PRIMARY KEY;

CREATE TABLE user1(
    user_id int PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(100)
);

CREATE TABLE profile(
    profile_id int PRIMARY KEY,
    fitness_goals VARCHAR(100),
    equipment VARCHAR(50),
    workout_duration VARCHAR(100),
    rest_days VARCHAR(500)
);

ALTER TABLE main 
DROP COLUMN name,
DROP COLUMN password,
DROP COLUMN fitness_goals,
DROP COLUMN equipment,
DROP COLUMN workout_duration,
DROP COLUMN rest_days;

CREATE TABLE new_main AS 
SELECT main.*
, user1.name
, user1.password
, profile.fitness_goals
, profile.equipment
, profile.workout_duration
, profile.rest_days
FROM 
    main
INNER JOIN user1
ON main.user_id = user1.user_id
INNER JOIN profile
ON main.profile_id = profile.profile_id;
