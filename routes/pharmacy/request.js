// respond to customer request
// edit response to request
const express = require('express');
const router = express.Router();
const { viewAllRequests } = require('../../controllers/pharmacy/request');
const isAPharmacy = require('../../middleware/isAPharmacy');

/**
 * @URL localhost:3000/pharmacy/request/view
 * view all requests for a pharmacy
 */
router.get('/view',isAPharmacy, viewAllRequests);

module.exports = router;