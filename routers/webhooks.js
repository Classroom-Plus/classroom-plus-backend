const router = require('express').Router();
const request = require('request');
const env = require('dotenv').config();
const receiveApi = require('../messenger-api-helpers/receive');

router.get('/', (req, res) => {
    if (req.query['hub.mode'] === 'subscribe' &&
        req.query['hub.verify_token'] === process.env.VERIFY_TOKEN) {
        console.log(req.query['hub.challenge']);
        res.status(200).send(req.query['hub.challenge']);
    } else {
        res.sendStatus(403);
    }
});

router.post('/', (req, res) => {
    const data = req.body;

    if (data.object === 'page') {
        data.entry.forEach((entry) => {
            entry.messaging.forEach((event) => {
                if (event.message) {
                    receiveApi.handleReceiveMessage(event);
                } else if (event.account_linking) {
                    receiveApi.handleReceiveAccountLink(event);
                } else if (event.postback) {
                    // add message handler here                    
                } else {
                    console.log("Webhook received unknown event: ", event);
                }
            });
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

module.exports = router;