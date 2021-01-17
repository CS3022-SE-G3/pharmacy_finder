
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
        
        "pharmacyName"    : Joi.string().trim().min(3).required(),
        
    });

    // return valid or not
    return schema.validate(pharmacyName)
}


const viewPharmacyInformation = async(req, res) => {

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
    const pharmacyInformation = await pharmacy.getPharmacyInformation(pharmacyName);
    console.log(pharmacyInformation);
    try{
        if(pharmacyInformation.length === 0){
            return res.status(404).render('404');
            
        }
        
        // send data to front end
        
        return res.status(200).render('customer/view_pharmacy',{
            pharmacyInformation: pharmacyInformation[0],
            pageTitle: 'Pharmacy Information'
        });
    }catch(error){
        console.log(error.message)

        // send 'internal server error'
        return res.status(500).render('500');
    }
        


}

exports.viewPharmacyInformation = viewPharmacyInformation;