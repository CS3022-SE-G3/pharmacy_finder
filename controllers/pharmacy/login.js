const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');


function validatePharmacyLoginInfo(pharmacy) {
    const schema = Joi.object().keys({
        "email": Joi.string().email().required(),
        "password": Joi.string().required()
    });

    return schema.validate(pharmacy);
}

const loginPharmacy = async (request, response) => {

    const { error } = validatePharmacyLoginInfo(_.pick(request.body,
        [
            "email",
            "password"
        ]
    ));


    if (error) {
        var err_msg = "Pharmacy Login error validation " + error.message;

        return response.render('pharmacy/login_error', { err_data: err_msg });
    }

    try {
        const result = await Pharmacy.getPharmacyInfoByEmail(request.body.email);

        if (!result[0]) {
            var err_msg = "Email is not registered";

            return response.render('pharmacy/login_error', { err_data: err_msg });
        }

        if (result[0].approved_state == "Not Approved"){
            var err_msg = "Your pharmacy have not been approved";

            return response.render('pharmacy/login_error', { err_data: err_msg });
        }

        const hashedPassword = result[0].password;
        const passwordCorrect = await bcrypt.compare(request.body.password, hashedPassword);
        if (!passwordCorrect) {
            var err_msg = "Invalid email or password";

            return response.render('pharmacy/login_error', { err_data: err_msg });
        }

        request.session.user = {};
        request.session.user.email = result[0].email;
        request.session.user.id = result[0].pharmacy_id;
        request.session.user.class = 1;


    }
    catch (error) {
        var err_msg = "Internal server error" + error.message;

        return response.render('500', {
            err_data: err_msg
        });
    }

    return response.redirect('/pharmacy/home');

}

exports.loginPharmacy = loginPharmacy;