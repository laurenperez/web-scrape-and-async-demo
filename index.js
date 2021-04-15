//AN EXAMPLE OF BASIC WEBSCRAPING USING CHEERIO
//ASYNC SERIES METHOD
//ASYNC PARALLEL
//ASYNC WATERFALL
//ASYNC CONCAT


//this is what a request syntax looks like
// request('url', function(error, response, data){
  //do something here!
// });


// EXAMPLE 1////////////////////////////////////////////////////////////////

// var request = require('request');
// var cheerio = require('cheerio');
//
//
// request('https://www.visitseattle.org/things-to-do/neighborhoods/', function(error, response, data) {
//   var $ = cheerio.load(data);
//   var neighborhoods = $('.container-neighborhood-list li').map(function(index, element){
//     return {
//       name: $(element).text(),
//     };
//   }).get();  //this "fires" the code, .get() is a node method
//   console.log(neighborhoods);
// });


// EXAMPLE 2////////////////////////////////////////////////////////////////

// var request = require('request');
// var cheerio = require('cheerio');
//
// request('http://www.visitseattle.org', function(error, response, data) {
//   var $ = cheerio.load(data);
//   var neighborhoods = $('.text-medium-small').map(function(index, element){
//     return {
//       name: $(element).text(),
//       link: $(element).closest('a').attr('href')
//     };
//   }).get(); //this "fires" the code, .get() is a node method
//   console.log(neighborhoods);
// });


// EXAMPLE 3/////////////////////////////////////////////////////////////////


//IF YOU WERE SCRAPING DATA AND RENDERING A PAGE
// var request = require('request');
// var cheerio = require('cheerio');
//
// //this is how you would render a page with this array of neighborhood objects on an index.ejs page
// app.get('/', function(req,res){
//   request('http://www.visitseattle.org', function(error, response, data) {
//     var $ = cheerio.load(data);
//     var neighborhoods = $('.text-medium-small').map(function(index, element){
//       return {
//         name: $(element).text(),
//         link: $(element).closest('a').attr('href')
//       };
//     }).get();
//     console.log(neighborhoods);
//     res.render('index', {neighborhoods: neighborhoods})
//   });
// });


// EXAMPLE 3///////////////////////////////////////////////////////////////////

//WHY WE USE ASYNC MODULE WITH THINGS LIKE CHEERIO

//this is bad code - a cautionary tail
// var request = require('request');
// var urls = ['http://www.google.com', 'http://www.yelp.com', 'http://www.twitter.com'];
// var allData = [];
//
// //The code below would work up to a point (with just 3 urls)
// //but would fail disasterously if there were 100 urls
//
// urls.forEach(function(url){
//   request(url, function(error, response, data){
//     allData += data;
//     console.log(allData);
//   });
// });

//ASYNC EXAMPLE 1///////////////// The Series Method /////////////////////////
// the data from each function isnt always connected but they must complete in order.

// var async = require('async');
//
// function fun1(callback){
//   console.log('console.log 1');
//   callback(null, 1);
// }
// function fun2(callback){
//   console.log('console.log 2');
//   callback(null, 2);
// }
// function fun3(callback){
//   console.log('console.log 3');
//   callback(null, 3);
// }
// async.series([fun1, fun2, fun3], function(err, results){
//   console.log('done!');
//   console.log(results);
// });

//it runs through the functions in the order they are listed in the array
// once its done it returns the results from all the call backs in another array
// console.log 1
// console.log 2
// console.log 3
// done!
// [1,2,3]

//ASYNC EXAMPLE 2////////////// The Paralell Method ///////////////////////////

// var async = require('async');
//
// function fun1(callback){
//   setTimeout(function(){
//     console.log('console.log 1');
//     callback(null,1);
//   }, 3000);
// };
// function fun2(callback){
//   setTimeout(function(){
//     console.log('console.log 2');
//     callback(null,2);
//   }, 1000);
// };
// function fun3(callback){
//   setTimeout(function(){
//     console.log('console.log 3');
//     callback(null,3);
//   }, 2000);
// };
// async.parallel([fun1, fun2, fun3], function(err, results){
//   console.log('done!');
//   console.log(results);
// });

// console.log 2 after 1 sec
// console.log 3 after 2 secs
// console.log 1 after 3 secs
// done!
// [1,2,3]
//they ran at the same time but their timeouts made them display at those times
//then once done, their callbacks display in order in the array


//ASYNC EXAMPLE 3///////////// The Waterfall Method ///////////////////////////
//it is acting on the same data so it needs to be in order

// var async = require('async');
//
// function fun1(callback){
//   var initial = 55;
//   callback(null, initial);
// }
// function fun2(num1,callback) {
//   num1 += 5;
//   callback(null, num1);
// }
// function fun3(num1, callback){
//   num1 += 40;
//   callback(null, num1)
// }
// async.waterfall([fun1, fun2, fun3], function(err, results){
//   console.log('done');
//   console.log (results);
// });
//
// done!
// 100

//ASYNC EXAMPLE 4//////////// Concat ///////////////////////////////////////////

// var request = require('request');
// var async = require('async');
//
// var urlsToGet = [
//   'https://reddit.com/search.json?q=politics',
//   'https://reddit.com/search.json?q=puppies',
//   'https://reddit.com/search.json?q=drake'
// ];
//
// var getFirstTitle = function(url, callback){
//   request(url, function(err, response, data){
//     var firstTitle = JSON.parse(data).data.children[0].data.title;
//     callback(null, firstTitle);
//   });
// }
// async.concat(urlsToGet, getFirstTitle, function(err, results){
//   console.log(results);
// });

//returns the titles of the first things in each category on reddit
