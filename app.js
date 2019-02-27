 const fs = require('fs');
 const rp = require('request-promise');
 const cheerio = require('cheerio');

 const uA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';

 var book = [];
 var options = {
  url: 'https://www.wattpad.com/591602002-carpe-noctem-intro',
  headers: { 'Referer': 'https://www.wattpad.com/591602002-carpe-noctem-intro', 'User-Agent': uA}
  };

 function traverseSite(options) {
  rp(options) // request promise
    .then(function(html) {
      $ = cheerio.load(html);
      $('.text').remove();
      if (!$('.next-part-link', html).attr("href"))  // stops scraping when next link is undifined. Returns chapters as param for .then()
        return book

      var chapters = $('pre').eq(0).text();
         // p tags on site store all book text.
      book.push(chapters);  //moving pages into chapters array

      console.log(`Downloaded chapter ${book.length}`)

    return traverseSite({ url: $('.next-part-link', html).attr("href"),
      headers: { 'Referer': $('.next-part-link', html).attr("href"),'User-Agent': uA }
      });
    })


    .then(function cleanText(book) {
      if(Array.isArray(book))
        book.map((x,i) => {
          console.log(`CHAPTER ${i} \n\n${book[i]} \n\n\n`);
        })
        // console.log(`Enjoy \n\n\n ${book.toString()}\n\n\n`);
    })
    .then(function publish(formatedText){

    })
    .catch(function(err) {
      console.log(err);
    });
}


   traverseSite(options.url);
