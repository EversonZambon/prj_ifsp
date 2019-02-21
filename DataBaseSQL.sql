CREATE TABLE person(
    
    email VARCHAR(50) NOT NULL,
    name VARCHAR(50) NOT NULL,
    cpf VARCHAR(15) NOT NULL,
    password TEXT NOT NULL,
    profile INT NOT NULL DEFAULT 0,
    PRIMARY KEY(email)
);

CREATE TABLE day(
    
    day TIMESTAMP NOT NULL,
    PRIMARY KEY(day)
);

CREATE TABLE event(
    
    id SERIAL,
    day TIMESTAMP NOT NULL,
    hourStart TIME NOT NULL,
    hourFinish TIME NOT NULL,
    workload VARCHAR(8) NOT NULL,
    classroom VARCHAR(15) NOT NULL,
    vacancies INT NOT NULL,
    vacanciesRemaining INT NOT NULL DEFAULT 0,
    title VARCHAR(52) NOT NULL,
    description TEXT NOT NULL,
    speaker VARCHAR(50) NOT NULL,
    photo TEXT,
    PRIMARY KEY(id),
    FOREIGN KEY (day) REFERENCES day(day) ON DELETE CASCADE
);

CREATE TABLE subscription(

    email VARCHAR(50) NOT NULL,
    idEvent INT NOT NULL,
    presence INT DEFAULT 0,
    PRIMARY KEY(email,idEvent),
    FOREIGN KEY (email) REFERENCES person(email) ON DELETE CASCADE,
    FOREIGN KEY (idEvent) REFERENCES event(id) ON DELETE CASCADE
);

CREATE TABLE support(
    
    id SERIAL,
    site TEXT,
    photo TEXT NOT NULL,
    PRIMARY KEY(id)
);

insert into person values ('admin@ifsp.com', 'Admin', '0', '$2a$10$bY1Af27upkZEf4EhwIaRyeybTETuMWIe4Xh5mNi37Q8SGc8hvpJ/m', 1);