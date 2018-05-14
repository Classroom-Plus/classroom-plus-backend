const path = require('path');
const fs = require('fs');
const TOPDF = (file) => {
    return new Promise((resolve, reject) => {
        const toPdf = require("office-to-pdf");
        const wordBuffer = fs.readFileSync(file.path);
        file.pdf = path.join(file.dir, file.basename) + ".pdf";
        toPdf(wordBuffer).then(
            (pdfBuffer) => {
                console.log(pdfBuffer)
                fs.writeFileSync(file.pdf, pdfBuffer);
                console.log("Convert PDF is finishing.")
                resolve(file)
            }, (err) => {
                console.log(err);
                throw err;
            }
        );
    })
}
const TOTXT = (file) => {
    return new Promise((resolve, reject) => {
        const PDFParser = require('pdf2json'),
            fs = require('fs'),
            pdfparser = new PDFParser(this, 1);
        pdfparser.on("pdfParser_dataError", errData => { throw errData; });
        pdfparser.on("pdfParser_dataReady", pdfData => {
            file.txt = path.join(file.dir, 'txt', file.basename) + '.txt';
            fs.writeFileSync(file.txt, pdfparser.getRawTextContent());
            resolve(file);
        })
        pdfparser.loadPDF(file.pdf);
    })
}
const delfile = async (file) => {
    return new Promise((resolve, reject) => {
        fs.unlinkSync(file.pdf);
        resolve(file)
    })
}
const converter = async (file) => {
    if (file.extname === '.pdf') {
        file.pdf = file.path;
        await TOTXT(file);
        delete file.pdf;
    }
    else if (file.extname === '.ppt' || file.extname === '.pptx' || file.extname === '.doc' || file.extname === '.docx' || file.extname === '.xls') {
        console.log("Convert to PDF");
        await TOPDF(file).then(file => TOTXT(file)).then(file => delfile(file)).catch(err => console.log(err));
    } else
        file.txt = null;
    return file;
}
module.exports = converter;