CREATE DATABASE wecomp;

use wecomp;

CREATE TABLE person(
    
    email VARCHAR(30) NOT NULL,
    name VARCHAR(30) NOT NULL,
    password VARCHAR(30) NOT NULL,
    status BOOLEAN NOT NULL DEFAULT FALSE,
    PRIMARY KEY(email)
)ENGINE=INNODB;

CREATE TABLE day(
    
    day DATE NOT NULL,
    PRIMARY KEY(day)
)ENGINE=INNODB;

CREATE TABLE event(
    
    id INT NOT NULL AUTO_INCREMENT,
    day DATE NOT NULL,
    hourStart TIME NOT NULL,
    hourFinish TIME NOT NULL,
    classroom VARCHAR(10) NOT NULL,
    vacancies INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(30) NOT NULL,
    image BLOB NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (day) REFERENCES day(day) ON DELETE CASCADE
)ENGINE=INNODB;

CREATE TABLE subscription(

    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(30) NOT NULL,
    idEvent INT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (email) REFERENCES person(email) ON DELETE CASCADE,
    FOREIGN KEY (idEvent) REFERENCES event(id) ON DELETE CASCADE
    
)ENGINE=INNODB;