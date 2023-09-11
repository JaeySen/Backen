const User = require('../model/user');
const Project = require('../model/project');
const UserProject = require('../model/users_projects');
const GroupUser = require('../model/groups_users');
const { ObjectId } = require('mongodb');

const getAllUsers = (req, res) => {
    User.find({}).then((data)=>{
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

const getUsersByGroupId = async (req, res) => {
    await GroupUser.find({ group: req.params.gid }).select("-_id -group").populate({path: 'user', model: 'User'}).then((data)=>{
        res.status(200).json({
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

const getUserById = (req, res) => {
    User.findOne({ _id: req.params.id }).then((data)=>{
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

const getUserByUsername = (req, res) => {
    User.findOne({ username: req.params.name })
    .then((data) => {
        res.status(202).json({
            success: true,
            data:data
        })
    })
    .catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const getUsersByProjectId = (req, res) => {
    UserProject.find({ project: req.params.pid }).select('user -_id').populate({path: 'user', model: 'User'}).then((data)=>{
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

const addUserToGroup = (req, res) => {
    const newUserInGroup = new GroupUser();
    
    newUserInGroup.group = req.body.group;
    newUserInGroup.user = req.body.user;
    // newUserInGroup.created = new Date().getTime();

    newUserInGroup.save().then(() => {
        res.status(201).json({
            success: true,
            message: 'User added to Group Successfully'
        })
    }).catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const removeUserFromGroup = (req, res) => {
    GroupUser.deleteOne({ user: req.params.id })
    .then(data => {
        res.status(200).json({
            success: true,
            data:data
        })
    })
    .catch(err => {
        res.status(404).json({
            success: false,
            data:err
        })
    })
}

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
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUsersByGroupId,
    getUsersByProjectId,
    addUserToGroup,
    removeUserFromGroup
}