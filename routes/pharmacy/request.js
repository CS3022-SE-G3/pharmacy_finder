// respond to customer request
// edit response to request
const express = require('express');
const router = express.Router();
const { viewRequest } = require('../../controllers/pharmacy/request');
const isAPharmacy = require('../../middleware/isAPharmacy');

/**
 * @URL localhost:3000/pharmacy/request/view
 * view all requests for a pharmacy
 */
router.get("/view", isAPharmacy, (req, res) => {
    let info = [];
    // request_id ??

    return viewRequest(info, res, request_id);
});

module.exports = router;