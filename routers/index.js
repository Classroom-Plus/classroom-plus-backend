const router = require('express').Router();
const webhooks = require('./webhooks');
const account = require('./account');
const user = require('./user');
const course = require('./course');
const schedule = require('./schedule');
const topic = require('./topic');
const material=require('./material');
const topic_message=require('./message');
const search=require('./search');

/* ----------  Route for fb-messenger  ---------- */
router.use('/webhook', webhooks);

/* ----------  Route for api  ---------- */
router.use('/api/account', account);
router.use('/api/user', user);
router.use('/api/course', course);
router.use('/api/schedule', schedule);
router.use('/api/topic', topic);
router.use('/api/material',material);
router.use('/api/search',search);
//router.use('/api/topic_message',topic_message);
module.exports = router;