const User = require('../model/user');
const Group = require('../model/group');
// const Project = require('../model/project');
// const UserProject = require('../model/users_projects');
// const GroupUser = require('../model/groups_users');
const { ObjectId } = require('mongodb');

const getAllGroups = (req, res) => {
    Group.find({}).then((data)=>{
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

// const getUsersByGroupId = async (req, res) => {
//     await GroupUser.find({ group: req.params.gid }).select("-_id -group").populate({path: 'user', model: 'User'}).then((data)=>{
//         res.status(200).json({
//             success: true,
//             data:data
//         })
//     }).catch((err)=>{
//         res.status(404).json({
//             success: false, 
//             message:err
//         })
//     })
// }

// const getUserById = (req, res) => {
//     User.findOne({ _id: req.params.gid }).then((data)=>{
//         res.status(202).json({
//             success: true,
//             data:data
//         })
//     }).catch((err)=>{
//         res.status(404).json({
//             success: false, 
//             message:err
//         })
//     })
// }

// const getUsersByProjectId = (req, res) => {
//     UserProject.find({ project: req.params.pid }).select('user -_id').populate({path: 'user', model: 'User'}).then((data)=>{
//         res.status(202).json({
//             success: true,
//             data:data
//         })
//     }).catch((err)=>{
//         res.status(404).json({
//             success: false, 
//             message:err
//         })
//     })
// }


// const getProjectById = (req, res) => {
//     User.find({ id: req.params.id }).exec().then((data)=>{
//         res.status(202).json({
//             success: true, 
//             data:data
//         })
//     }).catch((err)=>{
//         res.status(404).json({message:err})
//     })
// }

module.exports = {
    getAllGroups,
    // getUsersByGroupId,
    // getUsersByProjectId
}