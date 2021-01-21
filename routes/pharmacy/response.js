const router = require('express').Router();
const { displayResponseInfo, storeEditedResponseInfo, displayRequestInfo, storeResponseInfo } = require('../../controllers/pharmacy/response');
const isAPharmacy = require('../../middleware/isAPharmacy');

// localhost:3000/pharmacy/response/edit
router.get("/edit", isAPharmacy, (req, res) => {
    let info = [];
    displayResponseInfo(info, res, response_id, request_id);
});

// localhost:3000/pharmacy/response/edit_response
router.post("/edit_response", isAPharmacy, (req, res) => {
    let drug_type_ids = req.body.drug_type_ids;
    let branded_drug_ids = req.body.branded_drug_ids;
    storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, response_id, request_id, pharmacy_id)
});

// localhost:3000/pharmacy/respond
router.get("/respond", isAPharmacy, (req, res) => {
    let info = [];
    displayRequestInfo(info, res, request_id);
});

// localhost:3000/pharmacy/respond

router.post("/respond", isAPharmacy, (req, res) => {
    let drug_type_ids = req.body.drug_type_ids;
    let branded_drug_ids = req.body.branded_drug_ids;
    storeResponseInfo(res, drug_type_ids, branded_drug_ids, response_id, request_id, pharmacy_id);
});

module.exports = router;