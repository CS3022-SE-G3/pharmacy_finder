// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const {viewPharmacyInformation} = require('../../controllers/customer/pharmacy');

//URL:localhost:3000/customer/pharmacy/view/:name --method GET
router.get('/view/:name', viewPharmacyInformation);

module.exports = router;