
const Joi = require('joi');
//const SystemAdmin = require('../../models/SystemAdmin');
const _ = require('lodash');

/** 
 * @description Render home page
 *
*/
const viewHomePage = async (request, response) => {
    try {
        return response.status(200).render('system_admin/home', {
            pageTitle: 'Home'
        });
    }
    catch (error) {
        console.log(error.message);
        return response.status(500).send("internal server error");
    }
}

exports.viewHomePage = viewHomePage;

