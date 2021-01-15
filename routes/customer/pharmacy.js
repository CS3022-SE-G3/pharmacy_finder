// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const {viewPharmacyInformation} = require('../../controllers/customer/pharmacy');

/**
 * @description Load and view requested pharmacy information
 * @URL localhost:3000/system_admin/drug
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:name', viewPharmacyInformation);

module.exports = router;