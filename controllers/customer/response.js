

const Joi = require('joi');
const Customer = require('../../models/Customer');

/**
 * 
 * @param {number} requestId
 */
function validateRequestId(requestId){

    // schema to validate
    const schema = Joi.object({
        
        "requestId"    : Joi.number().integer().min(60001).required(),
        
    });

    // return valid or not
    return schema.validate(requestId);
}


const viewRespondedPharmacies = async (req, res) => {

    // get requestId from URL
    const requestId = req.params.id; 

    // validating
    const {error} = validateRequestId({requestId:requestId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-requestId: '+error.details[0].message)

        // send bad request
        res.status(400).send("Invalid Request ID");

        res.end()

        // stop execution
        return;
    }

    // get the information of the responded pharmacies as requested
    try
    {
        const result = await Customer.getRespondedPharmacies(requestId);
        console.log(result);
        if (result.length === 0) {
            return res.status(404).render('404');
        }
        
        return res.status(200).render('customer/view_responded_pharmacies',{
            res_pharm_info:result,
            pageTitle: 'Responded Pharmacies'
        });
    }
    catch (error) {
        console.log(error)

        // send 'internal server error'
        return res.status(500).render('500');
        
    }

}

exports.viewRespondedPharmacies = viewRespondedPharmacies;