const Customer = require('../../models/Customer');


const reportPharmacy = async (req, res) => {
    
    
    try {
        const pharmacy_id = req.body.pharmacy_id;
        const reasons = req.body.reasons;
        const customer_id = req.session.user.id;
        const result = await Customer.reportPharmacy(pharmacy_id, customer_id, reasons);
        return res.redirect('/customer/home');
        
    }
    catch (error) {
        return res.render('400', {
            err_data: "Pharmacy report unsuccessful",
            redirect_to: "/customer/pharmacy/search",
            button_message: "Try Again",
            form_method: "GET"
        });
        
    }
    
}





module.exports.reportPharmacy = reportPharmacy;