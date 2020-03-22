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

CREATE TABLE child (
	first_name VARCHAR(80) NOT NULL,
	last_name VARCHAR(80) NOT NULL,
    birthday DATE NOT NULL,
	svnr VARCHAR(15) NOT NULL,
    street VARCHAR(80),
    post_code INT,
    housenumber VARCHAR(10),
    place_name VARCHAR(80),
	gender VARCHAR(20),
	email VARCHAR(80),
	phonenumber1 VARCHAR(80),
	phonenumber1_owner VARCHAR(80),
	phonenumber2 VARCHAR(80),
	phonenumber2_owner VARCHAR(80),
	allergens VARCHAR(80),
	CONSTRAINT pk_child PRIMARY KEY (svnr)
);