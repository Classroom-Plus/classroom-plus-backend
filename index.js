const express = require('express');
const path = require('path');
const body_parser = require('body-parser');
const app = express();

const webhooks = require('./routers/webhooks');

app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

app.use('/webhook', webhooks);

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('server start! webhook is listening');
});