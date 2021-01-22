const isAPharmacy = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 1) {
            next();
        } else {
            console.log("Not a Pharmacy");
            if (req.session.user.class == 0){
                res.redirect('/system_admin/home');
            }else{
                res.redirect('/customer/home');
            }
        }
    }
    else {
        console.log("Not logged In");
        res.redirect('/');
    }
};

module.exports = isAPharmacy;