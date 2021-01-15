// view customer info
const express = require('express');
const router = express.Router();
const view_all_reported_pharmacies = require('../../controllers/system_admin/report');

/**
 * 
 * @view_all_reported_pharmacies  - module that handle system admin's request to view reported_pharmacies
 * @URL localhost:3000/system_admin/report/view/reportedPharmacies
 * @description view all reported pharmacies
 * @method GET
 */

router.get('/view/reportedPharmacies', view_all_reported_pharmacies);


module.exports = router;