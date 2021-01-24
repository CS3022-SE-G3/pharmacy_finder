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