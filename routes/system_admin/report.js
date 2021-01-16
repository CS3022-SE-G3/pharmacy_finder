// view customer info
const express = require('express');
const router = express.Router();
const viewAllReportedPharmacies = require('../../controllers/system_admin/report');

/**
 * 
 * @view_all_reported_pharmacies  - module that handle system admin's request to view reported_pharmacies
 * @URL localhost:3000/system_admin/report/view/reportedPharmacies
 * @description view all reported pharmacies
 * @method GET
 */

router.get('/view/reportedPharmacies', viewAllReportedPharmacies);


module.exports = router;