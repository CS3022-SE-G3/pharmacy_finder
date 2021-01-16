const Joi = require('joi');
const _ = require('lodash');
const Customer = require('../../models/Customer');
const { generatePassword } = require('../password');
const Lookup = require('../../models/lookup.js');

const lookup = async (email) => {
    const user = await Lookup.lookupEmail(email);
    if (user) {
        throw new Joi.ValidationError('Email already registered');
    }
};
/**
 * 
 * @todo add regex for NIC 
 */
function validateCustomerAccount(customer) {
    const schema = Joi.object({
        "full_name"             : Joi.string().required(),
        "nic"                   : Joi.string().required(),
        "email"                 : Joi.string().email().required().external(lookup),           
        "address"               : Joi.string().required(),
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
            "gender",
            "dob",
            "contact_no",
            "password",
            "password_confirmation"
        ]
    ));}

    catch (error) {
        console.log("Customer error validation" + error.message);
        return response.status(400).send(error.message);
    }

    request.body.password = await generatePassword(request.body.password);

    try {
        const result = await Customer.enterCustomer(request.body);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error" + error.message);
    }

    return response.status(200).send("OK");
}

exports.signupCustomer = signupCustomer;