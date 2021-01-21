async function displayRequestInfo(info, res, request_id) {
    try {
        const userInfo = await getCustomerInfo(request_id);
        info.push(userInfo);
        const requestedDrugTypes = await getRequestedDrugTypes(request_id);
        info.push(requestedDrugTypes);
        const requestedBrandedDrugs = await getRequestedBrandedDrugs(request_id);
        info.push(requestedBrandedDrugs);
        res.render("pharmacy/request_info", {
            info: info
        });
    } catch (e) {
        console.log(e.message);
    }
}

async function storeResponseInfo(res, drug_type_ids, branded_drug_ids, response_id, request_id, pharmacy_id) {
    try {
        const sIR = await storeInResponse(response_id, request_id, pharmacy_id);
        console.log(sIR);
        const sADT = await storeAcceptedDrugTypes(response_id, drug_type_ids);
        console.log(sADT);
        const sABD = await storeAcceptedBrandedDrugs(response_id, branded_drug_ids);
        console.log(sABD);
        res.status(200).send("Successfully Stored the Response...");
    } catch (e) {
        console.log(e.message);
    }
}

async function displayResponseInfo(info, res, response_id, request_id) {
    try {
        const userInfo = await getCustomerInfo(request_id);
        info.push(userInfo);
        const requestedDrugTypes = await getRequestedDrugTypes(request_id);
        info.push(requestedDrugTypes);
        const requestedBrandedDrugs = await getRequestedBrandedDrugs(request_id);
        info.push(requestedBrandedDrugs);
        const respondedDrugTypes = await getRespondedDrugTypes(response_id);
        info.push(respondedDrugTypes);
        const respondedBrandedDrugs = await getRespondedBrandedDrugs(response_id);
        info.push(respondedBrandedDrugs);
        res.render("pharmacy/edit_response", {
            info: info
        });
    } catch (e) {
        console.log(e.message);
    }
}



async function storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, response_id, request_id, pharmacy_id) {
    try {
        const dPR = await deletePreviousRespone(response_id);
        console.log(dPR);
        const sIR = await storeInResponse(response_id, request_id, pharmacy_id);
        console.log(sIR);
        const sADT = await storeAcceptedDrugTypes(response_id, drug_type_ids);
        console.log(sADT);
        const sABD = await storeAcceptedBrandedDrugs(response_id, branded_drug_ids);
        console.log(sABD);
        res.status(200).send("Successfully Stored the Edited Response...");
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.storeResponseInfo = storeResponseInfo;
module.exports.storeEditedResponseInfo = storeEditedResponseInfo;
module.exports.displayRequestInfo = displayRequestInfo;
module.exports.displayResponseInfo = displayResponseInfo;
