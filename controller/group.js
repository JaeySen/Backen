const User = require('../model/user');
const Group = require('../model/group');
// const Project = require('../model/project');
// const UserProject = require('../model/users_projects');
const GroupUser = require('../model/groups_users');
const ProjectGroup = require('../model/projects_groups');
const { sendMailTemplate } = require('../middleware/send-mail');
const { getUserByEmailPromise, createUserPromise, createUserProjectLink } = require('./user');
const PartnerGroup = require('../model/partners_groups');

const getAllGroups = (req, res) => {
  Group.find({})
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

// const getAllGroupWithProjectId = (req, res) => {
//   ProjectGroup.find({ project: req.params.id })
//     .then((projectGroupData) => {
//       const groupIds = projectGroupData.map((item) => item.group);
//       return Group.find({ _id: { $in: groupIds } });
//     })
//     .then((data) => {
//       res.status(202).json({
//         success: true,
//         data: data,
//       });
//     })
//     .catch((err) => {
//       res.status(404).json({ message: err });
//     });
// };

const getGroupByID = (req, res) => {
  Group.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err.message,
      });
    });
};

const getGroupsWithUserId = (req, res) => {
  GroupUser.find({ user: req.params.userId }, '-_id -user')
    .populate({ path: 'group', model: 'Group', select: 'name created' })
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => {
        return { ...transformedData, _id: obj.group._id, name: obj.group.name, created: obj.group.created };
      });
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

const createGroup = async (req, res) => {
  const group = new Group();
  // console.log(JSON.parse(req.body.invitee))
  const invitees = JSON.parse(req.body.invitee);

  group.name = req.body.name;
  group.created = new Date().getTime();

  await group
    .save()
    .then(async (createdDoc) => {
      const relProject = new ProjectGroup();
      const projectId = req.body.projectId;
      // const arr = new Array(JSON.parse(req.body.auth))
      // console.log(arr);
      // relProject.auth.push(...arr);
      // console.log(relProject.auth);
      relProject.project = projectId;
      relProject.group = createdDoc._id;
      // relProject.users_role = req.body.role;
      // const arr = [JSON.parse(req.body.auth)];
      await relProject
        .save()
        .then(async () => {
          const worker = [...new Array(invitees.length)];
          const errors = [];
          await Promise.all(
            worker.map(async (_, index) => {
              // console.log(obj.email)
              return new Promise(async (resolve, reject) => {
                const relInvitee = new GroupUser();
                let invitee;

                const existedUser = await getUserByEmailPromise(invitees[index].email);

                if (existedUser) {
                  sendMailTemplate(invitees[index].email, 'DEMO-APS - You have been Invited to Group !');
                  invitee = existedUser;
                } else {
                  sendMailTemplate(
                    invitees[index].email,
                    'DEMO-APS - You have been Invited to Group !',
                    'register',
                    `?invitee=${invitees[index].email}`,
                  );
                  await createUserPromise(invitees[index].email).then((user) => (invitee = user));
                }

                relInvitee.user = invitee._id;
                relInvitee.group = createdDoc._id;
                relInvitee.role = 'user';

                relInvitee
                  .save()
                  .then(async () => {
                    await createUserProjectLink(invitee._id, projectId)
                      .then((res) => resolve(res))
                      .catch((err) => {
                        errors.push(err);
                        reject(err);
                      });
                  })
                  .catch((err) => {
                    errors.push(err);
                    reject(err);
                  });
              });
            }),
          )
            .then(async () => {
              const relAdmin = new GroupUser();

              relAdmin.user = req.body.userid;
              relAdmin.group = createdDoc._id;
              relAdmin.role = 'admin';

              await relAdmin
                .save()
                .then(() => {
                  res.status(201).json({
                    success: true,
                    message: '1 Group added Successfully',
                  });
                })
                .catch(() => {
                  res.status(404).json({
                    success: false,
                    message: 'Admin add to Group Failed',
                  });
                });
            })
            .catch((err) => {
              res.status(404).json({
                success: false,
                message: 'Promise all Failed',
              });
            });
        })
        .catch(() => {
          res.status(404).json({
            success: false,
            message: 'Create Project-Group Link Failed!',
          });
        });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: 'Group created Failed:' + err,
      });
    });
};

const deleteGroup = (req, res) => {
  Group.deleteOne({ _id: req.params.groupId })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        data: err,
      });
    });
};

const addGroupToProject = (req, res) => {
  const newGroup = new Group();

  newGroup.name = req.body.name;
  newGroup.created = new Date().getTime();
  newGroup
    .save()
    .then((data) => {
      const newGroupInProject = new ProjectGroup();

      newGroupInProject.group = data._id;
      newGroupInProject.project = req.body.project;
      // newGroupInProject.created = new Date().getTime();

      newGroupInProject
        .save()
        .then(() => {
          res.status(201).json({
            success: true,
            message: 'Group added to Project Successfully',
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

const getGroupsWithProjectId = (req, res) => {
  ProjectGroup.find({ project: req.params.projectId }, '-_id -project -auth')
    .populate({ path: 'group', model: 'Group' })
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => {
        return { ...transformedData, _id: obj.group._id, name: obj.group.name, created: obj.group.created };
      });
      res.status(202).json({
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

const createPartnerGroup = (req, res) => {
  const newPartnerGroup = new PartnerGroup();
  newPartnerGroup.name = req.body.name;
  newPartnerGroup.role = req.body.role;
  newPartnerGroup.created_at = new Date().getTime();
  newPartnerGroup.partner_id = req.body.partner;

  newPartnerGroup
  .save()
  .then((createdDoc) => {
    res.status(202).json({
      success: true,
      data: createdDoc
    });
  })
  .catch((err) => {
    res.status(404).json({
      success: false,
      message: err
    });
  });
}



module.exports = {
  getAllGroups,
  getGroupsWithUserId,
  getGroupsWithProjectId,
  createGroup,
  deleteGroup,
  addGroupToProject,
  // getUsersByGroupId,
  // getUsersByProjectId
  getGroupByID,
  // getAllGroupWithProjectId,
  createPartnerGroup
};
