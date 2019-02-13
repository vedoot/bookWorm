
const fs = require('fs');
var request = require('request');
const $ = require('cheerio');
var baseURL = 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1';


function f(baseURL){
  request(baseURL,function(err,response,html){
    // console.log( $('p', html).text());
    var nextURL = $('.next-part-link', html).attr("href");
    console.log(nextURL);
    f(nextURL);
  });
}

f(baseURL);
