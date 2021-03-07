const Joi = require('joi');
const systemAdmin = require('../../models/SystemAdmin');

/**
 * @description - validating account id that sent from database
 * @param {number} accountId - customerId
 */
function validateAccountId(accountId){
    const schema = Joi.object({
        
        "accountId"    : Joi.number().integer().min(10001).required(),
        
    });
    return schema.validate(accountId)
}

/**
 * @description - handling system admin's request to view customer information.handles response and return customer infromation
 * @param {request} req - request to API
 * @param {response} res - response
 *
 *  
 */
const viewCustomerInformation = async (req, res) => {

    const accountId = req.params.accountId; 
    const {error} = validateAccountId({accountId:accountId});

    if (error) {

        return response.status(400).render('400', {
            err_data: "Invalid Account Information Provided",
            redirect_to: "/system_admin/home",
            button_message: "Try Again",
            form_method: "GET"
        });
    }

    
    

    try{
        // get the account information of the customer as requested
        const result = await systemAdmin.getCustomerAccountInformation(accountId);

        if(result.length === 0){
            return res.status(400).render('400', {
                err_data: "Account ID was not found.",
                redirect_to: "/system_admin/search",
                button_message: "Try Again",
                form_method: "GET"
            });
        }
        
        // send data to front end
        return res.status(200).json(result[0]);
    }
    catch(error){
        // send 'internal server error'
        var err_msg = "Internal server error " + error.message;
        console.log(error)
        return res.render('500', {
            err_data: err_msg
        });
    }

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