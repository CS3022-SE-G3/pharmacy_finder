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
const deleteRecordOfReportedPharmacy = (req, res) => {

    const  pharmacyId = req.body.pharmacy_id;
    const  accountId  = req.body.customer_id;

    // validate
    const { error } = validateIds(pharmacyId,accountId);

    // send invalid to front end if Id's not valid
    if (error) {

        // log the error
        console.error('ValidationError:system_admin-customer_account_id_and_pharmacy_id: '+error.details[0].message)

        // send bad request
        res.status(400).send("Invalid Account ID or Pharamacy ID provided");

        res.end()

        // stop execution
        return
    }

    // get the reported pharamacy information of the pharamacy as requested
    const result = SystemAdmin.deleteRecord(pharmacyId,accountId);

    result.then((data) => {

        // send no reported pharamacies
        if(data.length === 0){
            // return res.status(400).send("No reported pharamacies");
            
        }
        
        // send data to front end
        return res.status(200).send(data);
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        return res.status(500).send("Internal Server Error");
    })

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
        return res.status(200).send(data);
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        return res.status(500).send("Internal Server Error");
    })

}

/**
 * @description - handling system admin's request to delete pharmacy from system.handles response and return response
 * @param {request} req - request to API
 * @param {response} res - response
 */
const deletePharmacy = (req, res) => {

    const pharmacyID = req.body.pharmacyID;
    const customerID = req.body.customerID;

    const { error } = validateIds(pharmacyID,customerID)

    if (error) {
        // log the error
        console.error('ValidationError:system_admin-customer_account_id: '+error.details[0].message)

        // send bad request
        return res.status(400).send(error.details[0].message);

    }

    // get the reported pharamacy is in reported pharamacy list
    const response = SystemAdmin.getReportedPharmacyInformation(pharmacyID, customerID);
    response.then(isDelOk => {
        console.log(isDelOk)

        if (isDelOk) {
        // if that pharamacy in reported list then delete its account
        const delres = SystemAdmin.deleteAccount(pharmacyID);

        // delete record of the report
        delres.then(data => {
            SystemAdmin.deleteRecord(pharmacyID, customerID).then(data => {
                return res.status(200).send('Successfully deleted account');
            })
        })
    } else {
        // else send that pharmacy not reported and unable to delete
        return res.status(400).send("This pharmacy has not been reported and so cannot be deleted");
    }
    }).catch(error => {
        // send 'internal server error'
        return res.status(500).send("Internal Server Error");
    })
}
module.exports.viewAllReportedPharmacies = viewAllReportedPharmacies;
module.exports.deleteRecordOfReportedPharmacy = deleteRecordOfReportedPharmacy;
module.exports.deletePharmacy = deletePharmacy;