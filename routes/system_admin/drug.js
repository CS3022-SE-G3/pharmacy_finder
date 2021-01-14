// add new drug
// remove drug
// update drug info
// view all drugs
const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');
const {
    getAllDrugs,
    validateAddDrugDetails,
    validateUpdateDrugDetails,
    enterDrug,
    updateDrug,
    deleteDrug
} = require('../../controllers/system_admin/drug');
const {
    getAllDrugTypes
} = require('../../controllers/system_admin/drug_type');

// URL: localhost3000/system_admin/drug, method is GET 
/**@todo return the results in response body */
router.get('/', async (request, response) => {
    try
    {
        const result = await getAllDrugs();
        console.log(result);
        return response.status(200).send(result);
    }
    catch (error) {
        return response.status(500).send("internal server error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/drug.html')); 
});

// URL: localhost3000/system_admin/drug/create, method is GET 
/**@todo return the results in response body */
router.get('/create', async (request, response) => {
    try
    {
        const result = await getAllDrugTypes();
        console.log(result);
        return response.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        return response.status(500).send("internal server error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
});

// URL: localhost3000/system_admin/drug/create, method is POST
router.post('/create', async (request, response) => {

    const { error } = validateAddDrugDetails(_.pick(request.body,
        [
            "brand_name",
            "manufacturer",
            "drug_type_id"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await enterDrug(_.pick(request.body,
            [
                "brand_name",
                "manufacturer",
                "drug_type_id"
            ]
        ));
    return response.status(200).send(request.body);


    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
});

// URL: localhost3000/system_admin/drug/update, method is GET 
/**@todo return the results in response body */
router.get('/update', (request, response) => {
    try
    {
        const results = getAllDrugTypes();
        return response.status(200).send(results);

    }
    catch (error) {
        return response.status(500).send("Internal Server Error");
    }
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
});

// URL: localhost3000/system_admin/drug/update, method is POST
router.put('/update', async (request, response) => {

    const { error } = validateUpdateDrugDetails(_.pick(request.body,
        [
            "branded_drug_id",
            "brand_name",
            "manufacturer",
            "drug_type_id"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    try {
        const result = await updateDrug(_.pick(request.body,
            [
                "branded_drug_id",
                "brand_name",
                "manufacturer",
                "drug_type_id"
            ]
        ));

    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
    return response.status(200).send(request.body);
});

// URL: localhost3000/system_admin/drug/delete, method is GET 
/**@todo return the results in response body */
router.get('/delete', (request, response) => {
    //return response.sendFile(path.join(__dirname, '../../views/system_admin/add_new_drug_form.html')); 
});

// URL: localhost3000/system_admin/drug/delete, method is POST
router.put('/delete', async (request, response) => {

    try {
        const result = await deleteDrug(_.pick(request.body,
            [
                "branded_drug_id"
            ]
        ));
    return response.status(200).send(request.body);
    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
});

module.exports = router;