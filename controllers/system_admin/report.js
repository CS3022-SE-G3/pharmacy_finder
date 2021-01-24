const express = require('express');
const Joi = require('joi');
const { pool } = require('../../database/connection');
const SystemAdmin = require('../../models/SystemAdmin');

/**
 * @description - validating account id and pharmacy id that sent from request
 * @param {number} accountId - customerId
 * @param {number} pharmacyId - pharmacy Id
 */
function validateIds(pharmacyID, customerID) {

    // schema to validate
    const schema = Joi.object({
        
        "customerID": Joi.number().integer().min(10001).required(),
        "pharmacyID": Joi.number().integer().min(30001).required(),
        
    });

    // return valid or not
    return schema.validate({customerID,pharmacyID})
}

/**
 * @description - handling system admin's request to delete record of reported pharamacy.handles response and return affected rows in db
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  
 */
const deleteRecordOfReportedPharmacy = async (req, res) => {

    const pharmacyID = req.body.pharmacyID;
    const customerID = req.body.customerID;

        console.log(req.body)

    // validate
    const { error } = validateIds(pharmacyID,customerID);

    // send invalid to front end if Id's not valid
    if (error) {

        console.error(error.details[0].message)
        
        return res.status(400).send(error.details[0].message);

    }

    // get the reported pharamacy information of the pharamacy as requested
    try {
        const data = await SystemAdmin.deleteRecord(pharmacyID, customerID);
        if (data.length === 0) {
            // return res.status(400).send("No reported pharamacies");
        }

        return res.status(200).send(data);
    }
    catch (error) {
        console.log(error)

        return res.status(500).render('500');
        
    }

}
/**
 * @description - handling system admin's request to view customer information.handles response and return customer infromation
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  
 */
const viewAllReportedPharmacies = (req, res) => {

    // get the reported pharamacy information of the pharamacy as requested
    const result = SystemAdmin.getReportedPharmaciesInformation();

    result.then((data) => {

        // send no reported pharamacies
        if(data.length === 0){
            return res.status(400).send("No reported pharamacies");
            
        }
        
        // send data to front end
        return res.render('system_admin/viewpharmaciesreprted',{title: 'welcome',data: data});
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        return res.status(500).render('500');
    })

}

/**
 * @description - handling system admin's request to delete pharmacy from system.handles response and return response
 * @param {request} req - request to API
 * @param {response} res - response
 */
const deletePharmacy = async (req, res) => {

    const pharmacyID = req.body.pharmacyID;
    const customerID = req.body.customerID;

    console.log(req.body)

    const { error } = validateIds(pharmacyID,customerID)

    if (error) {
        // log the error
        console.error(error.details[0].message);

        // send bad request
        return res.status(400).send(error.details[0].message);

    }

    // get the reported pharamacy is in reported pharamacy list
    try{
        const doesReportedAccountExist = await SystemAdmin.getReportedPharmacyInformation(pharmacyID, customerID);
        console.log(doesReportedAccountExist)

        if (doesReportedAccountExist) {
            // if that pharamacy in reported list then delete its account
            try
            {
                const deletionStatus = await SystemAdmin.deleteAccount(pharmacyID);

                // delete record of the report
                if (deletionStatus) {
                    try
                    {
                        const data = await SystemAdmin.deleteRecord(pharmacyID, customerID);
                        console.log("Deleting pharmacy")
                        console.log(data);
                        return res.status(200).send('Successfully deleted pharmacy account');
                        
                    }
                    catch (error) {
                        console.log(error);
                        return response.status(400).send("Something went wrong, line 155 controllers/systemadmin");
                    }
                }
            }
            catch (error) {
                console.log(error);
                return response.status(400).send("Something went wrong, line 162 controllers/systemadmin");
            }
    } else {
        // else send that pharmacy not reported and unable to delete
        return res.status(400).send("This pharmacy has not been reported and so cannot be deleted");
    }
    }
    catch (error) {
        // send 'internal server error'
        console.log(error);
        return res.status(500).render('500');
    }
}
module.exports.viewAllReportedPharmacies = viewAllReportedPharmacies;
module.exports.deleteRecordOfReportedPharmacy = deleteRecordOfReportedPharmacy;
module.exports.deletePharmacy = deletePharmacy;