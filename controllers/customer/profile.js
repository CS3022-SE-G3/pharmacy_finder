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

    // get customerId from SESSION
    const customerId = req.session.user.id; 

    // validating
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-customerId: '+error.details[0].message)

        // send bad request
        return res.status(400).send("Invalid Customer ID");
    }

    // get the profile information
    try
    {
        const result = await Customer.getProfileDetails(customerId);
        console.log(result);
        if (result.length === 0) {
            return res.status(404).render('404');
        }
        
        return res.status(200).render('customer/view_profile',{
            res_profile_info:result,
            pageTitle: 'My profile'
        });
    }
    catch (error) {
        console.log(error)

        // send 'internal server error'
        return res.status(500).render('500');
        
    }

}

function validateCustomer(customer) {
    const schema = Joi.object({
        "customer_id"            : Joi.number().min(10001).required(),
        "full_name"             : Joi.string().required(),
        "nic"                   : Joi.string().required(),
        "email"                 : Joi.string().email().required(),           
        "address"               : Joi.string().required(),
        "gender"                : Joi.string().required(),
        "dob"                   : Joi.date().required(),
        "contact_no"            : Joi.number().integer().required(),
    });
    return schema.validateAsync(customer);

}

const editProfileInformation = async (request, response) => {
    
        
        const { error } = validateCustomer(_.pick(request.body,
        [
            "customer_id",
            "full_name",
            "nic",
            "email",
            "address",
            "gender",
            "dob",
            "contact_no"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);

    }
    try {
        const result = await Customer.editProfileDetails(_.pick(request.body,
            [
                "customer_id",
                "full_name",
                "nic",
                "email",
                "address",
                "gender",
                "dob",
                "contact_no"
            ]
            
        ));

    
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        // return response.status(500).send(err_msg);

        return response.render('500');

    }
    return response.status(200).redirect('/customer/profile/view');
}

const loadEditProfile = async (request, response) => {
    // get customerId from SESSION
    const customerId = request.params.customerId; 

    // validating
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-customerId: '+error.details[0].message)

        // send bad request
        return response.status(400).send("Invalid Customer ID");
    }


    // get the profile information
    try
    {
        const result = await Customer.getProfileDetails(customerId);
        console.log(result);
        if (result.length === 0) {
            return response.status(404).render('404');
        }
        
        return response.status(200).render('customer/edit_profile',{
            customerId:customerId,
            profile:result
            
        });
    }
    catch (error) {
        console.log(error)
        // send 'internal server error'
        return response.status(500).render('500');
        
    }

}

exports.editProfileInformation = editProfileInformation;
exports.loadEditProfile = loadEditProfile;
exports.viewProfileInformation = viewProfileInformation;