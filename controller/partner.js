const Partner = require("../model/partner");
const ProjectPartner = require("../model/partners_projects");
const UserPartner = require("../model/partners_users");

const getAllPartners = (req, res) => {
  Partner.find({})
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const getAllPartnerByUserId = (req, res) => {
  UserPartner.find({ user: req.params.id })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const getAllPartnerByProjectId = (req, res) => {
  ProjectPartner.find({ project: req.params.id })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const createPartner = (req, res) => {
  const newPartner = new Partner();
  newPartner.name = req.body.name;
  newPartner.description = req.body.description;
  newPartner.created = new Date().getTime();
  newPartner
    .save()
    .then((data) => {
      res.status(201).json({
        success: true,
        data: data,
      });
    })
    .catch((error) =>
      res.status(404).json({
        success: false,
        message: error,
      })
    );
};

const deletePartner = (req, res) => {
  Partner.deleteOne({ _id: req.params.id }).then((data) => {
    res
      .status(200)
      .json({
        success: true,
        data: data,
      })
      .catch((error) => {
        res.status(404).json({
          success: false,
          message: error,
        });
      });
  });
};

const addProjectToPartner = (req, res) => {
  const newProjectInPartner = new ProjectPartner();
  newProjectInPartner.project = req.body.project;
  newProjectInPartner.partner = req.body.partner;
  newProjectInPartner
    .save()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(404).json({ success: false, message: error });
    });
};

const addUserToPartner = (req, res) => {
  const newUserInPartner = new UserPartner();
  newUserInPartner.user = req.body.user;
  newUserInPartner.partner = req.body.partner;
  newUserInPartner
    .save()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const removeProjectFromPartner = (req, res) => {
  ProjectPartner.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
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

const removeUserFromPartner = (req, res) => {
  UserPartner.deleteOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
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
  getAllPartners,
  createPartner,
  deletePartner,
  addProjectToPartner,
  addUserToPartner,
  removeProjectFromPartner,
  removeUserFromPartner,
  getAllPartnerByUserId,
  getAllPartnerByProjectId,
};
