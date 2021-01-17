// view pharmacy information
// report pharmacy account
const express = require('express');
const router = express.Router();
const {viewPharmacyInformation} = require('../../controllers/customer/pharmacy');

/**
 * @description returns sign search bar for customer
 * @URL localhost:3000/customer/pharmacy/view
 * @method GET
 */
router.get('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../../views/customer/search_pharmacy.ejs'));
});

/**
 * @description Load and view requested pharmacy information
 * @URL localhost:3000/customer/pharmacy/view/:name
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:name', viewPharmacyInformation);

module.exports = router;