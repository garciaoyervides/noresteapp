const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const cors = require("cors");
const HttpException = require('./utils/HttpException.utils');
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');


const receiptsRouter = require('./routes/receipts');
const customersRouter = require('./routes/customers');
const reportsRouter = require('./routes/reports');

// Init environment
dotenv.config();

var jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: process.env.JWKSURI
}),
audience: process.env.AUDIENCE,
issuer: process.env.ISSUER,
algorithms: ['RS256']
});


// Init express
const app = express();

// parse requests of content-type: application/json
// parses incoming requests with JSON payloads
app.use(express.json());
//use body-parser as middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// enabling cors for all requests by using cors middleware
app.use(cors());
// Enable pre-flight
app.options("*", cors());

app.use(jwtCheck);

///const port = Number(process.env.PORT || 5000);

//API end-points
app.use('/receipts', receiptsRouter);
app.use('/customers', customersRouter);
app.use('/reports', reportsRouter);
// 404 error
app.all('*', (req, res, next) => {
  const err = new HttpException(404, 'Endpoint Not Found');
  next(err);
});

//Listens to a port dynamically for better compatibility
app.listen(0, () => {
    console.log(`Server is running`);
});
module.exports = app;