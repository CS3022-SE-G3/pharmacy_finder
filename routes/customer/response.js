const express = require('express');
const router = express.Router();
const { viewRespondedPharmacies }=require('../../controllers/customer/response');

/**
 * @description Load and view all responses of pharmacies for a request
 * @URL localhost:3000/customer/response/view/:Id 
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:Id',viewRespondedPharmacies);

module.exports = router;