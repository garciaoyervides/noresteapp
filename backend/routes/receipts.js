const router = require('express').Router();
let Receipt = require('../models/receipt.model');
const jwtAuthz = require('express-jwt-authz');

router.route('/').get(jwtAuthz(['read:receipt']),(req, res) => {
  //console.log(req.query);
  if ((typeof req.query.search === "undefined")  ||
      (typeof req.query.parameter === "undefined")){
        res.json('Request error');
  } else {
    if (req.query.search === "receipt_number"){
      Receipt.findOne(req.query.parameter)
      .then(receipt => res.json(receipt))
      .catch(err => res.status(400).json('Error: ' + err));
    } else{
      res.json('Request error');
    }
  }
});

router.route('/add').post(jwtAuthz(['create:receipt']),(req, res) => {
  if ((typeof req.body.date  === "undefined") ||
    (typeof req.body.amount === "undefined") ||
    (typeof req.body.customer_name === "undefined") ||
    (typeof req.body.description === "undefined") ||
    (typeof req.body.description_code === "undefined") ||
    (typeof req.body.issuer === "undefined") ||
    (typeof req.body.customer_registration_number === "undefined")) {
    res.json('Request error');
  } else{
    Receipt.create(req.body)
    .then((receiptId) => res.json('Recibo creado exitosamente: ' + receiptId))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/edit').post(jwtAuthz(['edit:receipt']),(req, res) => {
  if ((typeof req.body.date  === "undefined") ||
  (typeof req.body.amount === "undefined") ||
  (typeof req.body.customer_name === "undefined") ||
  (typeof req.body.description === "undefined") ||
  (typeof req.body.description_code === "undefined") ||
  (typeof req.body.issuer === "undefined") ||
  (typeof req.body.customer_registration_number === "undefined")) {
    res.json('Request error');
  } else{
    Receipt.update(req.body)
    .then(() => res.json('Alumno/Cliente editado exitosamente'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/delete').post(jwtAuthz(['delete:receipt']),(req, res) => {
  if (typeof req.body.receipt_number === "undefined") {
    res.json('Request error');
  } else{
    Receipt.delete(req.body)
    .then(() => res.json('Alumno/Cliente eliminado exitosamente'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

module.exports = router;