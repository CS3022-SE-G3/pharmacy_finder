const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const Pharmacy = require('../../models/Pharmacy');
const { generatePassword } = require('../password');
const path = require('path');


function validatePharmacyAccount(pharmacy) {
    const schema = Joi.object({
        "name": Joi.string().required(),
        "address": Joi.string().required(),
        "longitude": Joi.number().required(),
        "latitude": Joi.number().required(),
        "email": Joi.string().email().required(),
        "contact_no": Joi.number().integer().required(),
        "password": Joi.string().min(5).required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validate(pharmacy);

}

const signupPharmacy = async (request, response) => {
    const { error } = validatePharmacyAccount(_.pick(request.body,
        [
            "name",
            "address",
            "longitude",
            "latitude",
            "email",
            "contact_no",
            "password",
            "confirm_password"
        ]
    ));

    if (error) {
        var err_msg = error.message;

        return response.render('pharmacy/signup_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    if (await Pharmacy.isEmailRegistered(request.body.email)){
        var err_msg = "This email has already been registered";
        
        return response.render('pharmacy/signup_error', {
            error_msg: err_msg,
            post_body: request.body
        });
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        const result = await Pharmacy.enterPharmacy(request.body);
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        return response.render('500', {
            err_data: err_msg
        });
    }

    return response.redirect("/pharmacy/login");

}

exports.signupPharmacy = signupPharmacy;