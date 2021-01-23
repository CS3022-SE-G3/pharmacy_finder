const express = require('express');
const router = express.Router();
const { viewHome } = require('../../controllers/pharmacy/home');
const isAPharmacy = require('../../middleware/isAPharmacy');

/**
 * @URL localhost:3000/pharmacy/home
 * view all requests for a pharmacy
 */
router.get('/',isAPharmacy, viewHome);

module.exports = router;