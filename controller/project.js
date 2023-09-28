const Project = require('../model/project');
const User = require('../model/user');
const UserProject = require('../model/users_projects');
const Partnership = require('../model/partnership');
const Types = require('mongoose').Types;

const getAllProjects = (req, res) => {
  Project.find({})
    .then((data) => {
      res.status(202).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const getProjectsByUserEmail = (req, res) => {
  User.findOne({ email: req.params.email })
    .then((data) => {
      UserProject.find({ user: data._id }, 'project -_id')
        .populate({ path: 'project', model: 'Project' })
        .then((data) => {
          let temp = new Array();
          data.forEach((obj, item) => {
            temp.push(obj['project']);
          });
          // console.log(temp)
          res.status(200).json({
            success: true,
            data: temp,
          });
        });
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
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const getProjectsByUserId = (req, res) => {
  UserProject.find({ user: req.params.userId }, '-_id -user')
    .populate({ path: 'project', model: 'Project' })
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => {
        return {
          ...transformedData,
          _id: obj.project._id,
          name: obj.project.name,
          description: obj.project.description,
          created: obj.project.created,
        };
      });
      // console.log(temp)
      res.status(200).json({
        success: true,
        data: transformedData,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const getProjectsWithPartnerId = (req, res) => {
  Project.find({ partner_id: req.params.partner })
  .then((data) => {
    res.status(200).json({
      success: true,
      data: data
    });
  })
  .catch((err) => {
    res.status(404).json({ success: false, message: err });
  });
};

const getProjectById = (req, res) => {
  Project.find({ id: req.params.projectId })
    .exec()
    .then((data) => {
      res.status(202).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ message: err });
    });
};

const createProject = async (req, res) => {
  const project = new Project();

  project.name = req.body.name;
  project.description = req.body.description;
  project.created_at = new Date().getTime();
  project.partner_id = req.body.partner;

  await project
    .save()
    .then(async (data) => {
      // console.log(data._id, req.body.user)
      const rel = new UserProject();

      rel.project = data._id;
      rel.user = new Types.ObjectId(req.body.user);

      await rel
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
            message: '1 Project added Successfully',
          });
        })
        .catch((err) => {
          res.status(404).json({
            success: false,
            message: err,
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const leaveProject = async (req, res) => {
  await UserProject.deleteOne({
    user: new Types.ObjectId(req.body.user),
    project: new Types.ObjectId(req.body.project),
  })
    .then((data) => {
      res.status(202).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

module.exports = {
  getAllProjects,
  getProjectById,
  getProjectsByUserEmail,
  getProjectsByUserId,
  getProjectsWithPartnerId,
  createProject,
  leaveProject,
};
