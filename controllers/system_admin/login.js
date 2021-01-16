const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const SystemAdmin = require('../../models/SystemAdmin');

function validateSystemAdminLoginInfo(system_admin){
    const schema = Joi.object().keys({
        "username": Joi.string().required(),
        "password": Joi.string().required()
    });

    return schema.validate(system_admin);
}

const loginSysAdmin = async (request, response) => {

    const { error } = validateSystemAdminLoginInfo(_.pick(request.body,
        [
            "username",
            "password"        
        ]
    ));


    if (error) {
        console.log("System Admin Login error validation " + error.message);
        return response.status(400).send(error.message);
    }

    try {
        const result = await SystemAdmin.getSysAdminInfo(request.body.username);

        if (!result[0]) {
            return response.status(401).send("Username is not valid");
        }

        const hashedPassword = result[0].password;
        const passwordCorrect = await bcrypt.compare(request.body.password, hashedPassword);
        if (!passwordCorrect) {
            return response.status(401).send("Invalid username or password");
        }

        request.session.user = {};
        request.session.user.username = result[0].username;
        request.session.user.id = result[0].sys_admin_id;

    }
    catch (error) {
        console.log(error);
        return response.status(500).send("Internal server error" + error.message);
    }

    // res.redirect('/');
    return response.status(200).send("OK");

}

exports.loginSysAdmin = loginSysAdmin;