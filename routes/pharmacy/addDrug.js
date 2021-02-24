/* 
    :: Add drug_types and branded_drugs
    URL : localhost:3000/pharmacy/addDrug
*/ 

const express = require('express');
const router = express.Router();
const {getPharmacyDrugs, updatePharmacyDrugs} = require('../../controllers/pharmacy/addDrug');
const isAPharmacy = require('../../middleware/isAPharmacy');
const { isNull } = require('lodash');
 

//Get drug_types and branded_drugs from the database
// localhost:3000/pharmacy/addDrug
router.get('/', isAPharmacy, getPharmacyDrugs);


//Insert submitted data into pharmacy_drug_types and pharmacy_branded_drugs tables
router.post('/', isAPharmacy, updatePharmacyDrugs);


module.exports = router;