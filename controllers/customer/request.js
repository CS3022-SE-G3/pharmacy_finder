
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
    return response.send(200).send("Broadcast Form placeholder");
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
