const User = require('../models/user');
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/');
    }
    return res.render('user_sign_up', {
        title: "Sign Up | Habbit Tracker"
    })
}

module.exports.create = async (req, res) => {
    if (req.body.password != req.body.confirm_password) {
        return res.redirect('back');
    }
    const user = await User.findOne({ email: req.body.email });

    try {
        if (!user) {
            await User.create(req.body);
            return res.redirect('/users/sign-in');

        } else {
            return res.redirect('/users/sign-up');
        }
    } catch (error) {
        console.log('error in creating User in signing up', error);
        return;
    }
}

module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged In Sucessfully !')
    return res.redirect('/');
}


module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    return res.render('user_sign_in', {
        title: "Sign In | Habbit Tracker"
    })
}


module.exports.destroySession = (req, res, done) => {
    req.logout((err) => {
        if (err) {
            return done(err);
        }
    })
    return res.redirect('/users/sign-in');
}