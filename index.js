var express = require('express');
var util = require('util');
var bodyParser = require('body-parser');
var db = require('./db');

var app = express();

//exercise 1
app.get('/hello', function (req, res) {
  res.send('<html><body><h1>Hello World!</h1></body></html>');
});

//exercise 2
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


//////////////
//exercise 4//
//////////////
app.get('/contents', function(req, res) {
  //run query
  db.Content.findAll({
    include: [
      {
        model: db.User,
        where: {id: db.Sequelize.col('content.userId')}
      }
    ],
    order: [['createdAt', 'desc']],
    limit: 5
  })
  .then( function (results) {
    var cleaned = results.map( function (result) {
      var obj = result.dataValues;
      obj.user = obj.user.dataValues;
      
      return obj;
    })
    
    //now the cleaned up result is ready
    var html = 
    `<div id="contents">
      <h2>List of contents</h2>
      <ul class="contents-list">`;
      
    cleaned.forEach( function (content) {
      html += `<li class="content-item">
        <h3 class="content-item__title">
          <a href="` + content.url + `">` + content.title + `</a>
        </h3>
        <p>Created by` + content.user.username + `</p>
      </li>`
    })
        
    html += `</ul>
          </div>
          <a href="/createContent">Add content!</a>`
          
    res.send(html);
  })
});



//exercise 5
app.get('/createContent', function(req, res) {
  var options = {root: '/home/ubuntu/workspace'};
  
  res.sendFile('./form.html', options);
});



//exercise 6
app.use('/createContent', bodyParser.urlencoded());

app.post('/createContent', function(req, res) {
  db.createNewContent(1, req.body.url, req.body.title)
  .then(function () {
    res.redirect(301, '/contents');
  });
});




/* YOU DON'T HAVE TO CHANGE ANYTHING BELOW THIS LINE :) */

// Boilerplate code to start up the web server
var server = app.listen(process.env.PORT, process.env.IP, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
