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
    const schema = Joi.object({
        "full_name"             : Joi.string().required(),
        "nic"                   : Joi.string().required(),
        "email"                 : Joi.string().email().required(),           
        "address"               : Joi.string().required(),
        "latitude"              : Joi.number().min(5.916667).max(9.850000).required(),
        "longitude"             : Joi.number().min(79.683333).max(81.883333).required(),
        "gender"                : Joi.string().required(),
        "dob"                   : Joi.date().required(),
        "contact_no"            : Joi.number().integer().required(),
        "password"              : Joi.string().required(),
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
        var err_msg = "Customer error validation " + error.message;
        console.log(err_msg);
        // return response.status(400).send(error.message);

        var data = {error_msg: err_msg, post_body: request.body};
        return response.render('customer/signup', {err_data: data});
    }

    if (await Customer.isEmailRegistered(request.body.email)){
        var err_msg = "Email is already registered";
        console.log(err_msg);
        // return response.status(400).send(err_msg);
        var data = {error_msg: err_msg, post_body: request.body};
        return response.render('customer/signup', {err_data: data});
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        const result = await Customer.enterCustomer(request.body);
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);
        return response.render('500');

    }

    return response.status(200).send("OK");
}

exports.signupCustomer = signupCustomer;