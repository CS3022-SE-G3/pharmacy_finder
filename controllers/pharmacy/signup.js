const Joi = require('joi');
const _ = require('lodash');
const Pharmacy = require('../../models/Pharmacy');
const { generatePassword } = require('../password');
const { lookupEmail } = require('../lookup.js');

const lookup = async (email) => {
    const user = await lookupEmail(email);
    if (user) {
        throw new Joi.ValidationError('Email already registered');
    }
};

function validatePharmacyAccount(pharmacy) {
    const schema = Joi.object({
        "name": Joi.string().required(),
        "address": Joi.string().required(),
        "longitude": Joi.number().required(),
        "latitude": Joi.number().required(),
        "email": Joi.string().email().required().external(lookup),
        "contact_no": Joi.number().integer().required(),
        "password": Joi.string().required(),
        "confirm_password": Joi.string().valid(Joi.ref('password')).required()
    });
    return schema.validateAsync(pharmacy);

}

const signupPharmacy = async (request, response) => {
    try {
        await validatePharmacyAccount(_.pick(request.body,
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
    }

    catch (error) {
        console.log("Pharmacy error validation " + error.message);
        return response.status(400).send(error.message);
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        const result = await Pharmacy.enterPharmacy(request.body);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error" + error.message);
    }

    return response.status(200).send("OK");

}

exports.signupPharmacy = signupPharmacy;