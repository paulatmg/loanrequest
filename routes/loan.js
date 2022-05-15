var express = require('express');
var router = express.Router();
var functions = require('../myFunctions/functions');
var moment = require('moment');
const axios = require('axios').default;



router.get('/', function (req, res, next) {


    functions.handleAllFunctions({
        loanAmount: req.query.loanamount,
        term: req.query.months})
      .then((response) => res.send(response))
      .catch((error) => res.send(error.message));
  });
  
  module.exports = router;