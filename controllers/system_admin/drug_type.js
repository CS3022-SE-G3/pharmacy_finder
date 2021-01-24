
const Joi = require('joi');
const SystemAdmin = require('../../models/SystemAdmin');
const path = require('path');
const _ = require('lodash');

/**
 * @description Validate and add new drug type
 * @todo prompt operation status (success/fail)
 */
const addNewDrugType = async (request, response) => {

    const { error } = validateAddNewDrugTypeDetails(_.pick(request.body,
        [
            "drug_type_name"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await SystemAdmin.enterDrugType(_.pick(request.body,
            [
                "drug_type_name"
            ]
        ));
        return response.status(200).redirect('/system_admin/drug_type');


    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
}

/** 
 * @description Load drug type
 * 
*/
const viewAllDrugTypes = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugTypes();
        return response.status(200).render('system_admin/drug_types', {
            drugTypes: result,
            pageTitle: 'Drug Types'
        });
    }
    catch (error) {
        return response.status(500).send("internal server error");
    }
}

/** 
 * @description Load all drug types
 * 
*/
const viewDrugType = async (request, response) => {
    try {
        const result = await SystemAdmin.getDrugType(request.params.drug_type_id);
        return response.status(200).render('system_admin/drug_type', {
            drug_type: result,
            pageTitle: 'Drug Type'
        });
        
    }
    catch (error) {
        return response.status(500).send(error.message);
    } 
}

/** 
 * @description Return add new drug type form
 * 
*/
const viewAddDrugTypeForm = async (request, response) => {
    return response.status(200).render('system_admin/add_drug_type_form', {
        pageTitle: 'Add New Drug Type'
    });
}

/** 
 * @description Return add new drug type form
 * 
*/
const viewUpdateDrugTypeForm = async (request, response) => {
    const drugType = {
        drug_type_id: request.params.drug_type_id,
        drug_type_name: request.params.drug_type_name
    };

    return response.status(200).render('system_admin/update_drug_type_form', {
        drugType: drugType,
        pageTitle: 'Update Drug Type Info'
    });
}

/**
 * @description Validate and update drug type details
 * @todo prompt operation status (success/fail)
 */
const updateDrugTypeDetails = async (request, response) => {

    const { error } = validateUpdateDrugTypeDetails(_.pick(request.body,
        [
            "drug_type_id",
            "drug_type_name"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await SystemAdmin.updateDrugType(_.pick(request.body,
            [
                "drug_type_id",
                "drug_type_name"
            ]
        ));

    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
    return response.status(200).redirect('/system_admin/drug_type');
}

/** 
 * @description return delete drug type prompt
 * 
*/
const viewDeleteDrugTypePrompt = async (request, response) => {
    return response.status(200).render('system_admin/delete_drug_type_prompt', {
        drug_type_id: request.params.drug_type_id,
        pageTitle: 'Delete Drug Type'
    });
}

/** 
 * @description Delete drug type
 * @todo prompt operation status (success/fail)
*/
const deleteDrugType = async (request, response) => {

    try {
        const result = await SystemAdmin.deleteDrugType(_.pick(request.body,
            [
                "drug_type_id"
            ]
        ));
        return response.status(200).redirect('/system_admin/drug_type');
    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
}

/**
 * @description Valitdate drug type details
 */
function validateAddNewDrugTypeDetails(drug) {
    const schema = Joi.object({
        "drug_type_name": Joi.string().required()
    });

    return schema.validate(drug);
}

/**
 * @description Valitdate drug type details
 */
function validateUpdateDrugTypeDetails(drug) {
    const schema = Joi.object({
        "drug_type_id": Joi.number().integer().required(),
        "drug_type_name": Joi.string().required()
    });

    return schema.validate(drug);
}

exports.addNewDrugType = addNewDrugType;
exports.viewAddDrugTypeForm = viewAddDrugTypeForm;
exports.viewDrugType = viewDrugType;
exports.viewAllDrugTypes = viewAllDrugTypes;
exports.viewUpdateDrugTypeForm = viewUpdateDrugTypeForm;
exports.updateDrugTypeDetails = updateDrugTypeDetails;
exports.viewDeleteDrugTypePrompt = viewDeleteDrugTypePrompt;
exports.deleteDrugType = deleteDrugType;



