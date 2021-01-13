const express = require('express');
const router = express.Router();
const path = require('path');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {validateCustomerAccount,enterCustomer} = require('../../controllers/customer/signup');


// URL: localhost3000/customer/account/signup, method is GET
router.get('/', (request, response) => {
    return response.sendFile(path.join(__dirname, '../../views/customer/signup.html'));
});

// URL: localhost3000/customer/account/create, method is POST
router.post('/', async (request, response) => {
    const { error } = validateCustomerAccount(_.pick(request.body,
        [
            "full_name",
            "nic",
            "email",
            "address",
            "gender",
            "dob",
            "contact_no",
            "password"
        ]
    ));

    if (error) {
        return response.status(400).send(error.message);
    }

    const salt = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, salt);

    try {
        const result = await enterCustomer(_.pick(request.body,
            [
                "full_name",
                "nic",
                "email",
                "address",
                "gender",
                "dob",
                "contact_no",
                "password"
            ]
        ));

    } catch (error) {
        console.log(error.message);
        return response.status(500).send("Internal Server Error");
    }
    return response.status(200).send(request.body);
});


module.exports = router;