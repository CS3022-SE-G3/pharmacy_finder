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

CREATE TABLE customer (
    customer_id int auto_increment,
    full_name varchar(50),
    nic varchar(30),
    email varchar(50),
    address varchar(50),
    gender char(1),
    dob date,
    age INT GENERATED ALWAYS AS (get_age(dob)) STORED,
    contact_no bigint,
    password varchar(70),
    PRIMARY KEY (customer_id)
);

ALTER TABLE customer AUTO_INCREMENT = 10001;

CREATE TABLE pharmacy (
    pharmacy_id int auto_increment,
    approved_state tinyint(1),
    name varchar(50),
    address varchar(70),
    email varchar(50),
    contact_no bigint,
    password varchar (70),
    PRIMARY KEY (pharmacy_id)
);

ALTER TABLE pharmacy AUTO_INCREMENT = 30001;

CREATE TABLE drug_type (
    drug_type_id int auto_increment,
    drug_type_name varchar(50),
    PRIMARY KEY (drug_type_id),
);

ALTER TABLE Drug_Type AUTO_INCREMENT = 40001;

CREATE TABLE branded_drug (
    branded_drug_id int auto_increment,
    brand_name varchar(50),
    manufacturer varchar(50),
    drug_type_id int,
    PRIMARY KEY (branded_drug_id),
    FOREIGN KEY (drug_type_id) REFERENCES drug_type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE branded_drug AUTO_INCREMENT = 50001;

CREATE TABLE requests (
    request_id int auto_increment,
    customer_id int,
    PRIMARY KEY (request_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE requests AUTO_INCREMENT = 60001;

CREATE TABLE response (
    response_id int auto_increment,
    request_id int,
    pharmacy_id int,
    PRIMARY KEY(response_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE response AUTO_INCREMENT = 70001;

CREATE TABLE pahrmcay_drug_types (
    pharmacy_id int,
    drug_type_id int,
    PRIMARY KEY (pharmacy_id, drug_type_id),
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (drug_type_id) REFERENCES drug_type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE pharmacy_branded_drugs (
    pharmacy_id int,
    branded_drug_id int,
    PRIMARY KEY (pharmacy_id, branded_drug_id),
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES branded_drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requests_and_associated_pharmacies (
    request_id int,
    pharmacy_id int,
    PRIMARY KEY (request_id, pharmacy_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requests_and_associated_drug_types (
    request_id int,
    drug_type_id int,
    PRIMARY KEY (request_id, drug_type_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (drug_type_id) REFERENCES drug_type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requests_and_associated_branded_drugs (
    request_id int,
    branded_drug_id int,
    PRIMARY KEY (request_id, branded_drug_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES branded_drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE responses_and_associated_drug_types (
    response_id int,
    drug_type_id int,
    PRIMARY KEY (response_id, drug_type_id),
    FOREIGN KEY (response_id) REFERENCES response(response_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (drug_type_id) REFERENCES drug_type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE requests_and_associated_branded_drugs (
    response_id int,
    branded_drug_id int,
    PRIMARY KEY (response_id, branded_drug_id),
    FOREIGN KEY (response_id) REFERENCES response(response_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES branded_drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

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