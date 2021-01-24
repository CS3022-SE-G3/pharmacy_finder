const path = require('path');


const express = require('express');
const app = express();
const config = require('config');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


const options = {
    host: config.get("host"),
    port: config.get("port"),
    user: config.get("user"),
    password: config.get("password"),
    database: config.get("database")
};

const sessionStore = new MySQLStore(options);

app.use(session({
    store: sessionStore,
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    resave: false,
    saveUninitialized: false,
}));

dotenv.config({
    path: './config/config.env'
});

// set up template engine
app.set('view engine', 'ejs');
app.set('views', 'views');

// static files
app.use(express.static(path.join(__dirname, 'public')));

require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
