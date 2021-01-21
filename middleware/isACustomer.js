const isACustomer = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 2) {
            next();
        } else {
            console.log("Not a Customer");
            res.redirect('/');
        }
    }
    else {
        console.log("Not logged In");
        res.redirect('/');
    }
};

module.exports = isACustomer;