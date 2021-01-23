
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const Customer = require('../../models/Customer');

function validateCustomerLoginInfo(customer) {
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
        var err_msg = "Customer Login error validation " + error.message;
        console.log(err_msg);
        // return response.status(400).send(error.message);
        winston.log('error', error.message);
        return response.render('customer/login_error', { err_data: err_msg });


    }

    try {
        const result = await Customer.getCustomerInfoByEmail(request.body.email);

        if (!result[0]) {
            var err_msg = "Email is not registered";
            console.log(err_msg);
            // return response.status(401).send("Email is not registered");
            
            return response.render('customer/login_error', { err_data: err_msg });

        }

        const hashedPassword = result[0].password;
        const passwordCorrect = await bcrypt.compare(request.body.password, hashedPassword);
        if (!passwordCorrect) {
            var err_msg = "Invalid email or password";
            console.log(err_msg);
            
            return response.render('customer/login_error', { err_data: err_msg });

            // return response.status(401).send("Invalid email or password");
        }

        request.session.user = {};
        request.session.user.email = result[0].email;
        request.session.user.id = result[0].customer_id;
        request.session.user.class = 2;

    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        // return response.status(500).send("Internal server error " + error.message);

        return response.render('500');
    }

    return response.status(200).redirect('/customer/home');

}

exports.loginCustomer = loginCustomer;