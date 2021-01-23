const router = require('express').Router();
const { displayResponseInfo, storeEditedResponseInfo, displayRequestInfo, storeResponseInfo } = require('../../controllers/pharmacy/response');
const isAPharmacy = require('../../middleware/isAPharmacy');

// localhost:3000/pharmacy/response/edit
router.get("/edit_response/:request_id", isAPharmacy, (req, res) => {
    let info = [];
    var pharmacy_id = req.session.user.id;
    let request_id = req.params.request_id;
    req.session.user.req_res_id = request_id;
    return displayResponseInfo(info, res, pharmacy_id, request_id);
});

// localhost:3000/pharmacy/response/edit_response
router.post("/edit_response", isAPharmacy, (req, res) => {
    let drug_type_ids = req.body.drug_type_ids;
    let branded_drug_ids = req.body.branded_drug_ids;
    var pharmacy_id = req.session.user.id;
    let request_id = req.session.user.req_res_id
    return storeEditedResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id)
});

// localhost:3000/pharmacy/response/respond
router.get("/respond/:request_id", isAPharmacy, (req, res) => {
    let info = [];
    let request_id = req.params.request_id;
    req.session.user.req_id = request_id;
    return displayRequestInfo(info, res, request_id);
});

// localhost:3000/pharmacy/response/respond

router.post("/respond", isAPharmacy, (req, res) => {
    let drug_type_ids = req.body.drug_type_ids;
    let branded_drug_ids = req.body.branded_drug_ids;
    var pharmacy_id = req.session.user.id;
    let request_id = req.session.user.req_id;
    return storeResponseInfo(res, drug_type_ids, branded_drug_ids, pharmacy_id, request_id);
});

module.exports = router;