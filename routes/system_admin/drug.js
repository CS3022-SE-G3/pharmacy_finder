const express = require('express');
const router = express.Router();
const isSystemAdmin = require('../../middleware/isSystemAdmin');


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
router.get('/', isSystemAdmin, viewAllDrugs);

/**
 * @description Prompt form to add a branded drug
 * @URL localhost:3000/system_admin/drug/add
 * @method GET
 * @todo return results in response body along with the html file
 * This is to get all the drug types to display in the form
 */
router.get('/add', isSystemAdmin, viewAddDrugForm);

/**
 * @description Add a new branded drug
 * @URL localhost:3000/system_admin/drug/add
 * @method POST
 */
router.post('/add', isSystemAdmin, addNewDrug);

/**
 * @description Prompt form to update a branded drug's details
 * @URL localhost:3000/system_admin/drug/update
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/update/:branded_drug_id/:brand_name/:manufacturer/:drug_type_id', isSystemAdmin, viewUpdateDrugForm); //TODO: clarify

/**
 * @description Update existing branded drug's details
 * @URL localhost:3000/system_admin/drug/update
 * @method POST
 */
router.post('/update', isSystemAdmin, updateDrugDetails);

/**
 * @description Prompt delete branded drug option
 * @URL localhost:3000/system_admin/drug/delete
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/delete/:branded_drug_id', isSystemAdmin, viewDeleteDrugPrompt); //TODO: clarify

/**
 * @description Delete specicfied branded drug
 * @URL localhost:3000/system_admin/drug/delete
 * @method POST
 * @todo return results in response body along with the html file
 */
router.post('/delete', isSystemAdmin, deleteDrug);

module.exports = router;