const isSystemAdmin = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 0) {
            next();
        } else {
            console.log("Not System Admin");
            if (req.session.user.class == 1){
                res.redirect('/pharmacy/home');
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

module.exports = isSystemAdmin;