const webhooks = require('./routers/webhooks');

const express = require('express');
const body_parser = require('body-parser');

const app = express();

app.use(body_parser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/webhook', webhooks);

app.get('/', (req, res) => {
    res.send('Hello world');
})

app.listen(process.env.PORT || 3000, () => {
    console.log('server start! webhook is listening');
});
