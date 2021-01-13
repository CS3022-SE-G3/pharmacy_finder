
const express = require('express');
const app = express();
// const config = require('config');

// set up template engine
app.set('view engine', 'ejs');

// static files
app.use(express.static('./public'));

require('./startup/routes')(app);

const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}...`));
