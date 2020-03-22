CREATE TABLE account (
    username VARCHAR(50),
    password VARCHAR(100),
    CONSTRAINT pk_account PRIMARY KEY (username)
);

CREATE TABLE horse (
    name VARCHAR(80),
    id VARCHAR(2),
    CONSTRAINT pk_horse PRIMARY KEY (id)
);

CREATE TABLE room (
    capacity int,
    room_number int,
    CONSTRAINT pk_room PRIMARY KEY (room_number)
);

CREATE TABLE employee (
    name VARCHAR(80),
    id VARCHAR(10),
    CONSTRAINT pk_employee PRIMARY KEY (id)
);