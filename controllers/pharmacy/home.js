const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');

const viewHome = async (request, response) => {


    try {
        const result_1 = await Pharmacy.getRequests(request.session.user.id);
        const result_2 = await Pharmacy.getPharmacyInfoByID(request.session.user.id);

        var data = {requests: result_1[1], responded_requests: result_1[0], pharmacy_info: result_2[0]};
        return response.status(200).render("pharmacy/dashboard", {data: data});

    }
    catch (error) {
        return response.render('500', {
            err_data: "Internal server error" + error.message
        });
    }

}

exports.viewHome = viewHome;