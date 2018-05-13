const Search=require('../utils/search');
const search= async (req,res)=>{
    let courseId=req.params.courseId;
    if(!req.body.keyword)
        return res.json({
            status:false,
            errors:{msg:'no keyword'}
        });
    let pages=await Search(courseId,req.body.keyword);
    res.json({
        pages
    })
}

module.exports={
    search,
}