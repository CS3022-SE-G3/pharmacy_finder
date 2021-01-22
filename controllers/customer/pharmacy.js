
const Joi = require('joi');
const { pool } = require('../../database/connection');
const Customer = require('../../models/Customer');
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


const viewPharmacyInformation = async(req, res) => {

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
    const pharmacyInformation = await Customer.getPharmacyInformation(pharmacyName);
    console.log(pharmacyInformation);
    try{
        if(pharmacyInformation.length === 0){
            return res.status(404).render('404');
            
        }
        
        // send data to front end
        
        return res.status(200).render('customer/view_pharmacy',{
            pharmacyInformation: pharmacyInformation[0],
            pageTitle: 'Pharmacy Information'
        });
    }catch(error){
        console.log(error.message)
        winston.log('error', error.message);

        // send 'internal server error'
        return res.status(500).render('500');
    }
}
const getCustomerSearchPharmacy = async (req,res)=>{

    res.render('customer/search_pharmacy',{
        pageTitle: "Search Pharmacy",
        pharmacyInformation: [],
        hasErrors: false
    });
}
    
const postCustomerSearchPharmacy = async(req,res)=>{
    let pharmacyInformation;
    const pharmacyName = req.body.pharmacyName;
    const {error} = validatePharmacyName({pharmacyName:pharmacyName});
    if (error){
        console.log(error);
        return res.status(500).render('500');
    }
    try{
        pharmacyInformation = await Customer.getPharmacyInformation(pharmacyName);
        if (pharmacyInformation.length===0){
            return res.status(404).render('customer/search_pharmacy',{
                pageTitle: "Search Pharmacy",
                pharmacyInformation: [],
                hasErrors: true,
                errors: "Pharmacy not registered"
            });
        }
        console.log(pharmacyInformation);
        return res.status(200).render('customer/view_pharmacy',{
            pageTitle: "Search Pharmacy",
            pharmacyInformation: pharmacyInformation[0],
            hasErrors: false
        });
    }
    catch (error) {
        winston.log('error', error.message);
        console.log(error.message);
        return res.status(500).render('500');
    }
        
}



exports.viewPharmacyInformation = viewPharmacyInformation;
exports.getCustomerSearchPharmacy = getCustomerSearchPharmacy;
exports.postCustomerSearchPharmacy = postCustomerSearchPharmacy;