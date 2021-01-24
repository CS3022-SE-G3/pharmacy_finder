
const Joi = require('joi');
const SystemAdmin = require('../../models/SystemAdmin');
const _ = require('lodash');

/**
 * @description Validate and add new branded drug
 * @todo prompt operation status (success/fail)
 */
const addNewDrug = async (request, response) => {

    const { error } = validateAddNewDrugDetails(_.pick(request.body,
        [
            "brand_name",
            "manufacturer",
            "drug_type_id"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await SystemAdmin.enterDrug(_.pick(request.body,
            [
                "brand_name",
                "manufacturer",
                "drug_type_id"
            ]
        ));
        return response.status(200).redirect('/system_admin/drug');


    } catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.status(500).render('500', {
            err_data: err_msg
        });
    }
}

/** 
 * @description Load all branded drugs
 * 
*/
const viewAllDrugs = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugs();
        return response.status(200).render('system_admin/drugs', {
            drugs: result,
            pageTitle: 'Drugs'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
}

/** 
 * @description Return drug types with add new branded drug form
 *
*/
const viewAddDrugForm = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugTypes();
        return response.status(200).render('system_admin/add_drug_form', {
            drugTypes: result,
            pageTitle: 'Add New Branded Drug'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
}

/** 
 * @description Return drug types with add new branded drug form
 * 
*/
const viewUpdateDrugForm = async (request, response) => {
    try {
        const drug = {
            branded_drug_id: request.params.branded_drug_id,
            brand_name: request.params.brand_name,
            manufacturer: request.params.manufacturer,
            drug_type_id: request.params.drug_type_id
        };
        const results = await SystemAdmin.getAllDrugTypes();
        return response.status(200).render('system_admin/update_drug_form', {
            drug: drug,
            drugTypes: results,
            pageTitle: 'Update Branded Drug Info'
        });

    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
}

/**
 * @description Validate and update branded drug details
 * @todo prompt operation status (success/fail)
 */
const updateDrugDetails = async (request, response) => {
    const { error } = validateUpdateDrugDetails(_.pick(request.body,
        [
            "branded_drug_id",
            "brand_name",
            "manufacturer",
            "drug_type_id"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await SystemAdmin.updateDrug(_.pick(request.body,
            [
                "branded_drug_id",
                "brand_name",
                "manufacturer",
                "drug_type_id"
            ]
        ));

    } catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
    return response.status(200).redirect('/system_admin/drug');
}

/** 
 * @description return delete branded drug prompt
 * 
*/
const viewDeleteDrugPrompt = async (request, response) => {
    return response.status(200).render('system_admin/delete_drug_prompt', {
        branded_drug_id: request.params.branded_drug_id,
        pageTitle: 'Delete Branded Drug'
    });
}

/** 
 * @description Delete branded drug
 * @todo prompt operation status (success/fail)
*/
const deleteDrug = async (request, response) => {

    try {
        const result = await SystemAdmin.deleteDrug(_.pick(request.body,
            [
                "branded_drug_id"
            ]
        ));
        return response.status(200).redirect('system_admin/drug');
    } catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
}

/**
 * @description Valitdate branded drug details
 */
function validateAddNewDrugDetails(drug) {
    const schema = Joi.object({
        "brand_name": Joi.string().required(),
        "manufacturer": Joi.string().required(),
        "drug_type_id": Joi.number().integer().required()
    });

    return schema.validate(drug);
}

/**
 * @description Valitdate branded drug details
 */
function validateUpdateDrugDetails(drug) {
    const schema = Joi.object({
        "branded_drug_id": Joi.number().integer().required(),
        "brand_name": Joi.string().required(),
        "manufacturer": Joi.string().required(),
        "drug_type_id": Joi.number().integer().required()
    });

    return schema.validate(drug);
}

exports.addNewDrug = addNewDrug;
exports.viewAddDrugForm = viewAddDrugForm;
exports.viewAllDrugs = viewAllDrugs;
exports.viewUpdateDrugForm = viewUpdateDrugForm;
exports.updateDrugDetails = updateDrugDetails;
exports.viewDeleteDrugPrompt = viewDeleteDrugPrompt;
exports.deleteDrug = deleteDrug;


