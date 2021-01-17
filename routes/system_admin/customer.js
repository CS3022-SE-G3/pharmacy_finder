// view customer info
const express = require('express');
const router = express.Router();
const {viewCustomerInformation, renderForm} = require('../../controllers/system_admin/customer');

/**
 * 
 * @URL http://localhost:3000/system_admin/customer/view/{accountID}
 * @description Load and view all drug types
 * @method GET
 */

router.get('/view/:accountId', viewCustomerInformation);

/**
 * 
 * @URL http://localhost:3000/system_admin/customer/view
 * @description Load and view all drug types
 * @method GET
 */

router.get('/view', renderForm);
module.exports = router;