DROP TABLE IF EXISTS student;

CREATE TABLE student (
     id INTEGER NOT NULL AUTO_INCREMENT,
     name VARCHAR(128) NOT NULL,
     surname VARCHAR(128) NOT NULL,
     PRIMARY KEY (id)
);