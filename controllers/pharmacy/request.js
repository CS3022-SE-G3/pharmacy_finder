
const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');

const viewAllRequests = async (request, response) => {
    const customerRequests = await Pharmacy.getAllRequests('30006');
    console.log(customerRequests);
    response.send(customerRequests);

}

module.exports.viewAllRequests = viewAllRequests;