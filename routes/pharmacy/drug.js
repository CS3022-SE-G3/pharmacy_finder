/* 
    :: View pharmacy_drug_types and pharmacy_branded_drugs
    :: Delete pharmacy_drug_types and pharmacy_branded_drugs
    URL : localhost:3000/pharmacy/drug
*/ 

const express = require('express');
const router = express.Router();
const bodyParser=require('body-parser');
const urlencodedParser= bodyParser.urlencoded({extended: true});

router.use(express.json());
router.use(bodyParser.json());

const Pharmacy = require('../../models/Pharmacy');
const { getPharmacyDrugTypes,getPharmacyBrandedDrugs, deletePharmacyDrugTypes, deletePharmacyBrandedDrugs } = require('../../models/Pharmacy');

//Get pharmacy_drug_types and pharmacy_branded_drugs from the database
router.get('/',function(request,response){
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

//Delete data from pharmacy_drug_types and pharmacy_branded_drugs tables
router.post('/',function(request,response){
    const d=request.body.delete_drug_type;
    const b=request.body.delete_branded_drug;
    
    //Delete data from pharmacy_drug_types table
    async function deleteDrugTypes(){
        try{
            const drug= await deletePharmacyDrugTypes(d);
        }
        catch(err){
            console.log(err);
        }      
    }
    deleteDrugTypes();  

    //Delete data from pharmacy_branded_drugs table
    async function deleteBrandedDrugs(){
        try{
            const brand= await deletePharmacyBrandedDrugs(b);
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