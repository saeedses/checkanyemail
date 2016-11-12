// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/:email_id', function(req, res) {
var response = '';
var emailCheck = require('email-check');
// Quick version 
emailCheck(req.params.email_id)
  .then(function (resp) {
    // Returns "true" if the email address exists, "false" if it doesn't.
	response = resp;
	res.json({ message: response });   
console.log(resp);	
  })
  .catch(function (err) {
    if (err.message === 'refuse') {
      // The MX server is refusing requests from your IP address. 
    } else {
      // Decide what to do with other errors. 
    }
  });
    
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);