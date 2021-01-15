
const Joi = require('joi');
const SystemAdmin = require('../../models/SystemAdmin');
const path = require('path');
const _ = require('lodash');

/**
 * @description Validate and add new drug type
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
        return response.status(200).send(request.body);


    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
}

/** 
 * @description Load all drug types
 * @todo return results in response body along with the html file
*/
const viewAllDrugTypes = async (request, response) => {
    try {
        const result = await SystemAdmin.getAllDrugTypes();
        console.log(result);
        return response.status(200).send(result);
    }
    catch (error) {
        return response.status(500).send("internal server error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/drug.html')); 
}

/** 
 * @description Return add new drug type form
 * @todo return the html file
*/
const viewAddDrugTypeForm = async (request, response) => {
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/drug.html')); 
    return response.status(200).send("Drug type add placeholder");
}

/** 
 * @description Return add new drug type form
 * @todo return the html file
*/
const viewUpdateDrugTypeForm = async (request, response) => {
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
    return response.status(200).send("Update form placeholder")
}

/**
 * @description Validate and update drug type details
 * @todo check if the id actually exists in the table first? the put won't work if the id doesnt exist but maybe its better for UX
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
    return response.status(200).send(request.body);
}

/** 
 * @description return delete drug type prompt
 * @todo return the html file
*/
const viewDeleteDrugTypePrompt = async (request, response) => {
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
    return response.status(200).send("delete form placeholder");
}

/** 
 * @description Delete drug type
*/
const deleteDrugType = async (request, response) => {

    try {
        const result = await SystemAdmin.deleteDrugType(_.pick(request.body,
            [
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
exports.viewAllDrugTypes = viewAllDrugTypes;
exports.viewUpdateDrugTypeForm = viewUpdateDrugTypeForm;
exports.updateDrugTypeDetails = updateDrugTypeDetails;
exports.viewDeleteDrugTypePrompt = viewDeleteDrugTypePrompt;
exports.deleteDrugType = deleteDrugType;



