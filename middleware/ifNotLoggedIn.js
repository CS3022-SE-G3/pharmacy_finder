const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {//if not logged in
        next();
    }else{
        if (req.session.user.class == 0){
            res.redirect('/system_admin/home');
        } else if (req.session.user.class == 1){
            res.redirect('/pharmacy/home');
        }else{
            res.redirect('/customer/home');
        }
    }
};

module.exports = ifNotLoggedIn;