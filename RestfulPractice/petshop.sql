DROP TABLE IF EXISTS pets;

CREATE TABLE pets (
    id serial PRIMARY KEY,
    age int,
    kind text,
    name varchar(20)
);