const express = require('express');
const Joi = require('joi');
const { pool } = require('../../database/connection');
const systemAdmin = require('../../models/SystemAdmin');

/**
 * @description - validating account id that sent from database
 * @param {number} accountId - customerId
 */
function validateAccountId(accountId){

    // schema to validate
    const schema = Joi.object({
        
        "accountId"    : Joi.number().integer().min(10001).required(),
        
    });

    // return valid or not
    return schema.validate(accountId)
}

/**
 * @description - handling system admin's request to view customer information.handles response and return customer infromation
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  
 */
const view_all_reported_pharmacies = (req, res) => {

    // get the reported pharamacy information of the pharamacy as requested
    const result = systemAdmin.getReportedPharmaciesInformation();

    result.then((data) => {

        // send no reported pharamacies
        if(data.length === 0){
            return res.status(400).send("No reported pharamacies");
            
        }
        
        // send data to front end
        res.status(200).json(data)
        res.end()
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        res.status(500).send("Internal Server Error")
    })

}

module.exports = view_all_reported_pharmacies;
