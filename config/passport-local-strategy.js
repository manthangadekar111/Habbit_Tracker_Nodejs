const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
passport.use(new LocalStrategy({
    usernameField: 'email'
},
    async function (email, password, done) {

        let user = await User.findOne({ email: email });
        try {
            if (!user || user.password != password) {

                return done(null, false);
            }

            return done(null, user);
        } catch (error) {
            console.log('Error in finding user --> Passport', error);
        }

    }
))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser(function (id, done) {
    User.findById(id)
        .then(user => {
            done(null, user);
        })
        .catch(err => {
            console.log('Error in finding user --> Passport');
            done(err);
        });
});
passport.checkAuthentication = (req, res, next) => {

    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/users/sign-up');
}

passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;