
var express = require('express');
var router = express.Router();
var functions = require('../myFunctions/functions');
var moment = require('moment');
const axios = require('axios').default;

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
