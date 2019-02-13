
const fs = require('fs');
var request = require('request');
const $ = require('cheerio');
var baseURL = 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1';
const options = {
    url: 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1',
    method: 'GET',
    headers: {
      'Referer': 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
    }
};
var i=0;


function f(options){
  request(options,function(err,response,html){
    var chapters = [];
    var nextURL  = {
        url: $('.next-part-link', html).attr("href"),
        method: 'GET',
        headers: {
            'Referer': nextURL,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        }
    };
    chapters.push($('p', html).text());
    if(i=25){
      console.log(chapters[0]);
    }
    f(nextURL);
    i++;
  });
}

f(baseURL);
