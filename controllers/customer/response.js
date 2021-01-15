

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
    return schema.validate(requestId)
}


const viewRespondedPharmacies = (req, res) => {

    // get requestId from URL
    const requestId = req.params.Id; 

    // validating
    const {error} = validateRequestId({requestId:requestId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-requestId: '+error.details[0].message)

        // send bad request
        res.status(400).send("Invalid Request ID");

        res.end()

        // stop execution
        return
    }

    // get the information of the responded pharmacies as requested
    const result = Customer.getRespondedPharmacies(requestId);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).send(" Responded pharmacies not found");
            
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

module.exports.viewRespondedPharmacies = viewRespondedPharmacies;