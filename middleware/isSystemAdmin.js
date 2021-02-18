const isSystemAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 0) {
            next();
        } else {
            if (req.session.user.class == 1){
                res.redirect('/pharmacy/home');
            }else{
                res.redirect('/customer/home');
            }
        }
    }
    else {
        res.redirect('/');
    }
};

module.exports = isSystemAdmin;