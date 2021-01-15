// broadcast request
// cancel broadcast request
// update broadcasted request
const express = require('express');
const router = express.Router();
const {viewBroadcastedRequests} = require('../../controllers/customer/request');

/**
 * @description Load and view all requests of a customer
 * @URL localhost:3000/customer/request/view/:id 
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:id', viewBroadcastedRequests);


module.exports = router;