
const Joi = require('joi');
const Customer = require('../../models/Customer');
const Lookup = require('../../models/Lookup');

// ======================================USE CASE: BROADCAST REQUESTS==================================================//

// STEP 1 -  GET THE BROADCAST FORM TO FILL IN

/**
 * 
 * @todo return the broadcast form
 * @todo get all drugs and drug types? from system admin
 */
const getBroadcastForm = (request, response) => {
    return response.status(200).send("Broadcast Form placeholder");
}

// STEP 2 - GET FILLED FORM INFO FROM CUSTOMER

const createBroadcastRequest = async (request, response) => {
    const customerID = request.body.id;
    const customerLocation = await Customer.getLocation(customerID);
    const drugTypes = []
    const brandedDrugs = []

    const tempDrugTypes = request.body.drug_types;
    const tempBrandedDrugs = request.body.branded_drugs;

    const pharmacies = await Lookup.lookupPharmacies(customerLocation, tempBrandedDrugs, tempDrugTypes);
    console.log(pharmacies);
    console.log(tempDrugTypes);
    console.log(tempBrandedDrugs);
    
    try
    {
        const id = await Customer.enterRequest(customerID);
        console.log(id);

        tempDrugTypes.forEach(function (drugType) {
            drugTypes.push([id, drugType]);
        });

        tempBrandedDrugs.forEach(function (brandedDrug) {
            brandedDrugs.push([id, brandedDrug]);
        });
        
        console.log(pharmacies);
        console.log(drugTypes);
        console.log(brandedDrugs);

        const id1 = await Customer.enterPharmacies(pharmacies);
        const id2 = await Customer.enterDrugTypes(drugTypes);
        const id3 = await Customer.enterBrandedDrugs(brandedDrugs);

        // const id1 = await Customer.enterPharmacies([[id, '30001'],[id,'30002']]);     //pharmacies
        // const id2 = await Customer.enterDrugTypes([[id,'40001'], [id,'40002']]);      //drug types
        // const id3 = await Customer.enterBrandedDrugs([[id,'50001'],[id, '50002']]);      //branded drugs

        response.status(200).send("OK");
    }
    catch (error) {
        response.status(500).send("Internal Server error");
        console.log(error);
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

        // log the error
        console.error('ValidationError:customer-requestId: '+error.details[0].message)

        // send bad request
        return res.status(400).send("Invalid Request");

    }

    // get the information of the broadcasted requests as requested
    // const result = await Customer.getBroadcastedRequests(requestId);
    const drug_types = await Customer.getDrugTypesFromRequest(requestID);
    const branded_drugs = await Customer.getBrandedDrugsFromRequest(requestID);
    console.log("Drug types request:")
    console.log(drug_types);
    console.log("Branded Drugs request:")
    console.log(branded_drugs);
    
    try{
        if(drug_types.length === 0 && branded_drugs.length===0){
            return res.status(404).render('404');
        }
        return res.status(200).render('customer/view_requests',{
            drug_types: drug_types,
            branded_drugs: branded_drugs,
            pageTitle: 'Request Details'
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).render('500');
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

    // get customerId from URL
    // get customerId from login
    // const customerId = req.customerId; 
    const customerId = "10001";

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
        return res.status(200).render('customer/view_all_requests',{
            all_requests: result,
            pageTitle: 'Requests'
        });
    }
    catch(error){
        console.log(error.message);
        return res.status(500).render('500');
    }
   

}

// ====================================================END OF USE CASE======================================================//

module.exports.viewBroadcastedRequests = viewBroadcastedRequests;
module.exports.getBroadcastForm = getBroadcastForm;
module.exports.createBroadcastRequest = createBroadcastRequest;
module.exports.viewAllRequests = viewAllRequests;
