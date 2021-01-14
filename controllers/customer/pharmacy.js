
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { pool } = require('../../database/connection');
const pharmacy = require('../../models/Pharmacy');

/**
 * 
 * @param {string} pharmacyName
 */
function validatePharmacyName(pharmacyName){

    // schema to validate
    const schema = Joi.object({
        
        "pharmacyName"    : Joi.string().required(),
        
    });

    // return valid or not
    return schema.validate(pharmacyName)
}


const view_pharmacy_information = (req, res) => {

    // get pharmacyID from URL
    const pharmacyName = req.params.name; 

    // validating
    const {error} = validatePharmacyName({pharmacyName:pharmacyName});

    if (error) {

        // log the error
        console.error('ValidationError:customer-pharmacy_name: '+error.details[0].message)

        // send bad request
        res.status(400).send("Invalid Pharmacy Name provided");

        res.end()

        // stop execution
        return
    }

    // get the information of the pharmacy as requested
    const result = pharmacy.getPharmacyInformation(pharmacyName);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).send(" ID not found");
            
        }
        
        // send data to front end
        
        res.status(200).json(data[0])
        res.end()
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        res.status(500).send("Internal Server Error")
    })

}

module.exports = view_pharmacy_information;