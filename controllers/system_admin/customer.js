const Joi = require('joi');
const systemAdmin = require('../../models/SystemAdmin');

/**
 * @description - validating account id that sent from database
 * @param {number} accountId - customerId
 */
function validateAccountId(accountId){

    // schema to validate
    const schema = Joi.object({
        
        "accountId"    : Joi.number().integer().min(10001).required(),
        
    });

    // return valid or not
    return schema.validate(accountId)
}

/**
 * @description - handling system admin's request to view customer information.handles response and return customer infromation
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  
 */
const viewCustomerInformation = (req, res) => {

    // get accountId from URL
    const accountId = req.params.accountId; 

    // validating
    const {error} = validateAccountId({accountId:accountId});

    if (error) {

        // log the error
        console.error('ValidationError:system_admin-customer_account_id: '+error.details[0].message)

        return response.status(400).render('400', {
            err_data: "Invalid Account Information Provided",
            redirect_to: "/system_admin/home",
            button_message: "Try Again",
            form_method: "GET"
        });
    }

    // get the account information of the customer as requested
    const result = systemAdmin.getCustomerAccountInformation(accountId);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).render('400', {
                err_data: "Account ID was not found.",
                redirect_to: "/system_admin/search",
                button_message: "Try Again",
                form_method: "GET"
            });
        }
        
        // send data to front end
        res.status(200).json(data[0])
        res.end()
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    })

}

/**
 * @description - render form to get cutomer id from system admin to view customer detatils
 * @param {request} req - request to API
 * @param {response} res - reponse
 */
const renderForm = (req,res) => {
    try {

        // send view
        res.render('system_admin/viewCustomer',{title: 'View | customer'});
        
    } catch (error) {

        // send 'internal server error'
       var err_msg = "Internal server error " + error.message;
       console.log(error);

       return response.render('500', {
           err_data: err_msg
       });
    }
}
module.exports.viewCustomerInformation = viewCustomerInformation;
module.exports.renderForm = renderForm;