const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { pool } = require('../../database/connection');

/**
 * 
 * @param {number} accountId - customerId
 */
function validateAccountId(accountId){

    // schema to validate
    const schema = Joi.object({
        
        "accountId"    : Joi.number().integer().required(),
        
    });

    // return valid or not
    return schema.validate(accountId)
}

/**
 * 
 * @param {number} accountId - customerId
 */
async function getCustomerAccountInfromation(accountId){

    try {
        const response = await new Promise((resolve, reject) => {
            // if query succces we gonna resolve the result
            // else we gonna reject it

            const qry = "SELECT full_name,nic,email,address,gender,dob,contact_no FROM Customer WHERE customer_id=?"; // query

            // send th qry
            pool.query(qry,[accountId], (err, res) =>{
                if (err){
                    reject (new Error(err.message));
                } 
                // else
                console.log(res)
                resolve(res);
            })
        }
        )

        return response;

    } catch (error) {
        console.log(error)
    }

}
/**
 * 
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  handles response and return customer infromation
 */
const view_customer_information = (req, res) => {

    
    // get accountId from URL
    const accountId = req.params.accountId; 

    // validating
    const {error} = validateAccountId({accountId:accountId});

    if (error) {

        // log the error
        console.error('ValidationError:system_admin-customer_account_id: '+error.details[0].message)

        // send bad request
        res.status(400).json({
            description:'Invalid account Id',
            error:true,
        })

        res.end()

        // stop execution
        return
    }

    // get the account information of the customer as requested
    const result = getCustomerAccountInfromation(accountId);

    result.then((data) => {

        if(data.length === 0){
            res.status(400).json({
                description:'Account Id not found',
                error:true
            })

            return
        }
        
        // send data to front end
        res.status(200).json(data[0])
        res.end()
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        res.status(200).json({
            description:'Internal server error',
            error:true
        })
    })

}

module.exports = view_customer_information;