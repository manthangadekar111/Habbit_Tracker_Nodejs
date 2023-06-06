const express = require('express');
const port = 8000;
const app = express();
const cookieParser = require('cookie-parser');

const db = require('./config/mongoose');

const flash = require('connect-flash');
const customMware = require('./config/flashmiddleware')
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('./assets'));
app.set('view engine', 'ejs');
app.set('views', './view');

app.use(express.urlencoded());
app.use(cookieParser());

app.use(session({
    name: "habbit tracker",
    secret: 'testpurpose',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://127.0.0.1:27017/HabbitTrackerDB',
        autoRemove: 'disabled'
    },
        (err) => {
            console.log(err || 'connect-mongo setup ok');
        }
    )
}))

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

app.use('/', require('./routes/index'));

app.listen(port, (err) => {
    if (err) {
        console.log(`error in running on server${port}`)
        return;
    }
    console.log(`Server is running on port ${port}`)
})
