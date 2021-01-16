// view customer info
const express = require('express');
const router = express.Router();
const {viewAllReportedPharmacies,deleteRecordOfReportedPharmacy} = require('../../controllers/system_admin/report');

/**
 * @URL localhost:3000/system_admin/report/view/reportedPharmacies
 * @description view all reported pharmacies
 * @method GET
 */

router.get('/view/reportedPharmacies', viewAllReportedPharmacies);

/**
 * @URL localhost:3000/system_admin/report/delete
 * @description Delete record reported pharmacy
 * @method DELETE
 */

router.delete('/delete', deleteRecordOfReportedPharmacy);

module.exports = router;