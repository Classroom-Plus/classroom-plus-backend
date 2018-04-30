const path = require('path');
const fs = require('fs');
const converter = async (fileinfo) => {
    if (fileinfo.ext === '.pdf') {
        fileinfo.pdf = fileinfo.dest;
        await convertTXT(fileinfo);
    }
    else if (fileinfo.ext === '.ppt' || fileinfo.ext === '.pptx' || fileinfo.ext === '.doc' || fileinfo.ext === '.docs' || fileinfo.ext === '.xls') {
        await convertPDF(fileinfo).then(fileinfo => convertTXT(fileinfo)).then(fileinfo => { asyncDelete(fileinfo); }).catch(error => console.log(error));
    }
    return fileinfo;
}
function convertTXT(fileinfo) {
    return new Promise((resolve, reject) => {
        const PDFParser = require('pdf2json'),
            fs = require('fs'),
            pdfparser = new PDFParser(this, 1);
        pdfparser.on("pdfParser_dataError", errData => {throw errData;});
        pdfparser.on("pdfParser_dataReady", pdfData => {
            fileinfo.txt = path.join(fileinfo.dirname, '/txt/', fileinfo.basename) + '.txt';
            fs.writeFileSync(fileinfo.txt, pdfparser.getRawTextContent());
            resolve(fileinfo);
        })
        pdfparser.loadPDF(fileinfo.pdf);
    })

}
async function convertPDF(fileinfo) {
    return new Promise((resolve, reject) => {
        const toPdf = require("office-to-pdf");
        const wordBuffer = fs.readFileSync(fileinfo.dest);
        fileinfo.pdf = path.join(fileinfo.dirname, fileinfo.basename)+ ".pdf";
        toPdf(wordBuffer).then(
            (pdfBuffer) => {
                fs.writeFileSync(fileinfo.pdf, pdfBuffer);
                resolve(fileinfo);
            }, (err) => {
                throw err;
                reject(err);
            }
        );
    })
}
function asyncDelete(fileinfo) {
    return new Promise((resolve, reject) => {
        fs.unlinkSync(fileinfo.pdf);
    })
}

module.exports = converter;