// broadcast request
// cancel broadcast request
// update broadcasted request
const express = require('express');
const router = express.Router();
const { viewBroadcastedRequests } = require('../../controllers/customer/request');
const { getBroadcastForm } = require('../../controllers/customer/request');

//URL:localhost:3000/customer/request/view/:id --method GET
router.get('/view/:id', viewBroadcastedRequests);

router.get('/broadcast', getBroadcastForm);
module.exports = router;