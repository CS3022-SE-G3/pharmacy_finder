// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const { viewPharmacyInformation } = require('../../controllers/customer/pharmacy');
const path = require('path');


router.get('/', (req, res) => {
    return res.sendFile(path.join(__dirname, '../../views/customer/search_for_pharmacy.html'));
});

/**
 * @description Load and view requested pharmacy information
 * @URL localhost:3000/system_admin/drug
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:pharmacy_name', viewPharmacyInformation);

module.exports = router;