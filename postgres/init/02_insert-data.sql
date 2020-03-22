INSERT INTO account (username, password)
VALUES ('user1', '$2b$12$sJnbncoWrSCXpiY4jGiB4u9d1ydU1E3d6700/WcTZEwMvk3VhObTK');

INSERT INTO account (username, password)
VALUES ('admin', '$2b$12$YsEg3J1BJ/UldeIxkIO2YuO3Q4U5Wt/Xt6kKvEDZMKzoTqC5Hx6D.');

INSERT INTO horse (name, id)
VALUES ('Bounty', 'A1');

INSERT INTO horse (name, id)
VALUES ('Sonny', 'T2');

INSERT INTO horse (name, id)
VALUES ('Pegasus', 'C3');

INSERT INTO horse (name, id)
VALUES ('Maestro', 'Y8');

INSERT INTO horse (name, id)
VALUES ('Blacky', 'X3');

INSERT INTO room (capacity, room_number)
VALUES(4, 1);

INSERT INTO room (capacity, room_number)
VALUES(4, 2);

INSERT INTO room (capacity, room_number)
VALUES(6, 3);

INSERT INTO room (capacity, room_number)
VALUES(6, 4);

INSERT INTO room (capacity, room_number)
VALUES(4, 5);

INSERT INTO child (first_name, last_name, email, street, post_code, housenumber, place_name, phonenumber1, phonenumber1_owner, phonenumber2, phonenumber2_owner, birthday, gender, svnr, allergens)
VALUES ('Max', 'Mair', 'franz.mair@gmail.com', 'Bahnhofsstraße', 4020, '42', 'Linz', '+43 664/12345678', 'Franz Mair (Vater)', '+43 664/87654321', 'Martina Mair (Mutter)', '2006-06-22', 'männlich', '220606-3859', 'Nuss, Soya, Gluten');

INSERT INTO child (first_name, last_name, email, street, post_code, housenumber, place_name, phonenumber1, phonenumber1_owner, phonenumber2, phonenumber2_owner, birthday, gender, svnr, allergens)
VALUES ('Julia', 'Müller', 'mueller.victoria@gmx.at', 'Buchenweg', 4890, '2a', 'Frankenmarkt', '+43 699/12345678', 'Tobias Müller (Vater)', '+43 650/87654321', 'Victoria Müller (Mutter)', '2004-02-10', 'weiblich', '100204-7259', 'keine');

INSERT INTO child (first_name, last_name, birthday, svnr)
VALUES ('Simon', 'Weber', '2005-10-10', '101005-1842');