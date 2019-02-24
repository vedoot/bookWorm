 const fs = require('fs');
 const rp = require('request-promise');
 const $ = require('cheerio');

 const uA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';

 var book = [];
 var options = {
  url: 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1',
  headers: { 'Referer': 'https://www.wattpad.com/30050343-forever-judy-blume-chapter-1', 'User-Agent': uA}
  };

 function traverseSite(options) {
  rp(options) // request promise
    .then(function(html) {
      if (!$('.next-part-link', html).attr("href"))  // stops scraping when next link is undifined. Returns chapters as param for .then()
        return chapters

      var chapters = $('p', html).text();  // p tags on site store all book text.
      book.push(chapters);  //moving pages into chapters array

      console.log(`Chapter ${book.length} added to book!`);

      return traverseSite({ url: $('.next-part-link', html).attr("href"),
      headers: { 'Referer': $('.next-part-link', html).attr("href"),'User-Agent': uA }
      });
    })
    .then(function cleanText(book) {
      if(Array.isArray(book))
        console.log(book.toString());

    })
    .then(function formatText(cleanBook){

    })
    .then(function publish(formatedText){

    })
    .catch(function(err) {
      console.log(err);
    });
}


   traverseSite(options.url);
