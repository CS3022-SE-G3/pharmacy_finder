const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const Customer = require('../../models/Customer');

function validateCustomerLoginInfo(customer){
    const schema = Joi.object().keys({
        "email": Joi.string().email().required(),
        "password": Joi.string().required()
    });

    return schema.validate(customer);
}

const loginCustomer = async (request, response) => {

    const { error } = validateCustomerLoginInfo(_.pick(request.body,
        [
            "email",
            "password"        
        ]
    ));


    if (error) {
        console.log("Customer Login error validation " + error.message);
        return response.status(400).send(error.message);
    }

    try {
        const result = await Customer.getCustomerInfoByEmail(request.body.email);

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
        request.session.user.id = result[0].customer_id;
        request.session.user.class = 2;

    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error" + error.message);
    }

    // res.redirect('/');
    return response.status(200).send("OK");

}

exports.loginCustomer= loginCustomer;