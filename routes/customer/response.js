const express = require('express');
const router = express.Router();
const view_responded_pharmacies=require('../../controllers/customer/response');

/**
 * @description Load and view all responses of pharmacies for a request
 * @URL localhost:3000/customer/response/view/:Id 
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:Id',view_responded_pharmacies);

module.exports = router;