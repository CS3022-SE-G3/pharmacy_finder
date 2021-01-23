/* 
    :: View pharmacy_drug_types and pharmacy_branded_drugs
    :: Delete pharmacy_drug_types and pharmacy_branded_drugs
    URL : localhost:3000/pharmacy/drug
*/ 

const express = require('express');
const router = express.Router();
const isAPharmacy = require('../../middleware/isAPharmacy');

const Pharmacy = require('../../models/Pharmacy');
const { getPharmacyDrugTypes,getPharmacyBrandedDrugs, deletePharmacyDrugTypes, deletePharmacyBrandedDrugs } = require('../../models/Pharmacy');

// localhost:3000/pharmacy/drug
//Get pharmacy_drug_types and pharmacy_branded_drugs from the database
router.get('/', isAPharmacy, function (request, response) {
    const pharmacy_id = request.session.user.id;

    async function getData(){
        try{
            const drug = await getPharmacyDrugTypes(pharmacy_id);
            const brand = await getPharmacyBrandedDrugs(pharmacy_id);
            response.render('pharmacy/drugList',{drug_types: drug, branded_drugs: brand});
        }
        catch(err){
            console.log(err);
        }        
    }
    getData();
     
});

//Delete data from pharmacy_drug_types and pharmacy_branded_drugs tables
router.post('/', isAPharmacy, function (request, response) {
    const pharmacy_id = request.session.user.id;

    const drug_types=request.body.delete_drug_type;
    const branded_drugs=request.body.delete_branded_drug;
    
    //Delete data from pharmacy_drug_types table
    async function deleteDrugTypes(){
        try{
            const drug = await deletePharmacyDrugTypes(drug_types, pharmacy_id);
        }
        catch(err){
            console.log(err);
        }      
    }
    deleteDrugTypes();  

    //Delete data from pharmacy_branded_drugs table
    async function deleteBrandedDrugs(){
        try{
            const brand = await deletePharmacyBrandedDrugs(branded_drugs, pharmacy_id);
        }
        catch(err){
            console.log(err);
        }      
    }
    deleteBrandedDrugs();  

    async function getData(){
        try{
            const drug= await getPharmacyDrugTypes();
            const brand = await getPharmacyBrandedDrugs();
            
            response.render('pharmacy/drugList',{drug_types: drug, branded_drugs: brand});
        }
        catch(err){
            console.log(err);
        }        
    }
    getData();

});


module.exports = router;