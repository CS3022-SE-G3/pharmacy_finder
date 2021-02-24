const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');
const { request } = require('express');

async function displayRequestInfo(info, res, request_id) {
    try {
        if (request_id === undefined){
            res.redirect("/pharmacy/home");
        }else{
            const userInfo = await Pharmacy.getCustomerInfo(request_id);
            info.push(userInfo);
            const requestedDrugTypes = await Pharmacy.getRequestedDrugTypes(request_id);
            info.push(requestedDrugTypes);
            const requestedBrandedDrugs = await Pharmacy.getRequestedBrandedDrugs(request_id);
            info.push(requestedBrandedDrugs);
            res.json({info: info});
        }
    } catch (e) {
        // console.log(e.message);
    }
}

async function storeResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id) {
    try {
        if (request_id === undefined){
            res.redirect("/pharmacy/home");
        }else{
            const sIR = await Pharmacy.storeInResponse(request_id, pharmacy_id);
            const response = await Pharmacy.getResponseID(pharmacy_id, request_id);
            const sADT = await Pharmacy.storeAcceptedDrugTypes(response[0].response_id, drug_type_ids);
            const sABD = await Pharmacy.storeAcceptedBrandedDrugs(response[0].response_id, branded_drug_ids);
            return res.redirect("/pharmacy/home");
        }
    } catch (e) {
        // console.log(e.message);
    }
}

async function displayResponseInfo(info, res, pharmacy_id, request_id) {
    try {
        if (request_id === undefined){
            res.redirect("/pharmacy/home");
        }else{
            const userInfo = await Pharmacy.getCustomerInfo(request_id);
            info.push(userInfo);
            const requestedDrugTypes = await Pharmacy.getRequestedDrugTypes(request_id);
            info.push(requestedDrugTypes);
            const requestedBrandedDrugs = await Pharmacy.getRequestedBrandedDrugs(request_id);
            info.push(requestedBrandedDrugs);
            const response = await Pharmacy.getResponseID(pharmacy_id, request_id);
            const respondedDrugTypes = await Pharmacy.getRespondedDrugTypes(response[0].response_id);
            info.push(respondedDrugTypes);
            const respondedBrandedDrugs = await Pharmacy.getRespondedBrandedDrugs(response[0].response_id);
            info.push(respondedBrandedDrugs);
            res.json({info: info});
        }
    } catch (e) {
        // console.log(e.message);
    }
}



async function storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id) {
    try {
        if (request_id === undefined){
            res.redirect("/pharmacy/home");
        }else{
            var response = await Pharmacy.getResponseID(pharmacy_id, request_id);
            const dPR = await Pharmacy.deletePreviousRespone(response[0].response_id);
            const sIR = await Pharmacy.storeInResponse(request_id, pharmacy_id);
            response = await Pharmacy.getResponseID(pharmacy_id, request_id);
            const sADT = await Pharmacy.storeAcceptedDrugTypes(response[0].response_id, drug_type_ids);
            const sABD = await Pharmacy.storeAcceptedBrandedDrugs(response[0].response_id, branded_drug_ids);
            return res.redirect("/pharmacy/home");
        }
    } catch (e) {
        // console.log(e.message);
    }
}

module.exports.storeResponseInfo = storeResponseInfo;
module.exports.storeEditedResponseInfo = storeEditedResponseInfo;
module.exports.displayRequestInfo = displayRequestInfo;
module.exports.displayResponseInfo = displayResponseInfo;
