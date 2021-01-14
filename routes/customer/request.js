// broadcast request
// cancel broadcast request
// update broadcasted request
const express = require('express');
const router = express.Router();
const view_broadcasted_requests=require('../../controllers/customer/request');

//URL:localhost:3000/customer/request/view/:id --method GET
router.get('/view/:id',view_broadcasted_requests);
module.exports = router;