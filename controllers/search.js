const Search=require('../utils/search');
const search= async (req,res)=>{
    let courseId=req.params.courseId;
    console.log(req.body.keyword);
    let pages=await Search(courseId,req.body.keyword);
    res.json({
        pages
    })
}

module.exports={
    search,
}