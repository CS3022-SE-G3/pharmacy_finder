
CREATE TABLE customer (
    customer_id int auto_increment,
    full_name varchar(50) NOT NULL,
    nic varchar(30) NOT NULL,
    email varchar(50) NOT NULL,
    address varchar(50) NOT NULL,
    longitude numeric(8, 6) NOT NULL,
    latitude numeric(8, 6) NOT NULL,
    gender ENUM('Male', 'Female', 'Other') NOT NULL,
    dob text NOT NULL,
    contact_no bigint NOT NULL,
    password varchar(70) NOT NULL,
    PRIMARY KEY (customer_id),
    UNIQUE(email)
);

ALTER TABLE customer AUTO_INCREMENT = 10001;
ALTER TABLE customer ADD INDEX  (`email`);
ALTER TABLE customer ADD INDEX  (`longitude`);
ALTER TABLE customer ADD INDEX  (`latitude`);


CREATE TABLE pharmacy (
    pharmacy_id int auto_increment,
    approved_state ENUM('Not Approved', 'Approved') NOT NULL DEFAULT 'Not Approved',
    name varchar(50) NOT NULL,
    address varchar(70) NOT NULL,
    longitude numeric(8,6) NOT NULL,
    latitude numeric(8,6) NOT NULL,
    email varchar(50) NOT NULL,
    contact_no bigint NOT NULL,
    password varchar (70) NOT NULL,
    PRIMARY KEY (pharmacy_id),
    UNIQUE(email)
);

ALTER TABLE pharmacy AUTO_INCREMENT = 30001;
ALTER TABLE pharmacy ADD INDEX  (`approved_state`);
ALTER TABLE pharmacy ADD INDEX  (`email`);
ALTER TABLE pharmacy ADD INDEX  (`longitude`);
ALTER TABLE pharmacy ADD INDEX  (`latitude`);

CREATE TABLE drug_type (
    drug_type_id int auto_increment,
    drug_type_name varchar(50) NOT NULL,
    is_deleted TINYINT(1) DEFAULT 0,
    PRIMARY KEY (drug_type_id),
    UNIQUE(drug_type_name)
);

ALTER TABLE drug_type AUTO_INCREMENT = 40001;
ALTER TABLE drug_type ADD INDEX  (`is_deleted`);

CREATE TABLE branded_drug (
    branded_drug_id int auto_increment,
    brand_name varchar(50) NOT NULL,
    manufacturer varchar(50) NOT NULL,
    drug_type_id int NOT NULL,
    is_deleted TINYINT(1) DEFAULT 0,
    PRIMARY KEY (branded_drug_id),
    UNIQUE(brand_name),
    FOREIGN KEY (drug_type_id) REFERENCES drug_type(drug_type_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE branded_drug AUTO_INCREMENT = 50001;
ALTER TABLE branded_drug ADD INDEX  (`is_deleted`);
ALTER TABLE branded_drug ADD INDEX  (`drug_type_id`);

CREATE TABLE requests (
    request_id int auto_increment,
    customer_id int NOT NULL,
    date_created text NOT NULL,
    PRIMARY KEY (request_id),
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE requests AUTO_INCREMENT = 60001;
ALTER TABLE requests ADD INDEX  (`customer_id`);

CREATE TABLE response (
    response_id int auto_increment,
    request_id int NOT NULL,
    pharmacy_id int NOT NULL,
    date_created text NOT NULL,
    PRIMARY KEY(response_id),
    FOREIGN KEY (request_id) REFERENCES requests(request_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE
);

ALTER TABLE response AUTO_INCREMENT = 70001;
ALTER TABLE response ADD INDEX  (`request_id`);
ALTER TABLE response ADD INDEX  (`pharmacy_id`);

CREATE TABLE pharmacy_drug_types (
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

CREATE TABLE responses_and_associated_branded_drugs (
    response_id int,
    branded_drug_id int,
    PRIMARY KEY (response_id, branded_drug_id),
    FOREIGN KEY (response_id) REFERENCES response(response_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (branded_drug_id) REFERENCES branded_drug(branded_drug_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE reported_pharmacies (
    pharmacy_id int,
    customer_id int,
    reasons text NOT NULL,
    PRIMARY KEY (pharmacy_id, customer_id),
    FOREIGN KEY (pharmacy_id) REFERENCES pharmacy(pharmacy_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES customer(customer_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE system_admin(
    sys_admin_id int AUTO_INCREMENT,
    username varchar(30),
    password varchar(70),
    PRIMARY KEY (sys_admin_id)
);

INSERT INTO `system_admin` (`username`, `password`) VALUES ('sysad', '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
