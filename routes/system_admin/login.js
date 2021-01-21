// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');
const { loginSysAdmin } = require('../../controllers/system_admin/login');

router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../views/system_admin/login.html'));
});

router.post('/', ifNotLoggedIn, loginSysAdmin);

module.exports = router;