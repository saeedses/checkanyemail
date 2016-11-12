var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.set('port', (process.env.PORT || 5000));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// views is directory for all template files
var router = express.Router();              // get an instance of the express Router
console.log('ss');
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
app.use('/api', router);
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});


