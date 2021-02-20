const Joi = require('joi');
const Customer = require('../../models/Customer');
const _ =require('lodash');
/**
 * 
 * @param {number} customerId
 */
function validateCustomerId(customerId){
    
    // schema to validate
    const schema = Joi.object({
        "customerId"    : Joi.number().integer().min(10001).required(),
    });

    // return valid or not
    return schema.validate(customerId)
}

const viewProfileInformation = async (req, res) => {

    const customerId = req.session.user.id; 
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {
        return res.render("400", {
            err_data: "Invalid customer ID",
            redirect_to: "/customer/home",
            button_message: "Try Again",
            form_method: "GET"
        });
    }

    // get the profile information
    try
    {
        const result = await Customer.getProfileDetails(customerId);
        if (result.length === 0) {
            return res.render('404');
        }
        return res.render('customer/view_profile',{
            res_profile_info:result,
            pageTitle: 'My profile'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        return response.render('500', {
            err_data: err_msg
        });
    }
}

function validateCustomerAccount(customer) {
    const schema = Joi.object({
        "full_name"                 : Joi.string().required(),
        "nic"                       : Joi.string().required(),
        "email"                     : Joi.string().email().required(),
        "address"                   : Joi.string().required(),
        "latitude"                  : Joi.number().min(5.916667).max(9.850000).required(),
        "longitude"                 : Joi.number().min(79.683333).max(81.883333).required(),
        "gender"                    : Joi.string().required(),
        "dob"                       : Joi.date().required(),
        "contact_no"                : Joi.number().integer().required()
    });
    return schema.validate(customer);
}

const editProfileInformation = async (request, response) => {
        const { error } = await validateCustomerAccount(_.pick(request.body,
        [
            "full_name",
            "nic",
            "email",
            "address",
            "latitude",
            "longitude",
            "gender",
            "dob",
            "contact_no"
        ]
        ));

    if (error) {
        return response.render("400", {
            err_data: error.message,
            redirect_to: "/customer/home",
            button_message: "Try Again",
            form_method: "GET"
        });
    }
    try {
        request.session.user.email = request.body.email;
        const result = await Customer.editProfileDetails(_.pick(request.body,
            [
                "customer_id",
                "full_name",
                "nic",
                "email",
                "address",
                "latitude",
                "longitude",
                "gender",
                "dob",
                "contact_no"
            ]
        ));
    return response.redirect('/customer/profile/view');

    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        return response.render('500', {
            err_data: err_msg
        });
    }
}

const loadEditProfile = async (request, response) => {
    const customerId = request.params.customerId; 
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {
         return response.render("400", {
             err_data: "Invalid customer ID",
             redirect_to: "/customer/home",
             button_message: "Try Again",
             form_method: "GET"
         });
    }
    try
    {
        const result = await Customer.getProfileDetails(customerId);
        if (result.length === 0) {
            return response.render('404');
        }
        
        return response.render('customer/edit_profile',{
            customerId:customerId,
            profile:result
            
        });
    }
    catch (error) {
        return response.render('500', {
            err_data: "Internal server error " + error.message
        });
        
    }

}

exports.editProfileInformation = editProfileInformation;
exports.loadEditProfile = loadEditProfile;
exports.viewProfileInformation = viewProfileInformation;