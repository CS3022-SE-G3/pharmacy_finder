
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
    console.log(drug_types);
    console.log(branded_drugs);

    return response.status(200).render('customer/broadcastForm', {
        pageTitle: "Broadcast Form",
        drug_types: drug_types,
        branded_drugs: branded_drugs,
        hasErrors: false
    });
}

// STEP 2 - GET FILLED FORM INFO FROM CUSTOMER

const createBroadcastRequest = async (request, response) => {

    //@todo: get customer id either from session or from post request
    const customerID = request.session.user.id;
    console.log("Customer ID");
    console.log(customerID);
    console.log("");

    const customerLocation = await Customer.getLocation(customerID);    //lat and longitude
    console.log("Customer Location");
    console.log(customerLocation);
    console.log("");

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
    
    /**
     * @todo add validation? minimum one drug has to be selected
     */
    if (tempDrugTypesBeforeProcessing.length == 0 && tempBrandedDrugsBeforeProcessing.length == 0) {
        {
            return response.status(400).render('400', {
                err_data: "You have not selected any drugs. Please select at least one brand/drug type",
                redirect_to: "/customer/request/broadcast",
                button_message: "Try Again",
                form_method:"GET"
            });
        }
    }
    console.log("Drug types entered by customer");
    console.log(tempDrugTypesBeforeProcessing);
    console.log("");

    console.log("Branded drugs entered by customer");
    console.log(tempBrandedDrugsBeforeProcessing);

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

    console.log("Pharmacies that contain the drugs needed by the customer");
    console.log(pharmaciesToLookUp);
    console.log("");
    if (pharmaciesToLookUp.length>0)
    {
        const latitude = customerLocation.latitude;
        const longitude = customerLocation.longitude;
        const left = longitude - 0.27027;
        const right = longitude + 0.27027;
        const up = latitude + 0.27027;
        const down = latitude - 0.27027;
        console.log("Distance ranges");
        console.log("left");
        console.log(left);
        console.log("");

        console.log("right");
        console.log(right);
        console.log("");

        console.log("up");
        console.log(up);
        console.log("");

        console.log("down");
        console.log(down);
        console.log("");

        // latitude +- 0.27027
        // longitude +- 0.27027
        try
        {
            const pharmacies = await Lookup.lookupPharmacies(left, right, up, down, pharmaciesToLookUp);    //returns pharmacies within the 30 km range
            if (!pharmacies || pharmacies.length==0) {
                return response.send("There are no approved pharmacies within 30km of your location that sell the medicine you require. Consider editing your location under your profile to get better search results");
            }
            console.log("pharmacies in the distance range");
            console.log(pharmacies);
            console.log("");

            const id = await Customer.enterRequestPart1();
            const waiting = await Customer.enterRequestPart2(id, customerID);

            console.log("request id to be entered");
            console.log(id);
            console.log("");

            let drugTypes = [];
            let brandedDrugs = [];
            let requestablePharmacies = [];

            tempDrugTypes.forEach(function (drugType) {
                drugTypes.push([id, drugType]);
            });

            console.log("drug types to be entered");
            console.log(drugTypes);
            console.log("");

            tempBrandedDrugs.forEach(function (brandedDrug) {
                brandedDrugs.push([id, brandedDrug]);
            });

            console.log("branded drugs to be entered");
            console.log(brandedDrugs);
            console.log("");

            pharmacies.forEach(function (pharmacy) {
                requestablePharmacies.push([id, pharmacy.pharmacy_id]);
            });

            console.log("pharmacies to be entered");
            console.log(requestablePharmacies);
            console.log("");

            const id1 = await Customer.enterPharmacies(requestablePharmacies);
            console.log("Pharmacies entered status");
            console.log(id1);
            console.log("");
            if (drugTypes.length>0)
            {
                const id2 = await Customer.enterDrugTypes(drugTypes);
                console.log("Drug types entered status");
                console.log(id2);
                console.log("");
            }
            if (brandedDrugs.length > 0)
            {
                const id3 = await Customer.enterBrandedDrugs(brandedDrugs);
                console.log("Branded drugs entered status");
                console.log(id3);
                console.log("");
            }
            
            return response.status(200).redirect('/customer/home');
            
        }
        catch (error) {
            console.log(error);
            return response.status(500).render('500');
            }
    }
    else {
        return response.status(400).render('400', {
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
        console.error('ValidationError:customer-requestId: '+error.details[0].message)
        return res.status(400).send("Invalid Request");

    }
    const drug_types = await Customer.getDrugTypesFromRequest(requestID);
    const branded_drugs = await Customer.getBrandedDrugsFromRequest(requestID);
    const responded_pharmacies = await Customer.getRespondedPharmacies(requestID);

    console.log("Drug types request:")
    console.log(drug_types);
    console.log("Branded Drugs request:")
    console.log(branded_drugs);
    
    try{
        if(drug_types.length === 0 && branded_drugs.length===0){
            return res.status(404).render('404');
        }

        if (responded_pharmacies.length === 0) {
            return res.status(200).render('customer/view_requests', {
                drug_types: drug_types,
                branded_drugs: branded_drugs,
                hasPharmacies:false,
                pageTitle: 'Request Details'
            });
        }
        else {
            return res.status(200).render('customer/view_requests', {
                drug_types: drug_types,
                branded_drugs: branded_drugs,
                hasPharmacies: true,
                pharmacies:responded_pharmacies,
                pageTitle: 'Request Details'
            });
            
        }

        
    }
    catch(error){
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
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
    console.log("Viewing all requests");
    // validating
    const {error} = validateCustomerId({customerId:customerId});

    if (error) {

        // log the error
        console.error('ValidationError:customer-customerId: '+error.details[0].message)

        // send bad request
        return res.status(400).send("Invalid Customer");
    }

    // get the information of the broadcasted requests as requested
    let result = await Customer.getAllRequests(customerId);
    
    try{
        if(result.length === 0){
            return res.status(404).render('404');
            
        }

        return res.status(200).render('customer/home',{
            all_requests: result,
            pageTitle: 'Requests'
        });
    }
    catch(error){
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return response.render('500', {
            err_data: err_msg
        });
    }
   

}

// ====================================================END OF USE CASE======================================================//

const deleteBroadcast = async (req, res) => {
    const requestID = req.body.requestID;
    result = await Customer.deleteRequest(requestID);
    res.status(200).redirect('/customer/home');
}

module.exports.viewBroadcastedRequests = viewBroadcastedRequests;
module.exports.getBroadcastForm = getBroadcastForm;
module.exports.createBroadcastRequest = createBroadcastRequest;
module.exports.viewAllRequests = viewAllRequests;
module.exports.deleteBroadcast = deleteBroadcast;
