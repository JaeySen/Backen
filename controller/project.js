const Project = require('../model/project');
const User = require('../model/user');
const UserProject = require('../model/users_projects');

const getAllProjects = (req, res) => {
    Project.find({}).then((data)=>{
        res.status(202).json({
            success: true,
            data:data
        })
    }).catch((err)=>{
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const getProjectsByEmail = (req, res) => {
    User.findOne({ email: req.params.email }).then((data)=>{
        UserProject.find({ user: data._id }, 'project -_id').populate({path: 'project', model: 'Project'}).then((data) => {
            let temp = new Array();
            data.forEach((obj, item) => {
               temp.push(obj["project"]);
            })
            // console.log(temp)
            res.status(200).json({
                success: true,
                data:temp
            })
        })
        // .then((data) => {
        //     // Project.aggregate([
        //     //     { $match: { _id: data.project}}
        //     // ]).then((data) => {
        //     //     res.status(200).json({
        //     //         success: true,
        //     //         data:data
        //     //     })
        //     // })
        //     res.status(200).json({
        //         success: true,
        //         data:data
        //     })
        // })
    }).catch((err)=>{
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const getProjectById = (req, res) => {
    Project.find({ id: req.params.id }).exec().then((data)=>{
        res.status(202).json({
            success: true, 
            data:data
        })
    }).catch((err)=>{
        res.status(404).json({message:err})
    })
}

module.exports = {
    getAllProjects,
    getProjectById,
    getProjectsByEmail
}