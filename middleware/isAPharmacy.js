const isAPharmacy = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 1) {
            next();
        } else {
            if (req.session.user.class == 0){
                res.redirect('/system_admin/home');
            }else{
                res.redirect('/customer/home');
            }
        }
    }
    else {
        res.redirect('/');
    }
};

module.exports = isAPharmacy;