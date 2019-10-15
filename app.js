var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var request = require('request');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',async function func(req,res){
	var response1;
	var respo;
	var obj;
	var parallel = async function(req,res) {
	  console.log('==PARALLEL with await Promise.all==');
  
	  
	  await Promise.all([
		  (async()=>response1=await resolveAfter2Seconds())(),
		  (async()=>respo=await resolveAfter1Second())()
	  ]);
	}
	await parallel();
	var p1 = JSON.parse("{\"JSON\":"+respo+"}");
	var p2 = JSON.parse("{\"Guest\":"+response1+"}");
	obj = { ...p1, ...p2 };
	res.send(obj);
});
var resolveAfter2Seconds = function() {
	return new Promise(resolve =>{
		var options = {
				url: 'https://mocktarget.apigee.net/',
				method: 'get',
				json: true
	}
	request(options, function(error,response,body){
		//console.log(body);
		if (!error) {
            //console.log("Resposne "+JSON.stringify(response));
			resolve(JSON.stringify(body));
            //callback(null, {"statusCode":response.statusCode, "statusMsg":response.body});
		}else {
            //callback(null,{"statusCode":400, "statusMsg":response});
        }
	});
	});
};

var resolveAfter1Second = function() {
  return new Promise(resolve =>{
		var options = {
				url: 'https://mocktarget.apigee.net/json',
				method: 'get',
				json: true
	}
	request(options, function(error,response,body){
		//console.log(body);
		if (!error) {
            //console.log("Resposne "+JSON.stringify(response));
			resolve(JSON.stringify(body));
            //callback(null, {"statusCode":response.statusCode, "statusMsg":response.body});
		}else {
            //callback(null,{"statusCode":400, "statusMsg":response});
        }
	});
	});
	
};
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
