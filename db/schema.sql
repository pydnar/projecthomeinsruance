USE c9tbk1oei4eajy1s;

CREATE TABLE users (

id_email VARCHAR(255),
firstname VARCHAR(50),
lastname VARCHAR(50),
phone VARCHAR(20),
address VARCHAR(255),
isagent BOOLEAN DEFAULT false,
userpassword varchar(50),
PRIMARY KEY (id_email)

);


CREATE TABLE homeassets (

id INTEGER AUTO_INCREMENT,
itemname VARCHAR(100),
custunitvalue DOUBLE(20,2),
id_email VARCHAR(50),
amazonunitvalue DOUBLE(20,2),
quantity INTEGER,
totalcustvalue DOUBLE(20,2),
totalamazonvalue DOUBLE(20,2),
image VARCHAR(255),
PRIMARY KEY (id),
FOREIGN KEY fk_id(id_email)
REFERENCES users(id_email)
);