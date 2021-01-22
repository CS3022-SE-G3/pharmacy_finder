
// customer login
// view customer account
const express = require('express');
const router = express.Router();
const { viewProfileInformation, editProfileInformation, loadEditProfile } = require('../../controllers/customer/profile');
const isACustomer = require('../../middleware/isACustomer');


// view profile information
/**
 * @description get the page of profile
 * @URL http://localhost:3000/customer/profile/view/:customerId
 * @method GET
 */
router.get('/view', isACustomer, viewProfileInformation);


// edit profile information
/**
 * @description returns edit profile form for customer
 * @URL localhost:3000/customer/profile/view/prof/:customerId
 * @method GET
 */
router.get('/view/prof/:customerId',loadEditProfile );
/**
 * @description edit the page of profile
 * @URL http://localhost:3000/customer/profile/view/edit
 * @method POST
 */
router.post('/view/edit', editProfileInformation);


module.exports = router;