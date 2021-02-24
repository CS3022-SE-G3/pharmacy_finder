const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const Pharmacy = require('../../models/Pharmacy');
const path = require('path');

const getPharmacyDrugs = async (request, response) => {
    const pharmacy_id = request.session.user.id;

    if (pharmacy_id !== undefined){
        if (request.session.user.class === 1){
            try{
                const drug = await Pharmacy.getPharmacyDrugTypes(pharmacy_id);
                const brand = await Pharmacy.getPharmacyBrandedDrugs(pharmacy_id);
                response.render('pharmacy/drugList',{drug_types: drug, branded_drugs: brand});
            }
            catch(err){
                // console.log(err);
            }        
        }else if (request.session.user.class === 0){
            response.redirect('/system_admin/home');
        }else{
            response.redirect('/customer/home');
        }
    }else{
        response.redirect('/');
    }
}

const deletePharmacyDrugs = (request, response) => {
    const pharmacy_id = request.session.user.id;

    if (pharmacy_id !== undefined){
        if (request.session.user.class === 1){
            const drug_types=request.body.delete_drug_type;
            const branded_drugs=request.body.delete_branded_drug; 
            
            deleteDrugTypes(drug_types, pharmacy_id);
            deleteBrandedDrugs(branded_drugs, pharmacy_id);
            response.redirect('/pharmacy/drug');
        }else if (request.session.user.class === 0){
            response.redirect('/system_admin/home');
        }else{
            response.redirect('/customer/home');
        }
    }else{
        response.redirect('/');
    }
}

//Delete data from pharmacy_drug_types table
async function deleteDrugTypes(drug_types, pharmacy_id){
    try{
        const drug = await Pharmacy.deletePharmacyDrugTypes(drug_types, pharmacy_id);
    }
    catch(err){
        // console.log(err);
    }      
}

//Delete data from pharmacy_branded_drugs table
async function deleteBrandedDrugs(branded_drugs, pharmacy_id){
    try{
        const brand = await Pharmacy.deletePharmacyBrandedDrugs(branded_drugs, pharmacy_id);
    }
    catch(err){
        // console.log(err);
    }      
}


exports.getPharmacyDrugs = getPharmacyDrugs;
exports.deletePharmacyDrugs = deletePharmacyDrugs;
