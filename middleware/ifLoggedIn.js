const ifLoggedIn = (req, res, next) => {
    if (req.session.user) {
        next();
    } 
    else {
        console.log("Not logged In");
       res.redirect('/');
    }
};

module.exports = ifLoggedIn;