// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();

const {viewPharmacyInfo,viewPendingPharmacies} = require('../../controllers/system_admin/pharmacy');

//GET http://localhost:3000/system_admin/pharmacy/pending
router.get('/pending',viewPendingPharmacies);

//GET http://localhost:3000/system_admin/pharmacy/view/{pharmacyid}
router.get('/view/:pharmacyid', viewPharmacyInfo);


module.exports = router;