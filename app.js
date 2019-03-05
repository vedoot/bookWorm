 const fs = require('fs');
 const rp = require('request-promise');
 const cheerio = require('cheerio');
const docx = require('docx');
const { Document, Paragraph, Packer } = docx;
const uA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36';

 var book = [];
 var options = {
   url: 'https://www.wattpad.com/682420252-the-love-riots-cast',
   headers: {
     'Referer': 'https://www.wattpad.com/682420252-the-love-riots-cast',
     'User-Agent': uA
   }
 };
var i =0;
var pages =[];
 function traverseSite(options) {
   rp(options) // request promise
     .then(function(html) {
       $ = cheerio.load(html);
      var chapterTitle = $('.item-title').text();
       $('.text').remove();
       $('p').each(function(){
         pages.push($(this).text());
       });
       var titleOfBook = $('h3').text();
       console.log(`AHHHHHHHHHHHHHHHHH \n\n\n ${titleOfBook}`.padStart(150));
       var chapters = {
         'title': chapterTitle,
         'pages': pages,
         'bookTitle':titleOfBook
       };
       console.log(book.length);
       // p tags on site store all book text.
       book.push(chapters); //moving pages into chapters array
       console.log(`Downloaded chapter ${chapterTitle}`.padStart(130));
       if (!$('.next-part-link', html).attr("href") || i==3) // stops scraping when next link is undifined. Returns chapters as param for .then()
         return book;
        i++;
       return traverseSite({
         url: $('.next-part-link', html).attr("href"),
         headers: {
           'Referer': $('.next-part-link', html).attr("href"),
           'User-Agent': uA
         }
       });
     })
     .then(function printBook(book) {
       if (Array.isArray(book)) {
         console.log(`***** \n\n\n ${book.pop().pages}`);
        //  console.log(book.pages);
        //     var doc = new docx.Document();
        //
        //  book.map(function(x) {
        // // Add some content in the document
        //   var chapter = x.pop();
        //       chapter.pages.map((x,i) => {
        //       var paragraph = new docx.Paragraph(x);
        //       doc.addParagraph(paragraph);
        //     })
        //     var title = book[1].bookTitle;
        //     var packer = new docx.Packer();
        //     packer.toBuffer(doc).then((buffer) => {
        //         fs.writeFileSync(`freeB00k.docx`, buffer);
        //     });
        //  })
        //  return doc;
       }
     })
     // }).then(function toPDF(doc){
     //  docxConverter('./input.docx','./output.pdf',function(err,result){
     //    if(err){
     //      console.log(err);
     //    }
     //    console.log('result'+result);
     //  });
     // })
     .catch(console.log);
 }


 traverseSite(options.url);
