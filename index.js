var express = require('express');
var app = express();

app.get('/hello', function (req, res) {
  res.send('<html><body><h1>Hello World!</h1></body></html>');
});

/*Create a web server that can listen to requests for /hello/:firstName, and respond with some HTML that says <h1>Hello _name_!</h1>. For example, if a client requests /hello/John, the server should respond with <h1>Hello John!</h1>*/
app.get('/hello/:firstName', function (req, res) {
  res.send("<h1>Hello " + req.params.firstName + "!</h1>");
});

//exercise 3
app.get('/op/:operation/:number1/:number2', function(req, res) {
  var result = {
    operator: req.params.operation,
    firstOperand: Number(req.params.number1),
    secondOperand: Number(req.params.number2)
  }
  
  switch (result.operator) {
    case 'add':
      result.solution = result.firstOperand + result.secondOperand;
      break;
    case 'sub':
      result.solution = result.firstOperand - result.secondOperand;
      break;
    case 'mult':
      result.solution = result.firstOperand * result.secondOperand;
      break;
    case 'div':
      result.solution = result.firstOperand / result.secondOperand;
      break;
    default:
      res.sendStatus(400);
      return;
  }
  
  res.json(result);
});

/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
