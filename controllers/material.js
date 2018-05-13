const db = require('../models/');
const path = require('path');
const convert = require('../utils/converter');
const materailUpload = async (req, res) => {
    let courseId = req.params.courseId;
    let userId = req.authData.id;
    let course;
    if (!req.files || !courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        })
    let file = {};
    file.dir = req.files[0].destination;
    file.filename = req.files[0].filename;
    file.path = req.files[0].path;
    file.extname = path.extname(req.files[0].filename);
    file.basename = path.basename(req.files[0].filename, file.extname);
    await convert(file);
    try {
        course = await db.CourseMember.findOne({ where: { course_id: courseId, course_member_id: userId } });
        if (course) {
            if (course.get('course_member_identity') === 1) {
                if (await db.CourseMaterial.create({
                    course_id: courseId,
                    material_directory:  `/public/course/${courseId}/`,
                    material_filename: req.files[0].filename ,
                    material_convert: file.txt
                })) return res.json({
                    status: true,
                }); else {
                    return res.json({
                        status: false,
                        errors: { msg: 'Upload file is fail' }
                    })
                }
            } else {
                return res.sendStatus(401);
            }
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const deleteFile = async (req, res) => {
    let { fileId, courseId } = req.params;
    let userId = req.authData.id;
    if (!fileId || !courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        })
    try {
        course = await db.CourseMember.findOne({ where: { course_id: courseId, course_member_id: userId } })
        if (course) {
            if (course.get('course_member_identity') === 1) {
                if (await db.CourseMaterial.destroy({
                    where: {
                        course_id: courseId,
                        id: fileId
                    }
                })) {
                    return res.json({
                        status: true
                    })
                } else {
                    return res.json({
                        status: false,
                        errors: { msg: 'destory file is fail' }
                    })
                }
            } else {
                return res.sendStatus(401);
            }
        }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}

const getFiles = async (req, res) => {
    let courseId = req.params.courseId;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        let files=  await db.CourseMaterial.findAll({ where: { course_id: courseId, deleted_at: null } });
       if(files){
           files.map((element)=>{
            element.material_directory=`${process.env.BACKEND_SERVER_URL}${element.material_directory}${element.material_filename}`;
           })
           console.log(files[0]);
       }
       return res.json(files);
    } catch (error) {
        console.log(error);
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const downloadFiles = async (req, res) => {
    let fileId = req.params.fileId;
    let file;
    if (!fileId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
        file = await db.CourseMaterial.findOne({where:{
            id:fileId,
            deleted_at:null
        }})
        let filepath= path.join(file.get('material_directory'),file.get('material_filename'));
        return res.download(filepath,file.get('material_filename'))
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
const getFile = async (req, res) => {
    let { courseId, fileId } = req.params;
    if (!courseId)
        return res.json({
            status: false,
            errors: { msg: 'incorrect parameters' }
        });
    try {
       let files=  await db.CourseMaterial.findAll({ where: { course_id: courseId, id: fileId, deleted_at: null } });
       if(files){
           files.map((element)=>{
               element.material_directory=`${process.env.BACKEND_SERVER_URL}${element.material_directory}${element.material_filename}`;
           })
           res.json (files);
       }
    } catch (error) {
        return res.json({
            status: false,
            errors: { msg: 'database error' }
        });
    }
}
module.exports = {
    materailUpload,
    getFiles,
    deleteFile,
    downloadFiles,
    getFile,
}