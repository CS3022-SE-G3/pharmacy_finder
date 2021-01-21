// broadcast request
// cancel broadcast request
// update broadcasted request
const express = require('express');
const router = express.Router();
const { viewBroadcastedRequests } = require('../../controllers/customer/request');
const { getBroadcastForm } = require('../../controllers/customer/request');
const { createBroadcastRequest } = require('../../controllers/customer/request');
const { viewAllRequests } = require('../../controllers/customer/request');
const isACustomer = require('../../middleware/isACustomer');

/**
 * @description Load and view all requests of a customer or request details 
 * @URL localhost:3000/customer/request/view/:customerId 
 * @method GET
 */
router.get('/view', isACustomer, viewAllRequests);


/**
 * @description Load and view a specific request's details of a customer
 * @URL localhost:3000/customer/request/view/:requestId 
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/req/:requestId', isACustomer, viewBroadcastedRequests);

//URL localhost:3000/customer/request/broadcast --method GET
router.get('/broadcast', isACustomer, getBroadcastForm);

//URL localhost:3000/customer/request/broadcast --method POST
router.post('/broadcast', isACustomer, createBroadcastRequest);

module.exports = router;