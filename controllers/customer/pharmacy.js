
const Joi = require('joi');
const pharmacy = require('../../models/Pharmacy');

/**
 * 
 * @param {string} pharmacyName
 */
function validatePharmacyName(pharmacyName){

    // schema to validate
    const schema = Joi.object({
        
        "pharmacyName"    : Joi.string().trim().min(3).required(),
        
    });

    // return valid or not
    return schema.validate(pharmacyName)
}


const viewPharmacyInformation = (req, res) => {

    // get pharmacyID from URL
    const pharmacyName = req.params.pharmacy_name; 
    console.log(pharmacyName);

    // validating
    const {error} = validatePharmacyName({pharmacyName:pharmacyName});

    if (error) {

        // log the error
        console.error('ValidationError:customer-pharmacy_name: '+error.details[0].message)

        // send bad request
        return res.status(400).send("Invalid Pharmacy Name provided");
    }

    // get the information of the pharmacy as requested
    const result = pharmacy.getPharmacyInformation(pharmacyName);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).send("Pharmacy not registered");
            
        }
        
        return res.status(200).render('/customer/pharmacy_information', {
            data: data[0]
        });
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        return res.status(500).render('500');
    })

}

module.exports.viewPharmacyInformation = viewPharmacyInformation;