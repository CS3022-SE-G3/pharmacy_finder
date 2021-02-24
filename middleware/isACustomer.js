const isACustomer = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 2) {
            next();
        } else {
            if (req.session.user.class == 0){
                res.redirect('/system_admin/home');
            }else{
                res.redirect('/pharmacy/home');
            }
        }
    }
    else {
        res.redirect('/');
    }
};

module.exports = isACustomer;