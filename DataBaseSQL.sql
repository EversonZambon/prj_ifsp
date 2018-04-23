CREATE DATABASE wecomp;

use wecomp;

CREATE TABLE person(
    
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    cpf VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    profile BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(email)
)ENGINE=INNODB;

CREATE TABLE day(
    
    day DATETIME NOT NULL,
    PRIMARY KEY(day)
)ENGINE=INNODB;

CREATE TABLE event(
    
    id INT NOT NULL AUTO_INCREMENT,
    day DATETIME NOT NULL,
    hourStart TIME NOT NULL,
    hourFinish TIME NOT NULL,
    workload VARCHAR(8) NOT NULL,
    classroom VARCHAR(15) NOT NULL,
    vacancies INT NOT NULL,
    vacanciesRemaining INT NOT NULL DEFAULT 0,
    title VARCHAR(52) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(50) NOT NULL,
    photo LONGTEXT,
    PRIMARY KEY(id),
    FOREIGN KEY (day) REFERENCES day(day) ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE subscription(

    email VARCHAR(50) NOT NULL,
    idEvent INT NOT NULL,
    presence BOOLEAN DEFAULT FALSE,
    PRIMARY KEY(email,idEvent),
    FOREIGN KEY (email) REFERENCES person(email) ON DELETE CASCADE,
    FOREIGN KEY (idEvent) REFERENCES event(id) ON DELETE CASCADE
)ENGINE=INNODB;

insert into person values ("admin@ifsp.com", "Admin", '0', '$2a$10$bY1Af27upkZEf4EhwIaRyeybTETuMWIe4Xh5mNi37Q8SGc8hvpJ/m', 1);