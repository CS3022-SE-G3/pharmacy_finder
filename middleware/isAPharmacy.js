const isAPharmacy = (req, res, next) => {
    if (req.session.user) {
        if (req.session.user.class == 1) {
            next();
        } else {
            console.log("Not a Pharmacy");
            res.redirect('/');
        }
    }
    else {
        console.log("Not logged In");
        res.redirect('/');
    }
};

module.exports = isAPharmacy;