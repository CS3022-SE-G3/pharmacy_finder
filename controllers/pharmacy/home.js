const express = require('express');
const router = express.Router();
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');

const viewHome = async (request, response) => {


    try {
        if (request.session.user.class !== undefined){
            if (request.session.user.class === 1){
                const result_1 = await Pharmacy.getRequests(request.session.user.id);
                const result_2 = await Pharmacy.getPharmacyInfoByID(request.session.user.id);
    
                var data = {requests: result_1[1], responded_requests: result_1[0], pharmacy_info: result_2[0]};
                return response.render("pharmacy/dashboard", {data: data});
            }else if (request.session.user.class === 0){
                response.redirect('/system_admin/home');
            }else{
                response.redirect('/customer/home');
            }
        }else{
            response.redirect('/');
        }
        

    }
    catch (error) {
        // var err_msg = "Internal server error" + error.message;
        // return response.render('500', { err_data: err_msg });
    }

    

}

exports.viewHome = viewHome;