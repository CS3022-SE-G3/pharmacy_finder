const Joi = require('joi');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Pharmacy = require('../../models/Pharmacy');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.EMAIL_KEY
    }
}));

function sendEmail(emailTo) {
    transporter.sendMail({
        to: emailTo,
        from: 'finderpharmacy@gmail.com',
        subject: 'Pharmacy Approval',
        html: `
                    <p>Your pharmacy account has been approved</p>
                    <p>Thank you for choosing PharmacyFinder</p>
                    <p>Please return to the Pharmacy Finder website, and begin your work!</p>
                  `
    });
    console.log("Email sent to "+emailTo);
}

function validatePharmacyId(pharmacyId){
    const schema = Joi.object({
        pharmacyId    : Joi.number().integer().min(10001).required().label("Pharmacy ID"),
    });
    return schema.validate(pharmacyId)
}

const viewPharmacyInfo = async(req,res)=>{
    const pharmacyId = req.params.pharmacyid;
    const {error} = validatePharmacyId({pharmacyId:pharmacyId});
    if (error) {
        console.error('Validation Error: pharmacy_id: '+error.details[0].message);
        res.status(400).send("Invalid Account ID provided");
        res.end();
        return;
    }

    try{
        const pharmacyInfo = await Pharmacy.getPharmacyInfo(pharmacyId);
        if (pharmacyInfo.length===0){
            return res.status(404).render('404');
        }
        return res.status(200).render('system_admin/view-pharmacy',{
            pharmacyInfo: pharmacyInfo[0],
            pageTitle: 'Pharmacy Info'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return res.render('500', {
            err_data: err_msg
        });
    }
};

const viewPendingPharmacies = async(req,res)=>{
    try{
        const pendingPharmacies = await Pharmacy.getPendingPharmacies();
        console.log(pendingPharmacies);
        if (pendingPharmacies.length===0){
            return res.status(200).render('system_admin/pending-pharmacies',{
                pendingPharmacies: pendingPharmacies,
                pageTitle: 'Approval Pending Pharmacies'
            });  //404 or 200?
        }
        return res.status(200).render('system_admin/pending-pharmacies',{
            pendingPharmacies: pendingPharmacies,
            pageTitle: 'Approval Pending Pharmacies'
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return res.render('500', {
            err_data: err_msg
        });
    }
};

const approvePharmacy = async (req,res)=>{
    const pharmacyId = req.body.pharmacyId;
    const {error} = validatePharmacyId({pharmacyId:pharmacyId});
    if (error) {
        console.error('Validation Error: pharmacy_id: '+error.details[0].message);
        res.status(400).send("Invalid Account ID provided");
        res.end();
        return;
    }
    try{
        const pharmacy = await Pharmacy.getPharmacyInfo(pharmacyId);
        if (pharmacy.length===0){
            return res.status(404).render('404');
        }
        if (pharmacy[0].approved_state==='Approved'){
            return res.status(409).send("Pharmacy already approved");
        }
        const approveResult = await Pharmacy.setApprovalState("Approved",pharmacyId);
        sendEmail(pharmacy[0].email);
        return res.status(200).redirect('/system_admin/pharmacy/pending');
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return res.render('500', {
            err_data: err_msg
        });
    }
};

const getSearchPharmacy = async (req,res)=>{

    res.render('system_admin/search-pharmacy',{
        pageTitle: "Search Pharmacy",
        pharmacyInfo: [],
        hasErrors: false
    });
};

const postSearchPharmacy = async(req,res)=>{
    let pharmacyInfo;
    const pharmacyId = req.body.pharmacyId;
    const {error} = validatePharmacyId({pharmacyId:pharmacyId});
    if (error){
        console.log(error);
        return res.status(400).render('system_admin/search-pharmacy',{
            pageTitle: "Search Pharmacy",
            pharmacyInfo: [],
            hasErrors: true,
            errors: error.details[0].message
        });
    }
    try{
        pharmacyInfo = await Pharmacy.getPharmacyInfo(pharmacyId);
        if (pharmacyInfo.length===0){
            return res.status(404).render('system_admin/search-pharmacy',{
                pageTitle: "Search Pharmacy",
                pharmacyInfo: [],
                hasErrors: true,
                errors: "Pharmacy not registered"
            });
        }
        return res.status(200).render('system_admin/search-pharmacy',{
            pageTitle: "Search Pharmacy",
            pharmacyInfo: pharmacyInfo,
            hasErrors: false
        });
    }
    catch (error) {
        var err_msg = "Internal server error " + error.message;
        console.log(error);

        return res.render('500', {
            err_data: err_msg
        });
    }
};

exports.viewPharmacyInfo = viewPharmacyInfo;
exports.viewPendingPharmacies = viewPendingPharmacies;
exports.approvePharmacy = approvePharmacy;
exports.getSearchPharmacy = getSearchPharmacy;
exports.postSearchPharmacy = postSearchPharmacy;