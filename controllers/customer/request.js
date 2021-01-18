
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
    const drug_types = await SystemAdmin.getAllDrugTypesandIDs();
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
    const customerID = request.body.id;
    const customerLocation = await Customer.getLocation(customerID);

    let tempDrugTypes=[];
    let tempBrandedDrugs=[];

    //both are defined
    if (request.body.drug_types) {
        tempDrugTypes = request.body.drug_types;
    }

    if (request.body.branded_drugs) {
        tempBrandedDrugs = request.body.branded_drugs;
    }

    
    
    /**
     * @todo add validation? minimum one drug has to be selected
     */
    if (tempDrugTypes.length == 0 && tempBrandedDrugs.length == 0) {
        return response.send("You have not selected any drugs")
    }
    
    console.log(tempDrugTypes);
    console.log(tempBrandedDrugs);

    const tempPharmaciesToLookUp = await Lookup.lookupPharmaciesForDrugs(tempBrandedDrugs, tempDrugTypes);
    let pharmaciesToLookUp = [];
    tempPharmaciesToLookUp.forEach(value => {
            pharmaciesToLookUp.push(value.pharmacy_id);
    });

    console.log(pharmaciesToLookUp);

    const latitude = customerLocation.latitude;
    const longitude = customerLocation.longitude;


    
    // const pharmacies = await Lookup.lookupPharmacies(left, right, up, down);
    // console.log(pharmacies);
    // console.log(tempDrugTypes);
    // console.log(tempBrandedDrugs);
    
    // try
    // {
    //     const id = await Customer.enterRequest(customerID);
    //     console.log(id);

    //     tempDrugTypes.forEach(function (drugType) {
    //         drugTypes.push([id, drugType]);
    //     });

    //     tempBrandedDrugs.forEach(function (brandedDrug) {
    //         brandedDrugs.push([id, brandedDrug]);
    //     });
        
    //     console.log(pharmacies);
    //     console.log(drugTypes);
    //     console.log(brandedDrugs);

    //     const id1 = await Customer.enterPharmacies(pharmacies);
    //     const id2 = await Customer.enterDrugTypes(drugTypes);
    //     const id3 = await Customer.enterBrandedDrugs(brandedDrugs);

    //     response.status(200).send("OK");
    // }
    // catch (error) {
    //     response.status(500).send("Internal Server error");
    //     console.log(error);
    // }
    
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
        return res.status(400).send("Invalid Customer");
    }

    // get the information of the broadcasted requests as requested
    const result = Customer.getBroadcastedRequests(customerId);

    result.then((data) => {

        if(data.length === 0){
            return res.status(400).send(" customerID not found");
            
        }
        
        // send data to front end
        
        return res.status(200).json(data);
    })
    .catch(error => {
        console.log(error)

        // send 'internal server error'
        return res.status(500).send("Internal Server Error")
    })

}

// ====================================================END OF USE CASE======================================================//

module.exports.viewBroadcastedRequests = viewBroadcastedRequests;
module.exports.getBroadcastForm = getBroadcastForm;
module.exports.createBroadcastRequest = createBroadcastRequest;
