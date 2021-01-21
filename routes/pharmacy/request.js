// respond to customer request
// edit response to request
const express = require('express');
const router = express.Router();
const { viewAllRequests } = require('../../controllers/pharmacy/request');

/**
 * @URL localhost:3000/pharmacy/request/view
 * view all requests for a pharmacy
 */
router.get('/view',viewAllRequests);

module.exports = router;