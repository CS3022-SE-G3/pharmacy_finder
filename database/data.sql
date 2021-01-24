------------- Drug Types ---------------------------
INSERT INTO drug_type(`drug_type_name`) VALUES ('Atorvastatin 10mg + Fenofibrate 160mg');
INSERT INTO drug_type(`drug_type_name`) VALUES ('Amlodipine 10mg');
INSERT INTO drug_type(`drug_type_name`) VALUES ('Paracetamol');
INSERT INTO drug_type(`drug_type_name`) VALUES ('Verapamil');

------------- Branded Drugs ---------------------------
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('TONACT TG 10MG TAB','Star Drugs PLC','40014');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('OZOVAS F TAB','Azure drugs PLC','40014');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('ATROLET F 10MG TAB','Roche','40014');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('GENXVAST F TAB','GlaxoSmithKline','40014');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('Amlogard 10','Pfizer','40015');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('Panadol','GSK','40016');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('Tylenol','McNeil Consumer Healthcare','40016');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('Verelan PM','McNeil Consumer Healthcare','40017');
INSERT INTO branded_drug(`brand_name`,`manufacturer`,`drug_type_id`) VALUES ('Verelan','Pfizer','40017');

------------- Pharmacies ---------------------------
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Helix Pharmacy', '433/2, Galedanda, Gonawala.', 79.931838, 6.965203, 'info@helixpharm.com', 0112911280, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Vought Pharmacy', '56/1, Kandy Rd, Kiribathgoda.', 79.923704, 6.974803, 'info@voughtpharm.com', 0112920380, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Avalon Pharmacy', '112/2, Kandy Rd, Kadawatha.', 79.947587, 6.995826, 'info@avalonpharm.com', 0112811370, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Ivar Pharmacy', '63/5, Kanatta Rd, Sri Jayawardenapura Kotte.', 79.931838, 6.965203, 'info@ivarpharm.com', 0112986350, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Windsor Pharmacy', '218/1, Bope Rd, Sri Jayawardenapura Kotte.', 79.927489, 6.905853, 'info@windsorpharm.com', 0112920380, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Mixlab Pharmacy', '311/2, Turnour Rd, Borella.', 79.914136, 6.880512, 'info@mixlabpharm.com', 0112589632, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Omnicare Pharmacy', '71/3, Baseline Rd, Borellae.', 79.877959, 6.919270, 'info@omnicarepharm.com', 0112986354, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Med-X Pharmacy', '87/1, Subhadrarama Rd, Nugegoda.', 79.897238, 6.866376, 'info@medxpharm.com', 0112874596, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Approved', 'Keystone Pharmacy', '90/5B, Avissawella Rd, Nugegoda.', 79.905124, 6.861580, 'info@keystonepharm.com', 0112365894, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Not Approved', 'NuCare Pharmacy', '115/2, Akuressa Hwy, Matara.', 80.533891, 5.954067, 'info@nucarepharm.com', 0412658947, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');
INSERT INTO pharmacy(`approved_state`,`name`,`address`,`longitude`,`latitude`,`email`,`contact_no`,`password`) VALUES ('Not Approved', 'Hudson Pharmacy', '20/1, Sri Hemanandha Mw, Galle.', 80.212759, 6.054638, 'info@hudsonpharm.com', 0912365987, '$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

-- Customers --

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Nimal','951234567V','nimal@gmail.com','12/3,first lane,Borella','6.9134329','79.8785155','MALE','1995-10-08','0712222222','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Kasuni','975143265V','kasuni@gmail.com','23/5,second lane,Nugegoda','6.871311', '79.895603','FEMALE','1997-08-04','0773333333','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Kamal','926456778V','kamal@gmail.com','18/7,third lane,Battaramulla','6.898170', '79.920845','MALE','1992-12-22','0714444444','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Nalin','883678783V','nalin@gmail.com','12/7,first lane,Rajagiriya','6.908951', '79.892441','MALE','1988-04-18','0775555555','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Nayani','942466879V','nayani@gmail.com','23/4,first lane,Borella','6.911840', '79.880935',''FEMALE,'1994-04-02','0716666666','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Anura','935879800V','anura@gmail.com','12/7,second lane,Kiribathgoda','6.975049', '79.921089','MALE','1993-08-22','0771110711','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Amara','852456767V','amara@gmail.com','10/3,fifth lane,Nugegoda','6.869631', '79.898067','MALE','1985-12-05','0717777777','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Naduni','975442457V','naduni@gmail.com','16/4,third lane,Battaramulla','6.899470', '79.920689','FEMALE','1997-10-14','0778873888','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Amal','963257784V','amal@gmail.com','10/5,second lane,Kiribathgoda','6.975142', '79.923062','MALE','1996-12-23','0719999999','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');

INSERT INTO customer(`full_name`,`nic`,`email`,`address`,`latitude`,`longitude`,`gender`,`dob`,`contact_no`,`password`) VALUES ('Sahan','982134546V','sahan@gmail.com','14/9,first lane,Kiribathgoda','6.972936', '79.920307','MALE','1998-11-10','0701234567','$2a$04$Yc07OfjN5Vu5zXOtuwiiUeBjZpOGz6iS0cg./6piqZjBbRjpLl/lO');