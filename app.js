const express = require('express');
const app = express();

const path = require('path');
const body_parser = require('body-parser');
const router = require('./routers');


/* ----------  body_parser  ---------- */
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: false }));

/* ----------  Routes  ---------- */
app.use(router);

module.exports = app;