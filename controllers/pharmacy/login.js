const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Pharmacy = require('../../models/Pharmacy');

function validatePharmacyLoginInfo(pharmacy){
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
        console.log("Pharmacy Login error validation " + error.message);
        return response.status(400).send(error.message);
    }

    try {
        const result = await Pharmacy.getPharmacyInfoByEmail(request.body.email);

        if (!result[0]) {
            return response.status(401).send("Email is not registered");
        }

        const hashedPassword = result[0].password;
        const passwordCorrect = await bcrypt.compare(request.body.password, hashedPassword);
        if (!passwordCorrect) {
            return response.status(401).send("Invalid email or password");
        }

        request.session.user = {};
        request.session.user.email = result[0].email;
        request.session.user.id = result[0].pharmacy_id;

    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error" + error.message);
    }

    // res.redirect('/');
    return response.status(200).send("OK");

}

exports.loginPharmacy= loginPharmacy;