// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');

router.get('/', ifNotLoggedIn, (req, res) => {
    return res.render('customer/entry');
});

module.exports = router;