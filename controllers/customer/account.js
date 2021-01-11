
const { pool } = require('../../database/connection');
const Joi = require('joi');

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

function enterCustomer(customer) {
    return new Promise((resolve, reject) => {
        const result = pool.query("INSERT INTO Customer(`full_name`,`nic`,`email`,`address`,`gender`,`dob`,`contact_no`,`password`) VALUES (?,?,?,?,?,?,?,?)",
            [
                customer.full_name,
                customer.nic,
                customer.email,
                customer.address,
                customer.gender,
                customer.dob,
                customer.contact_no,
                customer.password
            ],
            function (error, results, fields) {
                if (error) {
                    console.log(result.sql);
                    reject(error);
                    return;
                };
                resolve(console.log("Done"));
            }
        )
    })
}

exports.validateCustomerAccount = validateCustomerAccount;
exports.enterCustomer = enterCustomer;