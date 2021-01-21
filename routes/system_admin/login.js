// view customer info
const express = require('express');
const router = express.Router();
const path = require('path');
const ifNotLoggedIn = require('../../middleware/ifNotLoggedIn');
const { loginSysAdmin } = require('../../controllers/system_admin/login');

router.get('/', (req, res) => {
    return res.render('system_admin/home',{title: 'welcome'});
});

router.post('/', ifNotLoggedIn, loginSysAdmin);

module.exports = router;