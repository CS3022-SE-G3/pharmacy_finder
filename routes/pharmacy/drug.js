/* 
    :: View pharmacy_drug_types and pharmacy_branded_drugs
    :: Delete pharmacy_drug_types and pharmacy_branded_drugs
    URL : localhost:3000/pharmacy/drug
*/ 

const express = require('express');
const router = express.Router();
const isAPharmacy = require('../../middleware/isAPharmacy');
const {getPharmacyDrugs, deletePharmacyDrugs} = require('../../controllers/pharmacy/drug');

// localhost:3000/pharmacy/drug
//Get pharmacy_drug_types and pharmacy_branded_drugs from the database
router.get('/', isAPharmacy, getPharmacyDrugs);

//Delete data from pharmacy_drug_types and pharmacy_branded_drugs tables
router.post('/', isAPharmacy, deletePharmacyDrugs);


module.exports = router;