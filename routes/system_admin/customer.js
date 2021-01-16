// view customer info
const express = require('express');
const router = express.Router();
const viewCustomerInformation = require('../../controllers/system_admin/customer');

/**
 * 
 * @view_customer_information  - module that handle system admin's request to view customer information
 * @URL localhost:3000/system_admin/customer/view/{accountID}
 * @description Load and view all drug types
 * @method GET
 */

router.get('/view/:accountId', viewCustomerInformation);


module.exports = router;