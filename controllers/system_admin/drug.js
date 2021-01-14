
const Joi = require('joi');
const SystemAdmin = require('../../models/SystemAdmin');
const path = require('path');
const _ = require('lodash');

/**
 * @description Validate and add new branded drug
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
        return response.status(200).send(request.body);


    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
}

/** 
 * @description Load all branded drugs
 * @todo return results in response body along with the html file
*/
const viewAllDrugs = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugs();
        console.log(result);
        return response.status(200).send(result);
    }
    catch (error) {
        return response.status(500).send("internal server error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/drug.html')); 
}

/** 
 * @description Return drug types with add new branded drug form
 * @todo return results in response body along with the html file
*/
const viewAddDrugForm = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugTypes();
        console.log(result);
        return response.status(200).send(result);
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send("internal server error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/drug.html')); 
}

/** 
 * @description Return drug types with add new branded drug form
 * @todo return results in response body along with the html file
*/
const viewUpdateDrugForm = async (request, response) => {
    try {
        const results = await SystemAdmin.getAllDrugTypes();
        return response.status(200).send(results);

    }
    catch (error) {
        return response.status(500).send("Internal Server Error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
}

/**
 * @description Validate and update branded drug details
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
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
    return response.status(200).send(request.body);
}

/** 
 * @description return delete branded drug prompt
 * @todo return the html file
*/
const viewDeleteDrugPrompt = async (request, response) => {
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
}

/** 
 * @description Delete branded drug
*/
const deleteDrug = async (request, response) => {

    try {
        const result = await SystemAdmin.deleteDrug(_.pick(request.body,
            [
                "branded_drug_id"
            ]
        ));
    return response.status(200).send(request.body);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
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


