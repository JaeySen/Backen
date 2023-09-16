const User = require('../model/user');
const Project = require('../model/project');
const UserProject = require('../model/users_projects');
const GroupUser = require('../model/groups_users');
const jwt = require("jsonwebtoken");


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
    await GroupUser.find({ group: req.params.groupId }).select("-_id -group").populate({path: 'user', model: 'User', select: '-created -passwordHash -__v'}).then((data)=>{
        let transformedData = new Array();
        transformedData = data.map((obj) => { return { ...transformedData, username: obj.user.username, email: obj.user.email, role: obj.user.role, key: obj.user._id, role: obj.role }})
        res.status(200).json({
            success: true,
            data:transformedData
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

const getUserByEmail = async (req, res) => {
    // console.log(req.params.email)
    await User.findOne({ email: req.params.email })
    .then((data) => {
        if (data !== null) {

            const token = jwt.sign(
                {
                  user: data.username,
                  email: data.email
                },
                "secret",
                { expiresIn: "1h" }
              );
    
            res.status(200).json({
                success: true,
                auth_token: token,
                data:data
            })
        } else {
            res.status(404).json({
                success: false,
                message: 'User Not found'
            })
        }

    })
    .catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const getUserByEmailPromise = (email) => {
    // console.log(req.params.email)
    return new Promise((resolve, reject) => {
        User.findOne({ email: email })
        .then((user) => {
            resolve(user);
        })
        .catch((err) => reject(new Error('An error occured fetching user:' + err)))
    })
}

const getUsersByProjectId = (req, res) => {
    UserProject.find({ project: req.params.projectId }).select('user -_id').populate({path: 'user', model: 'User'}).then((data)=>{
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
    GroupUser.deleteOne({ user: req.body.userId })
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

const updateUserInfo = async (req, res) => {
    await User.findOneAndUpdate(
        { email: req.body.email },
        { $set: {
            first_name: req.body.firstName, 
            last_name: req.body.lastName
        }}
    )
    .then((ures) => {
        res.status(202).json({
            success: true,
            data:ures
        })
    })
    .catch(err => {
        res.status(404).json({
            success: false,
            data:err
        })
    })
}

const createUser = async (req, res) => {
    const user = new User();
    
    user.email = req.body.email;
    user.username = req.body.username;
    user.created = new Date().getTime();

    await user.save().then((data) => {

        const token = jwt.sign(
            {
              user: user.username,
              email: user.email
            },
            "secret",
            { expiresIn: "1h" }
          );

        res.status(201).json({
            success: true,
            auth_token: token,
            data: data
        })
    }).catch((err) => {
        res.status(404).json({
            success: false, 
            message:err
        })
    })
}

const createUserPromise =  (email) => {
    return new Promise((resolve, reject) => {
        const user = new User();
    
        user.email = email;
        user.username = "";
        user.created = new Date().getTime();
    
        user.save().then((user) => resolve(user)).catch((err) => reject(new Error("An error occurs while creating new User: ", err)))
    })
}

const updateMemberRole = async (req, res) => {
    const user = await getUserByEmailPromise(req.body.email);
    if (user) {
        await GroupUser.findOneAndUpdate(
            { group: req.body.group, user: user._id },
            { $set: {
                role: req.body.role
            }},
            {new: true}
        )
        .then((ures) => {
            res.status(202).json({ // currently not return true despite run well
                success: true,
                data:ures
            })
        })
        .catch((err) => {
            res.status(404).json({
                success: false,
                message: "Role update Failed!: " + err 
            })
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUserByEmailPromise,
    getUsersByGroupId,
    getUsersByProjectId,
    addUserToGroup,
    removeUserFromGroup,
    createUser,
    createUserPromise,
    updateUserInfo,
    updateMemberRole
}