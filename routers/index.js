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
router.use('/account', account);
router.use('/user', user);
router.use('/course', course);
router.use('/schedule', schedule);
router.use('/topic', topic);
router.use('/material',material);
router.use('/search',search);
//router.use('/api/topic_message',topic_message);
module.exports = router;