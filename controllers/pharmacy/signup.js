const Joi = require('joi');
const _ = require('lodash');
const Pharmacy = require('../../models/Pharmacy');
const { generatePassword } = require('../password');

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
        console.log("Pharmacy error validation " + error.message);
        return response.status(400).send("Incorrect information entered");
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

exports.signupPharmacy= signupPharmacy;