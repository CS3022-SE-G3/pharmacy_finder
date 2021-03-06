const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const Customer = require('../../models/Customer');
const { generatePassword } = require('../password');
const path = require('path');

/**
 * 
 * @todo add regex for NIC 
 */
function validateCustomerAccount(customer) {
    const now = Date.now();
    const cutoffDate = new Date(now - (1000 * 60 * 60 * 24 * 365 * 18)); 

    const schema = Joi.object({
        "full_name"             : Joi.string().required(),
        "nic"                   : Joi.string().required(),
        "email"                 : Joi.string().email().required(),           
        "address"               : Joi.string().required(),
        "latitude"              : Joi.number().min(5.916667).max(9.850000).required(),
        "longitude"             : Joi.number().min(79.683333).max(81.883333).required(),
        "gender"                : Joi.string().required(),
        "dob"                   : Joi.date().max(cutoffDate).required()
            .messages({
                    'date.max': `You must be at least 18 years old to register on pharmacy-finder.`
                }),
        "contact_no"            : Joi.number().integer().required(),
        "password"              : Joi.string().min(5).required(),
        "confirm_password"      : Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validateAsync(customer);
}

const signupCustomer = async (request, response) => {
    try
    {
        await validateCustomerAccount(_.pick(request.body,
        [
            "full_name",
            "nic",
            "email",
            "address",
            "latitude",
            "longitude",
            "gender",
            "dob",
            "contact_no",
            "password",
            "confirm_password"
        ]
        ));
    }

    catch (error) {
        var err_msg = error.message;
        return response.status(400).render('customer/signup_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    if (await Customer.isEmailRegistered(request.body.email)){
        var err_msg = "This email address has already been registered";
        return response.status(400).render('customer/signup_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        await Customer.enterCustomer(request.body);
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;

        return response.status(500).render('500', {
            err_data: err_msg
        });
    }
    return response.status(200).redirect('/customer/login');
}

exports.signupCustomer = signupCustomer;