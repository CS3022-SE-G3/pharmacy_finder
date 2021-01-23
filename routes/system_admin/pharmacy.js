// authorize pharmacy acc
// view pharmacy info
// view pending pharmacy accounts
const express = require('express');
const router = express.Router();
const isSystemAdmin = require('../../middleware/isSystemAdmin');


const {viewPharmacyInfo,viewPendingPharmacies,approvePharmacy,getSearchPharmacy,postSearchPharmacy} = require('../../controllers/system_admin/pharmacy');

/**
 * @description get the page for searching a pharmacy by Pharmacy ID
 * @URL http://localhost:3000/system_admin/pharmacy/search
 * @method GET
 * @todo not final
 */
router.get('/search', isSystemAdmin, getSearchPharmacy);

/**
 * @description search the Pharmacy ID and get the results on same page
 * @URL http://localhost:3000/system_admin/pharmacy/search
 * @method POST
 * @todo not final
 */
router.post('/search', isSystemAdmin, postSearchPharmacy);

/**
 * @description Load the data of all approval pending pharmacies into pending pharmacy view
 * @URL http://localhost:3000/system_admin/pharmacy/pending
 * @method GET
 */
router.get('/pending', isSystemAdmin, viewPendingPharmacies);

/**
 * @description Load the data of a pharmacy given a pharmacy ID into pharmacy info view
 * @URL http://localhost:3000/system_admin/pharmacy/view/{pharmacyid}
 * @method GET
 */
router.get('/view/:pharmacyid', isSystemAdmin, viewPharmacyInfo);

/**
 * @description Approve a pharmacy that is not already approved and notify approval
 * @URL http://localhost:3000/system_admin/pharmacy/approve
 * @method POST
 */
router.post('/approve', isSystemAdmin, approvePharmacy);

module.exports = router;