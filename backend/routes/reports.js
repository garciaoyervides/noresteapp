const router = require('express').Router();
let Report = require('../models/report.model');
const jwtAuthz = require('express-jwt-authz');

router.route('/receipts').get(jwtAuthz(['read:receipt']),(req, res) => {
  let query = {
    searchTable:"receipts",
  };
  if ((typeof req.query.search === "undefined")||
  (typeof req.query.parameter === "undefined")){
    res.json('Request error');
  } else {

    if(req.query.search==="name"){
      query.searchItem = [{
        key:"customer_name",
        value:req.query.parameter,
      }];
    } else if(req.query.search==="registration_number"){
      query.searchItem = [{
        key:"customer_registration_number",
        value:req.query.parameter,
      }];
    } else{
      res.json('Request error');
    }

    if (req.query.approximate){
      Report.findAllApproximate(query)
      .then(receipt => res.json(receipt))
      .catch(err => res.status(400).json('Error: ' + err));
    }else{
      Report.findAllExact(query)
      .then(receipt => res.json(receipt))
      .catch(err => res.status(400).json('Error: ' + err));
    }
  }
});

router.route('/receipts/date').get(jwtAuthz(['read:receipt']),(req, res) => {
  if ((typeof req.query.from === "undefined")||
  (typeof req.query.to === "undefined")){
    res.json('Request error');
  } else {
    Report.findReceiptsByDate(req.query)
      .then(receipt => res.json(receipt))
      .catch(err => res.status(400).json('Error: ' + err));
  }
});

module.exports = router;