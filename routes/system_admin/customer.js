// view customer info
const express = require('express');
const router = express.Router();
const { viewCustomerInformation, renderForm } = require('../../controllers/system_admin/customer');
const isSystemAdmin = require('../../middleware/isSystemAdmin');

/**
 * 
 * @URL http://localhost:3000/system_admin/customer/search
 * @description Search for customer by entering customer ID
 * @method GET
 */

router.get('/search', isSystemAdmin, renderForm);

/**
 * 
 * @URL http://localhost:3000/system_admin/customer/view/{accountID}
 * @description Load the customer whose ID was searched for
 * @method GET
 */

router.get('/view/:accountId', isSystemAdmin, viewCustomerInformation);


module.exports = router;