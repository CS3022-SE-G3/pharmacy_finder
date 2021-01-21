const express = require('express');
const router = express.Router();
const {viewBroadcastedRequests,createBroadcastRequest,getBroadcastForm,viewAllRequests} = require('../../controllers/customer/request');

/**
 * @description Load and view all requests of a customer or request details 
 * @URL localhost:3000/customer/request/view/:customerId 
 * @method GET
 */
router.get('/view', viewAllRequests);

/**
 * @description Load and view a specific request's details of a customer
 * @URL localhost:3000/customer/request/view/:requestId 
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/req/:requestId', viewBroadcastedRequests);

/**
 * URL localhost:3000/customer/request/broadcast 
 * @method GET
 * 
 * */
router.get('/broadcast', getBroadcastForm);

//URL localhost:3000/customer/request/broadcast --method POST
router.post('/broadcast', createBroadcastRequest);

module.exports = router;