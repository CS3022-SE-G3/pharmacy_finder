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
        "password": Joi.string().required(),
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
        var err_msg = "Pharmacy error validation " + error.message;
        console.log(err_msg);
        // return response.status(400).send(error.message);

        var data = { error_msg: err_msg, post_body: request.body };
        return response.render('pharmacy/signup_error', {err_data: data});
    }

    if (await Pharmacy.isEmailRegistered(request.body.email)){
        var err_msg = "Email is already registered";
        console.log(err_msg);
        // return response.status(400).send(err_msg);

        var data = {error_msg: err_msg, post_body: request.body};
        return response.render('pharmacy/signup_error', {err_data: data});
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        const result = await Pharmacy.enterPharmacy(request.body);
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);
        // return response.status(500).send(err_msg);

        return response.render('500');
    }

    return response.status(200).redirect("/pharmacy/login");

}

exports.signupPharmacy = signupPharmacy;