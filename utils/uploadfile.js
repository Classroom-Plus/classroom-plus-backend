const fs = require('fs'),
    path = require('path');
const fileupload = async (fileinfo, ori) => {
    const message=await asyncUpload(fileinfo,ori);
    console.log(message);
    return fileinfo;
};
function asyncUpload(fileinfo, ori) {
    return new Promise((resolve, reject) => {
        readStream = fs.createReadStream(ori);
        writeStream = fs.createWriteStream(fileinfo.dest);
        readStream.pipe(writeStream);
        readStream.on('end', function () {
            fs.unlinkSync(ori);
            resolve("upload finish");
        });
    })
}
module.exports = fileupload;