const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');
const { request } = require('express');

async function displayRequestInfo(info, res, request_id) {
    try {
        const userInfo = await Pharmacy.getCustomerInfo(request_id);
        info.push(userInfo);
        const requestedDrugTypes = await Pharmacy.getRequestedDrugTypes(request_id);
        info.push(requestedDrugTypes);
        const requestedBrandedDrugs = await Pharmacy.getRequestedBrandedDrugs(request_id);
        info.push(requestedBrandedDrugs);
        return res.render("pharmacy/request_info", {
            info: info
        });
    } catch (e) {
        console.log(e.message);
    }
}

async function storeResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id) {
    try {
        const response = await Pharmacy.getResponseID(pharmacy_id, request_id);
        const sIR = await Pharmacy.storeInResponse(response[0].response_id, request_id, pharmacy_id);
        console.log(sIR);
        const sADT = await Pharmacy.storeAcceptedDrugTypes(response[0].response_id, drug_type_ids);
        console.log(sADT);
        const sABD = await Pharmacy.storeAcceptedBrandedDrugs(response[0].response_id, branded_drug_ids);
        console.log(sABD);
        return res.status(200).send("Successfully Stored the Response...");
    } catch (e) {
        console.log(e.message);
    }
}

async function displayResponseInfo(info, res, pharmacy_id, request_id) {
    try {
        const userInfo = await Pharmacy.getCustomerInfo(request_id);
        info.push(userInfo);
        const requestedDrugTypes = await Pharmacy.getRequestedDrugTypes(request_id);
        info.push(requestedDrugTypes);
        const requestedBrandedDrugs = await Pharmacy.getRequestedBrandedDrugs(request_id);
        info.push(requestedBrandedDrugs);
        const response = await Pharmacy.getResponseID(pharmacy_id, request_id);
        const respondedDrugTypes = await Pharmacy.getRespondedDrugTypes(response[0].responses_id);
        info.push(respondedDrugTypes);
        const respondedBrandedDrugs = await Pharmacy.getRespondedBrandedDrugs(response[0].response_id);
        info.push(respondedBrandedDrugs);
        return res.render("pharmacy/edit_response", {
            info: info
        });
    } catch (e) {
        console.log(e.message);
    }
}



async function storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id) {
    try {
        const response = await Pharmacy.getResponseID(pharmacy_id, request_id);
        const dPR = await Pharmacy.deletePreviousRespone(response[0].response_id);
        console.log(dPR);
        const sIR = await Pharmacy.storeInResponse(response[0].response_id, request_id, pharmacy_id);
        console.log(sIR);
        const sADT = await Pharmacy.storeAcceptedDrugTypes(response[0].response_id, drug_type_ids);
        console.log(sADT);
        const sABD = await Pharmacy.storeAcceptedBrandedDrugs(response[0].response_id, branded_drug_ids);
        console.log(sABD);
        return res.status(200).send("Successfully Stored the Edited Response...");
    } catch (e) {
        console.log(e.message);
    }
}

module.exports.storeResponseInfo = storeResponseInfo;
module.exports.storeEditedResponseInfo = storeEditedResponseInfo;
module.exports.displayRequestInfo = displayRequestInfo;
module.exports.displayResponseInfo = displayResponseInfo;
