const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const app = express();

/* ----------  Routes  ---------- */
const webhooks = require('./routes/webhooks');
const account_link = require('./routes/account_link');

//app.use(favicon(path.join(__dirname, '/public/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

/* ----------  body_parser  ---------- */
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

/* ----------  Views  ---------- */
app.set('views', path.join(__dirname + '/views'));
app.set('view engine', 'jade');

app.use('/account_link', account_link);
app.use('/webhook', webhooks);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server start! webhook is listening');
});