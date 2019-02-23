const fs = require('fs');
const rp = require('request-promise');
const $ = require('cheerio');

var x = 10;
var options = {
  url: 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1',
  headers: {
    'Referer': 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
  }
};

function traverseSite(options) {
  rp(options)
    .then(function(html) {
      console.log($('p', html).text());

      var nextURL = {
        url: $('.next-part-link', html).attr("href"),
        method: 'GET',
        headers: {
          'Referer': nextURL,
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36'
        }
      };
      return nextURL;
    })
    .then(function(nextURL) {
      if (!nextURL)
        return;
      traverseSite(nextURL);
    })
    .catch(function(err) {
      console.log(err);
    });
}


traverseSite(options.url);
