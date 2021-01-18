// view customer info
const express = require('express');
const router = express.Router();
const { viewAllReportedPharmacies, deleteRecordOfReportedPharmacy, deletePharmacy } = require('../../controllers/system_admin/report');


/**
 * @URL - http://localhost:3000/system_admin/report/view/reportedPharmacies
 * @description view all reported pharmacies
 * @method GET
 */


router.get('/view/reportedPharmacies', viewAllReportedPharmacies);
/**
 * @URL - http://localhost:3000/system_admin/report/pharmacy/delete
 * @description Delete the reported pharmacy
 * @method DELETE
 */


router.delete('/pharmacy/delete', deletePharmacy);
/**
 * @URL - http://localhost:3000/system_admin/report/delete
 * @description Delete record of the reported pharmacy
 * @method DELETE
 */
router.delete('/delete', deleteRecordOfReportedPharmacy);
module.exports = router;