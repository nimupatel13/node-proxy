
var express = require('express');
var async = require('async');
var await = require('await');
var request = require('request');
var https = require('https');
var path = require('path');

var app = express();
var http = require('http');

app.get('/',async function func(req,res){
	var response1;
	var respo;
	var obj;
	var parallel = async function(req,res) {
	  //console.log('==PARALLEL with await Promise.all==');
  
	  
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

app.listen(3000, () => console.log(`Example app listening on port 30000!`));