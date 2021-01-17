// view customer info
const express = require('express');
const router = express.Router();
const {viewAllReportedPharmacies,deleteRecordOfReportedPharmacy,deletePharmacy} = require('../../controllers/system_admin/report');
/**
 * @URL - http://localhost:3000/system_admin/report/view/reportedPharmacies
 * @description view all reported pharmacies
 * @method GET
 */
router.get('/view/reportedPharmacies', viewAllReportedPharmacies);


/**
 * @URL - http://localhost:3000/system_admin/report/pharmacy/delete
 * @description Delete record reported pharmacy
 * @method POST
 */
router.post('/pharmacy/delete', deletePharmacy);


/**
 * @URL - http://localhost:3000/system_admin/report/delete
 * inputs:customerID and pharmacyID
 * @description Delete only record of reported pharmacy
 * This is when the system admin ignores the report and deletes just the report, and not the pharmacy account
 * @method DELETE
 */
router.post('/delete', deleteRecordOfReportedPharmacy);


module.exports = router;