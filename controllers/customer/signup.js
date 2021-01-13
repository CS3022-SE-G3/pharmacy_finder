
const Joi = require('joi');
const _ = require('lodash');
const Customer = require('../../models/Customer');
const { generatePassword } = require('../password');

function validateCustomerAccount(customer) {
    const schema = Joi.object({
        "full_name"     : Joi.string().required(),
        "nic"           : Joi.string().required(),
        "email"         : Joi.string().email().required(),           
        "address"       : Joi.string().required(),
        "gender"        : Joi.string().required(),
        "dob"           : Joi.date().required(),
        "contact_no"    : Joi.number().integer().required(),
        "password"      : Joi.string().required()
    });
    return schema.validate(customer);

}

const signupCustomer = async (request, response) => {
    const {error} = validateCustomerAccount(_.pick(request.body,
        [
            "full_name",
            "nic",
            "email",
            "address",
            "gender",
            "dob",
            "contact_no",
            "password"
        ]
    ));

    if (error) {
        console.log("Customer error validation" + error.message[0]);
        return response.status(400).send("Incorrect information entered");
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