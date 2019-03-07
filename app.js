 const fs = require('fs');
 const rp = require('request-promise');
 const errors = require('request-promise/errors');
 const cheerio = require('cheerio');
 const docx = require('docx');
 const docxConverter = require('docx-pdf');
 const {
   Document,
   Paragraph,
   Packer
 } = docx;

//Might need to change user agent. Book url is the starting address of the text you want to scrape
 const uA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';
 var bookURL='https://www.wattpad.com/30050160';
 var options = {
   url: bookURL,
   headers: {
     'Referer': bookURL,
     'User-Agent': uA
   }
 };

 var doc = new docx.Document();
 var packer = new docx.Packer();
 var empty = new docx.Paragraph(`\n`);

 function traverseSite(options) {
   rp(options) // request promise
     .then(function(html) {
       $ = cheerio.load(html);

       // Author Information
       doc.addParagraph(new docx.Paragraph($('.item-title').text()).thematicBreak());
       doc.addParagraph(empty);
       doc.addParagraph(new docx.Paragraph($('.author.h6').text()).pageBreak());

       //Chapter Title
       doc.addParagraph(new docx.Paragraph($('h2').text()).heading2().center());
       doc.addParagraph(empty);

       //remove junk
       $('.text').remove();

       //Paragraph text to docx
       $('p').each(function() {
         var paragraph = new docx.Paragraph(`\n\n${$(this).text().replace('  ','')}\n\n`);
         doc.addParagraph(paragraph);
         doc.addParagraph(empty);
       });
       packer.toBuffer(doc).then((buffer) => {
         fs.writeFileSync(`${$('.title.h5').text()}.docx`, buffer);
       });

       console.log($('.next-part-link', html).attr("href"));

       if (!$('.next-part-link', html).attr("href")) {
         fs.readFile(`${$('.title.h5').text()}.docx`, (err, data) => {
           docxConverter(`${$('.title.h5').text()}.docx`, `${$('.title.h5').text()}.pdf`, function(err, result) {
             if (err) {
               console.log(console.log(err));
             }
             console.log('result' + result);
           });
         });
         fs.unlink(`${$('.title.h5').text()}.docx`, (err) => {
           if (err) throw err;
           console.log('path/file.txt was deleted');
         });
         return;
       }

       return traverseSite({
         url: $('.next-part-link', html).attr("href"),
         headers: {
           'Referer': $('.next-part-link', html).attr("href"),
           'User-Agent': uA
         },
       });

     })
     .catch(console.log);
 }

 traverseSite(options.url);
