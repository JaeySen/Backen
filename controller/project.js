const Project = require('../model/project');

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
    getProjectById
}