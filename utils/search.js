const fs = require('fs');
const path = require('path');
const readline = require('readline');
const searchfile = async (courseId, keyword) => {
    const dir = path.join(__dirname, '../public/course/', courseId, 'txt');
    const files = await fs.readdirSync(dir);
    let result={};
    for(let i=0;i<files.length;i++){
        let sample =await readfile(path.join(dir,files[i]),files[i],keyword);
        let j,tmp={};
        for( j=1;j<sample.length;j++)
            if(sample[j]!=0){
            tmp[`${j}`]=sample[j];
            }
        if(j<sample.length){
            result[`${sample[0]}`]=tmp;
        }
    }
        return result;
}
function readfile(dst,filename, keyword) {
    return new Promise((resolve, reject) => {
        const inputStream = fs.createReadStream(dst);
        const lineReader = readline.createInterface({ input: inputStream });
        let page = 1;
        let countArray = new Array();
        countArray[0] = filename;
        countArray[page] = 0;
        lineReader.on('line', function (line) {
            if (line.indexOf("----------------Page (" + (page - 1) + ") Break----------------") != -1) {  //計算目前讀到那一個ＰＡＧＥ
                page++;
                countArray[page] = 0;
            }
            if (line.toLowerCase().indexOf(keyword.toLowerCase()) != -1) {  //如果ＬＩＮＥ裏面有符合ＫＥＹＷＯＲＤ
                countArray[page]++;
            }
        }).on('close',function(){
            resolve(countArray);
        })
    })
}
module.exports = searchfile;