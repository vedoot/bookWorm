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

 // doc.Styles.createParagraphStyle('Heading1', 'Heading 1')
 //   .basedOn("Normal")
 //   .next("Normal")
 //   .quickFormat()
 //   .size(28)
 //   .bold()
 //   .italics()
 //   .spacing({
 //     after: 120
 //   });

 const uA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36';

 var book = [];
 var options = {
   url: 'https://www.wattpad.com/682420252-the-love-riots-cast',
   headers: {
     'Referer': 'https://www.wattpad.com/682420252-the-love-riots-cast',
     'User-Agent': uA
   }
 };
 var doc = new docx.Document();
 var i = 0;
 var pages = [];
 var empty = new docx.Paragraph(`\n`);

 function traverseSite(options) {
   rp(options) // request promise
     .then(function(html) {
       $ = cheerio.load(html);



       doc.addParagraph(new docx.Paragraph($('.item-title').text()).thematicBreak());
       doc.addParagraph(empty);
       doc.addParagraph(new docx.Paragraph($('.author.h6').text()).pageBreak());


       var heading = new docx.Paragraph($('h2').text()).heading2().center();
       doc.addParagraph(heading);
       doc.addParagraph(empty);
       $('.text').remove();
       $('p').each(function() {
         var paragraph = new docx.Paragraph(`\n\n${$(this).text().replace('  ','')}\n\n`);
         doc.addParagraph(paragraph);
          doc.addParagraph(empty);
       });
       var titleOfBook = $('h3').text();

       var packer = new docx.Packer();
       packer.toBuffer(doc).then((buffer) => {
         fs.writeFileSync(`freeB00k.docx`, buffer);
       });
       console.log($('.next-part-link', html).attr("href") + i);
       // console.log(`Downloaded chapter ${chapterTitle}`.padStart(130));
       if (!$('.next-part-link', html).attr("href") || i==25){
          docxConverter('freeB00k.docx','output.pdf',function(err,result){
                  if(err){
                    console.log("youre fucked");
                  }
                  console.log('result'+result);
                });
            return;
       } // stops scraping when next link is undifined. Returns chapters as param for .then()
       else{
         i++;
       return traverseSite({
         url: $('.next-part-link', html).attr("href"),
         headers: {
           'Referer': $('.next-part-link', html).attr("href"),
           'User-Agent': uA
         },
       });
     }
     })
     .catch(console.log);
 }

 traverseSite(options.url);
