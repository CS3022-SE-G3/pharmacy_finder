const express = require('express');
const router = express.Router();
const ifLoggedIn = require('../../middleware/ifLoggedIn');
const isSystemAdmin = require('../../middleware/isSystemAdmin');

const {
    addNewDrugType,
    viewDrugType,
    viewAllDrugTypes,
    viewAddDrugTypeForm,
    viewUpdateDrugTypeForm,
    updateDrugTypeDetails,
    viewDeleteDrugTypePrompt,
    deleteDrugType
} = require('../../controllers/system_admin/drug_type');

/**
 * @description Load and view a drug type
 * @URL localhost:3000/system_admin/drug_type/view
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/view/:drug_type_id', isSystemAdmin, viewDrugType);

/**
 * @description Load and view all drug types
 * @URL localhost:3000/system_admin/drug_type
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/', isSystemAdmin, viewAllDrugTypes);

/**
 * @description Promt form to add a drug type
 * @URL localhost:3000/system_admin/drug_type/add
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/add', isSystemAdmin, viewAddDrugTypeForm);

/**
 * @description Add a new drug type
 * @URL localhost:3000/system_admin/drug_type/add
 * @method POST
 */
router.post('/add', isSystemAdmin, addNewDrugType);

/**
 * @description Promt form to update a drug type's details
 * @URL localhost:3000/system_admin/drug_type/update
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/update/:drug_type_id/:drug_type_name', isSystemAdmin, viewUpdateDrugTypeForm);

/**
 * @description Update existing drug type's details
 * @URL localhost:3000/system_admin/drug_type
 * @method POST
 */
router.post('/update', isSystemAdmin, updateDrugTypeDetails);

/**
 * @description Prompt delete drug type option
 * @URL localhost:3000/system_admin/drug_type/delete
 * @method GET
 * @todo return results in response body along with the html file
 */
router.get('/delete/:drug_type_id', isSystemAdmin, viewDeleteDrugTypePrompt);

/**
 * @description Delete specicfied drug type
 * @URL localhost:3000/system_admin/drug_type/delete
 * @method POST
 * @todo return results in response body along with the html file
 */
router.post('/delete', isSystemAdmin, deleteDrugType);

module.exports = router;