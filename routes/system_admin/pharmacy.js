// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();

const {viewPharmacyInfo,viewPendingPharmacies} = require('../../controllers/system_admin/pharmacy');

router.get('/pendingpharmacies',viewPendingPharmacies);

router.get('/view/:pharmacyid', viewPharmacyInfo);


module.exports = router;