const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');

// const viewRequest = async (request, response) => {
//     const customerRequests = await Pharmacy.getAllRequests('30006');
//     console.log(customerRequests);
//     response.send(customerRequests);

// }

async function viewRequest(info, res, request_id) {
    try {
        const userInfo = await Pharmacy.getCustomerInfo(request_id);
        console.log(1);
        info.push(userInfo);
        const requestedDrugTypes = await Pharmacy.getRequestedDrugTypes(request_id);
        console.log(2);
        info.push(requestedDrugTypes);
        const requestedBrandedDrugs = await Pharmacy.getRequestedBrandedDrugs(request_id);
        console.log(3);
        info.push(requestedBrandedDrugs);
        return res.render("pharmacy/request_info", {
            info: info
        });
    } catch (e) {
        console.log(e.message);
    }
}


module.exports.viewRequest = viewRequest;