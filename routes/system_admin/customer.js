// view customer info
const express = require('express');
const router = express.Router();
const view_customer_information = require('../../controllers/system_admin/customer');

/**
 * @view_customer_information  - module that handle system admin's request to view customer information
 * @route - localhost:3000/system_admin/customer/viewcustomerinformation/{account id of the customer}
 * 
 * route to view customer information by system admin
 */

router.get('/viewcustomerinformation/:accountId',view_customer_information)
module.exports = router;