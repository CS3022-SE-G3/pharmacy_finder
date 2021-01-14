// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const view_pharmacy_information=require('../../controllers/customer/pharmacy');

//URL:localhost:3000/customer/pharmacy/view/:name --method GET
router.get('/view/:name',view_pharmacy_information);

module.exports = router;