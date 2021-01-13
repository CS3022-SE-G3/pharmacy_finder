// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();

const {view_pharmacy_info} = require('../../controllers/system_admin/pharmacy');

router.get('/view/:pharmacyid',view_pharmacy_info);


module.exports = router;