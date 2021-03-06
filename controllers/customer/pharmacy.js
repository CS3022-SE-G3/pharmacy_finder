const Joi = require('joi');
const Customer = require('../../models/Customer');
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

    // validating
    const {error} = validatePharmacyName({pharmacyName:pharmacyName});

    if (error) {
        return res.status(400).render('400', {
            err_data: "Invalid pharmacy name provided",
            redirect_to: "/customer/pharmacy",
            button_message: "Try Again",
            form_method: "GET"
        });
    }

    // get the information of the pharmacy as requested
    try {
        const pharmacyInformation = await Customer.getPharmacyInformation(pharmacyName);
        if(pharmacyInformation.length === 0){
            return res.status(404).render('404');
        }
        
        // send data to front end
        
        return res.status(200).render('customer/view_pharmacy',{
            pharmacyInformation: pharmacyInformation[0],
            pageTitle: 'Pharmacy Information'
        });
    }
    catch (error) {
        return res.status(500).render('500', {
            err_data: "Internal server error " + error.message
        });
    }
}
const getCustomerSearchPharmacy = async (req,res)=>{

    res.status(200).render('customer/search_pharmacy',{
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
        return res.status(400).render('customer/search_pharmacy', {
            pageTitle: "Search Pharmacy",
            pharmacyInformation: [],
            hasErrors: true,
            errors: "Pharmacy not registered"
        });
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
        return res.status(200).render('customer/view_pharmacy',{
            pageTitle: "Search Pharmacy",
            pharmacyInformation: pharmacyInformation[0],
            hasErrors: false
        });
    }
    catch (error) {
        return res.status(500).render('500', {
            err_data: "Internal server error " + error.message
        });
    }
}

exports.viewPharmacyInformation = viewPharmacyInformation;
exports.getCustomerSearchPharmacy = getCustomerSearchPharmacy;
exports.postCustomerSearchPharmacy = postCustomerSearchPharmacy;