const Joi = require('joi');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const Pharmacy = require('../../models/Pharmacy');

const transporter = nodemailer.createTransport(sendgridTransport({
    auth: {
        api_key: process.env.EMAIL_KEY
    }
}));

function sendEmail(emailTo){
    transporter.sendMail({
        to: emailTo,
        from: 'finderpharmacy@gmail.com',
        subject: 'Pharmacy Approval',
        html: `
                    <p>Your pharmacy account has been approved</p>
                    <p>Thank you for choosing PharmacyFinder</p>
                    <p>Click this <a href="/pharmacy/login">link</a> to Login and begin using your account!</p>
                  `
    });
    console.log("Email sent to "+emailTo);
}

function validatePharmacyId(pharmacyId){
    const schema = Joi.object({
        pharmacyId    : Joi.number().integer().min(10001).required(),
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

    const pharmacyInfo = await Pharmacy.getPharmacyInfo(pharmacyId);
    console.log(pharmacyInfo);
    try{
        if (pharmacyInfo.length==0){
            return res.status(404).send("Pharmacy not registered");
        }
        return res.status(200).send(pharmacyInfo);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
};

const viewPendingPharmacies = async(req,res)=>{
    try{
        const pendingPharmacies = await Pharmacy.getPendingPharmacies();
        console.log(pendingPharmacies);
        if (pendingPharmacies.length===0){
            return res.status(200).send("No pharmacies pending for approval");  //404 or 200?
        }
        return res.status(200).send(pendingPharmacies);
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
};

const approvePharmacy = async (req,res)=>{
    const pharmacyId = req.params.pharmacyid;
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
            return res.status(404).send("Pharmacy not registered");
        }
        if (pharmacy[0].approved_state==='Approved'){
            return res.status(409).send("Pharmacy already approved");
        }
        const approveResult = await Pharmacy.setApprovalState("Approved",pharmacyId);
        sendEmail(pharmacy[0].email);
        return res.status(200).json({message:"Pharmacy Approval Successful",result: approveResult });
    }
    catch (error) {
        console.log(error.message);
        return res.status(500).send("Internal Server Error");
    }
};

exports.viewPharmacyInfo = viewPharmacyInfo;
exports.viewPendingPharmacies = viewPendingPharmacies;
exports.approvePharmacy = approvePharmacy;