// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const {viewPharmacyInformation} = require('../../controllers/customer/pharmacy');
const {getCustomerSearchPharmacy} = require('../../controllers/customer/pharmacy');
const {postCustomerSearchPharmacy} = require('../../controllers/customer/pharmacy');

/**
 * @description get the page for searching a pharmacy by Pharmacy Name
 * @URL http://localhost:3000/customer/pharmacy/search
 * @method GET
 */
router.get('/search',getCustomerSearchPharmacy);

/**
 * @description search the Pharmacy Name and get the results on same page
 * @URL http://localhost:3000/customer/pharmacy/search
 * @method POST
 */
router.post('/search',postCustomerSearchPharmacy);


/**
 * @description Load and view requested pharmacy information
 * @URL localhost:3000/customer/pharmacy/view/:name
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:name', viewPharmacyInformation);

module.exports = router;