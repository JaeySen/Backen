const Organization = require("../model/organization");
const OrganizationGroup = require("../model/organizations_groups");
const Partnership = require("../model/partnership");
const Project = require("../model/project");

const getAllOrganization = (req, res) => {
  Organization.find({})
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const getAllPartnerByUserId = (req, res) => {
  Partnership.find({ user: req.params.id })
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

const getAllPartnerByOrganizationId = (req, res) => {
  Partnership.find({ owner: req.params.id }, "-_id -owner")
  .populate({path: "collaborator", model: "Organization", select: "-_id -admin"})
  .populate({path: "project", model: "Project", select: "-_id -__v"})
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => { return { ...transformedData, project_name: obj.project.name, project_desc: obj.project.description, created_at: obj.project.created, partner_name: obj.collaborator.name }})
      res.status(200).json({
        success: true,
        data: transformedData,
        // data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
    });
};

const getAllProjectByPartnerId = (req, res) => {
  ProjectPartner.find({ partner: req.params.id })
    .populate({ path: "project", model: "Project" })
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => {
        return {
          ...transformedData,
          _id: obj.project._id,
          name: obj.project.name,
          description: obj.project.description,
          created: obj.project.startDate,
        };
      });
      res.status(200).json({
        success: true,
        data: transformedData,
      });
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err });
      console.log(err);
    });
};

const createOrganization = (req, res) => {
  const newOrganization = new Organization();
  newOrganization.name = req.body.name;
  newOrganization.description = req.body.description;
  newOrganization.created = new Date().getTime();
  newOrganization
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

const deleteOrganization = (req, res) => {
  Organization.deleteOne({ _id: req.params.id }).then((data) => {
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

const createPartnership = (req, res) => {
  const newPartnership = new Partnership();
  newPartnership.projectId = req.body.projectId;
  newPartnership.owner = req.body.owner;
  newPartnership
    .save()
    .then((data) => {
      res.status(200).json({ success: true, data: data });
    })
    .catch((error) => {
      res.status(404).json({ success: false, message: error });
    });
};

const addUserToPartner = (req, res) => {
  const newUserInPartner = new Partnership();
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
  Partnership.deleteOne({ _id: req.params.id })
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

const createProjectWithPartner = async (req, res) => {
  const project = new Project();

  project.name = req.body.name;
  project.description = req.body.description;
  project.created = new Date().getTime();

  await project
    .save()
    .then(async (data) => {
      const partner_project = new PartnerProject();
      partner_project.partner = req.params.id;
      partner_project.project = data._id;
      await partner_project
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
            message: "Project added partner",
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

module.exports = {
  getAllOrganization,
  createOrganization,
  deleteOrganization,
  createPartnership,
  addUserToPartner,
  removeProjectFromPartner,
  removeUserFromPartner,
  getAllPartnerByUserId,
  getAllProjectByOrganizationId,
  createProjectWithPartner,
};
