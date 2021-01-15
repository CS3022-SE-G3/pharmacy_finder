
const Joi = require('joi');
const Customer = require('../../models/Customer');

// ======================================USE CASE: BROADCAST REQUESTS==================================================//

// STEP 1 -  GET THE BROADCAST FORM TO FILL IN

/**
 * 
 * @todo return the broadcast form
 * @todo get all drugs and drug types? from system admin
 */
const getBroadcastForm = (request, response) => {
    return response.send(200).send("Broadcast Form placeholder");
    
}

// STEP 2 - GET FILLED FORM INFO FROM CUSTOMER

const createBroadcastRequest = (request, response) => {
    
}

function validateBroadcast(broadcaset) {
    const schema = Joi.object({
        
    });
}
// ======================================END OF USE CASE==================================================//




// ======================================USE CASE: VIEW BROADCASTED REQUESTS==================================================//
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


const viewBroadcastedRequests = (req, res) => {

    // get customerId from URL
    const customerId = req.params.id; 

    // validating
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-customerId: '+error.details[0].message)

        // send bad request
        res.status(400).send("Invalid Customer");

        res.end()

        // stop execution
        return
    }

    // get the information of the broadcasted requests as requested
    const result = Customer.getBroadcastedRequests(customerId);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).send(" customerID not found");
            
        }
        
        // send data to front end
        
        res.status(200).json(data)
        res.end()
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        res.status(500).send("Internal Server Error")
    })

}

// ====================================================END OF USE CASE======================================================//

module.exports.viewBroadcastedRequests = viewBroadcastedRequests;
module.exports.getBroadcastForm = getBroadcastForm;
module.exports.createBroadcastRequest = createBroadcastRequest;
