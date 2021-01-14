const express = require('express');
const router = express.Router();

const {
    addNewDrug,
    viewAllDrugs,
    viewAddDrugForm,
    viewUpdateDrugForm,
    updateDrugDetails,
    viewDeleteDrugPrompt,
    deleteDrug
} = require('../../controllers/system_admin/drug');

/**
 * @description Load and view all branded drugs
 * @URL localhost:3000/system_admin/drug
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/', viewAllDrugs);

/**
 * @description Promt form to add a branded drug
 * @URL localhost:3000/system_admin/drug/add
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/add', viewAddDrugForm);

/**
 * @description Add a new branded drug
 * @URL localhost3000/system_admin/drug/add
 * @method POST
 */
router.post('/add', addNewDrug);

/**
 * @description Promt form to update a branded drug's details
 * @URL localhost:3000/system_admin/drug/update
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/update', viewUpdateDrugForm);

/**
 * @description Update existing branded drug's details
 * @URL localhost:3000/system_admin/drug
 * @method PUT
 */
router.put('/update', updateDrugDetails);

/**
 * @description Prompt delete branded drug option
 * @URL localhost:3000/system_admin/drug/delete
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/delete', viewDeleteDrugPrompt);

/**
 * @description Delete specicfied branded drug
 * @URL localhost:3000/system_admin/drug/delete
 * @method PUT
 * @todo return results in response body along with the html file
 */
router.put('/delete', deleteDrug);

module.exports = router;