const Joi = require('joi');
const Customer = require('../../models/Customer');
const SystemAdmin = require('../../models/SystemAdmin');
const Lookup = require('../../models/Lookup');

// ======================================USE CASE: BROADCAST REQUESTS==================================================//

// STEP 1 -  GET THE BROADCAST FORM TO FILL IN

/**
 * 
 * @todo return the broadcast form
 * @todo get all drugs and drug types? from system admin
 */
const getBroadcastForm = async (request, response) => {
    const drug_types = await SystemAdmin.getAllDrugTypes();
    const branded_drugs = await SystemAdmin.getAllDrugs();

    return response.render('customer/broadcastForm', {
        pageTitle: "Broadcast Form",
        drug_types: drug_types,
        branded_drugs: branded_drugs,
        hasErrors: false
    });
}

// STEP 2 - GET FILLED FORM INFO FROM CUSTOMER

const createBroadcastRequest = async (request, response) => {

    const customerID = request.session.user.id;
    const customerLocation = await Customer.getLocation(customerID);

    let tempDrugTypes = [];
    let tempBrandedDrugs = [];
    let tempDrugTypesBeforeProcessing = [];
    let tempBrandedDrugsBeforeProcessing = [];

    //both are defined
    if (request.body.drug_types) {
        tempDrugTypesBeforeProcessing = request.body.drug_types;
    }

    if (request.body.branded_drugs) {
        tempBrandedDrugsBeforeProcessing = request.body.branded_drugs;
    }
    if (tempDrugTypesBeforeProcessing.length == 0 && tempBrandedDrugsBeforeProcessing.length == 0) {
        {
            return response.render('400', {
                err_data: "You have not selected any drugs. Please select at least one brand/drug type",
                redirect_to: "/customer/request/broadcast",
                button_message: "Try Again",
                form_method:"GET"
            });
        }
    }
    if (typeof tempBrandedDrugsBeforeProcessing === 'string' || tempBrandedDrugsBeforeProcessing instanceof String) {
        tempBrandedDrugs.push(tempBrandedDrugsBeforeProcessing);
    }
    else {
        tempBrandedDrugs = tempBrandedDrugsBeforeProcessing;
    }

    if (typeof tempDrugTypesBeforeProcessing === 'string' || tempDrugTypesBeforeProcessing instanceof String) {
        tempDrugTypes.push(tempDrugTypesBeforeProcessing);
    } else {
        tempDrugTypes = tempDrugTypesBeforeProcessing;
    }

    const tempPharmaciesToLookUp = await Lookup.lookupPharmaciesForDrugs(tempBrandedDrugs, tempDrugTypes);

    let pharmaciesToLookUp = [];
    tempPharmaciesToLookUp.forEach(value => {
            pharmaciesToLookUp.push(value.pharmacy_id);
    });

    if (pharmaciesToLookUp.length>0)
    {
        const latitude = customerLocation.latitude;
        const longitude = customerLocation.longitude;
        const left = longitude - 0.27027;
        const right = longitude + 0.27027;
        const up = latitude + 0.27027;
        const down = latitude - 0.27027;

        try
        {
            const pharmacies = await Lookup.lookupPharmacies(left, right, up, down, pharmaciesToLookUp);    //returns pharmacies within the 30 km range
            if (!pharmacies || pharmacies.length == 0) {
                return response.render('400', {
                    err_data: "There are no approved pharmacies within 30km of your location that sell the medicine you require. Consider editing your location under your profile to get better search results",
                    redirect_to: "/customer/request/broadcast",
                    button_message: "Try Again",
                    form_method: "GET"
                });
            
            }
            const id = await Customer.enterRequestPart1();
            const waiting = await Customer.enterRequestPart2(id, customerID);

            let drugTypes = [];
            let brandedDrugs = [];
            let requestablePharmacies = [];

            tempDrugTypes.forEach(function (drugType) {
                drugTypes.push([id, drugType]);
            });

            tempBrandedDrugs.forEach(function (brandedDrug) {
                brandedDrugs.push([id, brandedDrug]);
            });

            pharmacies.forEach(function (pharmacy) {
                requestablePharmacies.push([id, pharmacy.pharmacy_id]);
            });

            const id1 = await Customer.enterPharmacies(requestablePharmacies);

            if (drugTypes.length>0)
            {
                const id2 = await Customer.enterDrugTypes(drugTypes);
            }
            if (brandedDrugs.length > 0)
            {
                const id3 = await Customer.enterBrandedDrugs(brandedDrugs);
            }
            return response.status(200).redirect('/customer/home');
            
        }
        catch (error) {
            var err_msg = "Internal server error " + error.message;

            return response.render('500', {
                err_data: err_msg
            });
            }
    }
    else {
        return response.render('400', {
            err_data: "No pharmacies have the available drugs",
            redirect_to: "/customer/home",
            button_message: "Return to home page",
            form_method:"GET"
        });
    }
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
function validateRequestId(requestId){
    // schema to validate
    const schema = Joi.object({
        "requestId"    : Joi.number().integer().min(60001).required(),
    });
    // return valid or not
    return schema.validate(requestId)
}

const viewBroadcastedRequests = async(req, res) => {
    // get customerId from URL
    const requestID = req.params.requestId; 

    // validating
    const {error} = validateRequestId({requestId:requestID});

    if (error) {
        return res.render('400', {
            err_data: "Invalid Request",
            redirect_to: "/customer/home",
            button_message: "Return to home page",
            form_method: "GET"
        });
    }
    const drug_types = await Customer.getDrugTypesFromRequest(requestID);
    const branded_drugs = await Customer.getBrandedDrugsFromRequest(requestID);
    const responded_pharmacies = await Customer.getRespondedPharmacies(requestID);
    
    try{
        if(drug_types.length === 0 && branded_drugs.length===0){
            return res.render('404');
        }
        if (responded_pharmacies.length === 0) {
            return res.render('customer/view_requests', {
                drug_types: drug_types,
                branded_drugs: branded_drugs,
                hasPharmacies:false,
                pageTitle: 'Request Details'
            });
        }
        else {
            return res.render('customer/view_requests', {
                drug_types: drug_types,
                branded_drugs: branded_drugs,
                hasPharmacies: true,
                pharmacies:responded_pharmacies,
                pageTitle: 'Request Details'
            });
        }
    }
    catch(error){
        return res.render('500', {
            err_data: "Internal server error " + error.message
        });
    }
}

// ====================================================END OF USE CASE======================================================//
// ======================================USE CASE: VIEW ALL REQUESTS==================================================//
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

const viewAllRequests = async(req, res) => {

    const customerId = req.session.user.id;
    // get the information of the broadcasted requests as requested
    
    try {
        let result = await Customer.getAllRequests(customerId);
        return res.status(200).render('customer/home',{
            all_requests: result,
            pageTitle: 'Requests'
        });
    }
    catch(error){
        var err_msg = "Internal server error " + error.message;

        return response.render('500', {
            err_data: err_msg
        });
    }
   

}

// ====================================================END OF USE CASE======================================================//

const deleteBroadcast = async (req, res) => {
    const requestID = req.body.requestID;
    result = await Customer.deleteRequest(requestID);
    res.redirect('/customer/home');
}

module.exports.viewBroadcastedRequests = viewBroadcastedRequests;
module.exports.getBroadcastForm = getBroadcastForm;
module.exports.createBroadcastRequest = createBroadcastRequest;
module.exports.viewAllRequests = viewAllRequests;
module.exports.deleteBroadcast = deleteBroadcast;
