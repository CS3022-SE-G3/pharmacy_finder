const express = require('express');
const router = express.Router();
const isSystemAdmin = require('../../middleware/isSystemAdmin');


const {
    viewHomePage
} = require('../../controllers/system_admin/home');

/**
 * @description Load and view home page
 * @URL localhost:3000/system_admin/home
 * @method GET
 */
router.get('/', isSystemAdmin, viewHomePage);

module.exports = router;