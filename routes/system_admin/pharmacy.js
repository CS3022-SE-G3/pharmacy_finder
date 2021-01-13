// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();

const {viewPharmacyInfo} = require('../../controllers/system_admin/pharmacy');

router.get('/view/:pharmacyid', viewPharmacyInfo);


module.exports = router;