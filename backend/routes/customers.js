const router = require('express').Router();
let Customer = require('../models/customer.model');
const jwtAuthz = require('express-jwt-authz');

router.route('/').get(jwtAuthz(['read:customer']),(req, res) => {
  //console.log(req.query);
  if ((typeof req.query.search === "undefined")  ||
      (typeof req.query.parameter === "undefined")){
        res.json('Request error');
  } else {
    if (req.query.search === "name"){
      Customer.find(req.query.parameter)
      .then(customers => res.json(customers))
      .catch(err => res.status(400).json('Error: ' + err));
    }
    else if (req.query.search === "registration_number"){
      Customer.findOne(req.query.parameter)
      .then(customers => res.json(customers))
      .catch(err => res.status(400).json('Error: ' + err));
    } else{
      res.json('Request error');
    }
    
  }
});

router.route('/add').post(jwtAuthz(['create:customer']),(req, res) => {
  if ((typeof req.body.names === "undefined") ||
    (typeof req.body.last_names === "undefined") ||
    (typeof req.body.registration_number === "undefined") ||
    (typeof req.body.email === "undefined") ||
    (typeof req.body.notes === "undefined")) {
    res.json('Request error');
  } else{
    Customer.create(req.body)
    .then(() => res.json('Alumno/Cliente agregado exitosamente'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/edit').post(jwtAuthz(['edit:customer']),(req, res) => {
  if ((typeof req.body.names === "undefined") ||
    (typeof req.body.last_names === "undefined") ||
    (typeof req.body.registration_number === "undefined") ||
    (typeof req.body.email === "undefined") ||
    (typeof req.body.notes === "undefined")) {
    res.json('Request error');
  } else{
    Customer.update(req.body)
    .then(() => res.json('Alumno/Cliente editado exitosamente'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

router.route('/delete').post(jwtAuthz(['delete:customer']),(req, res) => {
  if (typeof req.body.registration_number === "undefined") {
    res.json('Request error');
  } else{
    Customer.delete(req.body)
    .then(() => res.json('Alumno/Cliente eliminado exitosamente'))
    .catch(err => res.status(400).json('Error: ' + err));
  }
});

module.exports = router;