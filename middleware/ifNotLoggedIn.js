const ifNotLoggedIn = (req, res, next) => {
    if (!req.session.user) {//if not logged in
        next();
    }else{
        console.log("Alredy logged in");
        res.redirect("/");
    }
};

module.exports = ifNotLoggedIn;