// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();

const {viewPharmacyInfo,viewPendingPharmacies,approvePharmacy} = require('../../controllers/system_admin/pharmacy');

//GET http://localhost:3000/system_admin/pharmacy/pending
router.get('/pending',viewPendingPharmacies);

//GET http://localhost:3000/system_admin/pharmacy/view/{pharmacyid}
router.get('/view/:pharmacyid', viewPharmacyInfo);

//PUT http://localhost:3000/system_admin/pharmacy/approve/{pharmacyid}
router.put('/approve/:pharmacyid',approvePharmacy);

module.exports = router;