// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');


router.get('/', ifNotLoggedIn, (req, res) => {
    return res.sendFile(path.join(__dirname, '../../views/pharmacy/entry.html'));
});

module.exports = router;