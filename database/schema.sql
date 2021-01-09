-------------Functions----------------------------

CREATE OR REPLACE FUNCTION get_age( birthday date )
RETURNS int
AS $CODE$
BEGIN
RETURN date_part('year', age(birthday))::int;
END
$CODE$
LANGUAGE plpgsql IMMUTABLE;

-------------Tables-------------------------------

CREATE TABLE Customer (
    customer_id int auto_increment,
    full_name varchar(30),
    nic varchar(10),
    email varchar(20),
    address varchar(50),
    gender char(1),
    dob date,
    age INT GENERATED ALWAYS AS (get_age(dob)) STORED,
    contact_no bigint,
    password varchar(70),
    PRIMARY KEY (customer_id)
);

ALTER TABLE Customer AUTO_INCREMENT = 10001;

CREATE TABLE Pharmacy (
    pharmacy_id int,
    approved_state tinyint(1),
    name varchar(20),
    address varchar(50),
    email varchar(20),
    contact_no bigint,
    //branded_drug_id int,
    password varchar (70),
    PRIMARY KEY (pharmacy_id)
);

ALTER TABLE Pharmacy AUTO_INCREMENT = 30001;

CREATE TABLE Drug_Type (
    drug_type_id int,
    //drug_type_name int,
    branded_drug_id int,
    PRIMARY KEY (drug_type_id),
    FOREIGN KEY (branded_drug_id) REFERENCES Branded_Drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE Drug_Type AUTO_INCREMENT = 40001;

CREATE TABLE Branded_Drug (
    branded_drug_id int auto_increment,
    brand_name varchar(20),
    manufacturer varchar(20),
    drug_type_id varchar(10),
    PRIMARY KEY (branded_drug_id),
    FOREIGN KEY (drug_type_id) REFERENCES Drug_Type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE Branded_Drug AUTO_INCREMENT = 50001;

CREATE TABLE Requests (
    request_id int auto_increment,
    customer_id int,
    //pharmcy_id int,
    //drug_type_id int,
    //branded_drug_id int,
    PRIMARY KEY (request_id),
    FOREIGN KEY (pharmacy_id) REFERENCES Pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (drug_type_id) REFERENCES Drug_Type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES Branded_Drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE Requests AUTO_INCREMENT = 60001;

CREATE TABLE Response (
    response_id int auto_increment,
    request_id int,
    pharmacy_id int,
    //drug_type_id int,
    //branded_drug_id int,
    PRIMARY KEY(response_id),
    FOREIGN KEY (request_id) REFERENCES Requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (pharmacy_id) REFERENCES Pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (drug_type_id) REFERENCES Drug_Type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES Branded_Drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE Requests AUTO_INCREMENT = 70001;

----------------Session Table Schema------------------------------

CREATE TABLE "session" (
    "sid" varchar NOT NULL COLLATE "default",
    "sess" json NOT NULL,
    "expire" timestamp(6) NOT NULL
)
WITH (
    OIDS = FALSE
);

ALTER TABLE "session"
    ADD CONSTRAINT "session_pkey" PRIMARY KEY ("sid") NOT DEFERRABLE INITIALLY IMMEDIATE;

CREATE INDEX "IDX_session_expire" ON "session" ("expire");
