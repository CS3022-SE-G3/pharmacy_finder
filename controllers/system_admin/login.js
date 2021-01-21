const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const SystemAdmin = require('../../models/SystemAdmin');
const path = require('path');


function validateSystemAdminLoginInfo(system_admin) {
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
        var err_msg = "System Admin Login error validation " + error.message;
        console.log(err_msg);
        // return response.status(400).send(error.message);

        return response.render('system_admin/login_error', { err_data: err_msg });
    }

    try {
        const result = await SystemAdmin.getSysAdminInfo(request.body.username);

        if (!result[0]) {
            var err_msg = "Username is not valid";
            console.log(err_msg);
            // return response.status(401).send(err_msg);

            return response.render('system_admin/login_error', { err_data: err_msg });
        }

        const hashedPassword = result[0].password;
        const passwordCorrect = await bcrypt.compare(request.body.password, hashedPassword);
        if (!passwordCorrect) {
            var err_msg = "Invalid username or password";
            console.log(err_msg);
            // return response.status(401).send(err_msg);

            return response.render('system_admin/login_error', { err_data: err_msg });
        }

        request.session.user = {};
        request.session.user.username = result[0].username;
        request.session.user.id = result[0].sys_admin_id;
        request.session.user.class = 0;


    }
    catch (error) {
        var err_msg = "Internal server error" + error.message;
        console.log(error);
        // return response.status(500).send(err_msg);

        return response.render('500');
    }

    // res.redirect('/');
    return response.status(200).send("OK");

}

exports.loginSysAdmin = loginSysAdmin;