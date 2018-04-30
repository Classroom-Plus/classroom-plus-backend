const fs = require('fs'),
  readline = require('readline'),
  path = require('path');
const searchfile = async (dirpath, keyword) => {
  const files = fs.readdirSync(dirpath);
  let result = {};
  for (let i = 0; i < files.length; i++) {
    let tmp = await readfile(path.join(dirpath, files[i]), keyword);
    result.push(tmp);
  }
  return result;
}
function readfile(file, keyword) {
  return new Promise((resolve, reject) => {
    const inputStream = fs.createReadStream(file),
      lineReader = readline.createInterface({ input: inputStream });
    let page = 1, result = new Array();
    result[0] = file;
    result[page] = 0;
    lineReader.on('line', function (line) {
      if (line.indexOf("----------------Page (" + (page - 1) + ") Break----------------") != -1) {
        page++;
        result[page] = 0;
      }
      if (line.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {
        result[page]++;
      }
    }).close(() => {
      resolve(result);
    })
  })
}
module.exports = searchfile;