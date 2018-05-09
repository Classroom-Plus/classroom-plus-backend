const express = require('express');
const app = express();

const cors = require('cors');
const path = require('path');
const body_parser = require('body-parser');
const router = require('./routers');

/* ----------  CORS(Cross-Origin Resource Sharing)  ---------- */
app.use(cors());

/* ----------  Static Files  ---------- */
app.use('/api', express.static('public'));

/* ----------  body_parser  ---------- */
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

/* ----------  Routes  ---------- */
app.use('/api', router);

module.exports = app;