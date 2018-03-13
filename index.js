const webhooks = require('./routers/webhooks');
const auth = require('./routers/auth');

const express = require('express');
const body_parser = require('body-parser');
const path = require('path');

const app = express();

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use('/webhook', webhooks);

app.use('/', auth);

app.get('/test/:test', (req, res) => {
    res.send(req.params.test);
});

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server start! webhook is listening');
});