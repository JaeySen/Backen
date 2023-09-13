const User = require('../model/user');
const Group = require('../model/group');
// const Project = require('../model/project');
// const UserProject = require('../model/users_projects');
const GroupUser = require('../model/groups_users');
const ProjectGroup = require('../model/projects_groups');
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

const getGroupsWithUserId = (req, res) => {
    GroupUser.find({ user: req.params.user }, '-_id -user').populate({path: 'group', model: 'Group', select: 'name created', project: 'name'}).then((data)=>{
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

const createGroup = async (req, res) => {
    const group = new Group();
    
    group.name = req.body.name;
    group.created = new Date().getTime();

    await group.save().then(async (createdDoc) => {
        // console.log(createdDoc);
        // const relProject = new ProjectGroup();

        // const arr = new Array(JSON.parse(req.body.auth))
        // console.log(arr);
        // relProject.auth.push(...arr);
        // console.log(relProject.auth);
        // relProject.project = req.body.project;
        // relProject.group = createdDoc._id;
        // relProject.users_role = req.body.role;
        // const arr = [JSON.parse(req.body.auth)];


        res.status(201).json({
            success: true,
            message: '1 Group added Successfully'
        })

        // await relProject.save().then(() => {
        //     res.status(201).json({
        //         success: true,
        //         message: '1 Group added Successfully'
        //     })
        // })
        // .catch((err) => {
        //     res.status(404).json({
        //         success: false, 
        //         message:err
        //     })
        // })
    }).catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}


const deleteGroup = (req, res) => {
    Group.deleteOne({ _id: req.params.id })
    .then(data => {
        res.status(200).json({
            success: true,
            data:data
        })
    })
    .catch(err => {
        res.status(400).json({
            success: false,
            data:err
        })
    })
}

const addGroupToProject = (req, res) => {
    const newGroup = new Group();

    newGroup.name = req.body.name;
    newGroup.created = new Date().getDate();
    newGroup.save().then((data) => {
        const newGroupInProject = new ProjectGroup();
    
        newGroupInProject.group = data._id;
        newGroupInProject.project = req.body.project;
        // newGroupInProject.created = new Date().getTime();
    
        newGroupInProject.save().then(() => {
            res.status(201).json({
                success: true,
                message: 'Group added to Project Successfully'
            })
        }).catch((err) => {
            res.status(404).json({
                success: false, 
                message:err
            })
        })
    })
    .catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })

}

// const updateGroup = (req, res) => {
//     Group.findOneAndUpdate()
// }

module.exports = {
    getAllGroups,
    getGroupsWithUserId,
    createGroup,
    deleteGroup,
    addGroupToProject
    // getUsersByGroupId,
    // getUsersByProjectId
}