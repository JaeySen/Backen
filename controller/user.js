const User = require("../model/user");
const Project = require("../model/project");
const UserProject = require("../model/users_projects");
const GroupUser = require("../model/groups_users");
const jwt = require("jsonwebtoken");
const { sendMailTemplate } = require("../middleware/send-mail");
const { ObjectId } = require("mongoose");

const getAllUsers = (req, res) => {
  User.find({})
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

// const getUsersByGroupId = async (req, res) => {
//     await GroupUser.find({ group: req.params.groupId }).select("-_id -group").populate({path: 'user', model: 'User', select: '-created -passwordHash -__v'}).then((data)=>{
//         let transformedData = new Array();
//         transformedData = data.map((obj) => { return { ...transformedData, username: obj.user.username, email: obj.user.email, role: obj.user.role, key: obj.user._id, role: obj.role }})
//         res.status(200).json({
//             success: true,
//             data:transformedData
//         })
//     }).catch((err)=>{
//         res.status(404).json({
//             success: false,
//             message:err
//         })
//     })
// }
const getUsersByGroupId = (req, res) => {
  return new Promise((resolve, reject) => {
    GroupUser.find({ group: req.params.groupId })
      .select("-_id -group")
      .populate({
        path: "user",
        model: "User",
        select: "-created -passwordHash -__v",
      })
      .then((data) => {
        let transformedData = new Array();
        transformedData = data.map((obj) => {
          return {
            ...transformedData,
            username: obj.user.username,
            email: obj.user.email,
            role: obj.role,
            key: obj.user._id,
            status: obj.status,
          };
        });
        resolve(
          res.status(200).json({
            success: true,
            data: transformedData,
          })
        );
      })
      .catch((err) => {
        reject(
          res.status(404).json({
            success: false,
            message: err,
          })
        );
      });
  });
};

const getUserById = (req, res) => {
  User.findOne({ _id: req.params.id })
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

const getUserByUsername = (req, res) => {
  User.findOne({ username: req.params.name })
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

const getUserByEmail = async (req, res) => {
  // console.log(req.params.email)
  await User.findOne({ email: req.params.email })
    .then((data) => {
      if (data !== null) {
        const token = jwt.sign(
          {
            user: data.username,
            email: data.email,
          },
          "secret",
          { expiresIn: "1h" }
        );

        res.status(200).json({
          success: true,
          auth_token: token,
          data: data,
        });
      } else {
        res.status(404).json({
          success: false,
          message: "User Not found",
        });
      }
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: err,
      });
    });
};

const getUserByEmailPromise = (email) => {
  // console.log(req.params.email)
  return new Promise((resolve, reject) => {
    User.findOne({ email: email })
      .then((user) => {
        resolve(user);
      })
      .catch((err) =>
        reject(new Error("An error occured fetching user:" + err))
      );
  });
};

const getUsersByProjectId = (req, res) => {
  UserProject.find({ project: req.params.projectId })
    .select("user")
    .populate({ path: "user", model: "User" })
    .then((data) => {
      let transformedData = new Array();
      transformedData = data.map((obj) => {
        return {
          ...transformedData,
          key: obj.user._id,
          username: obj.user.username,
          email: obj.user.email,
          // created: obj.group.created
        };
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

const addMemberToGroup = async (req, res) => {
  const invitees = JSON.parse(req.body.invitee);

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
          sendMailTemplate(
            invitees[index].email,
            "DEMO-APS - You have been Invited to Group !"
          );
          invitee = existedUser;
        } else {
          sendMailTemplate(
            invitees[index].email,
            "DEMO-APS - You have been Invited to Group !",
            "register",
            `?invitee=${invitees[index].email}`
          );
          await createUserPromise(invitees[index].email).then(
            (user) => (invitee = user)
          );
        }

        relInvitee.user = invitee._id;
        relInvitee.group = req.body.groupId;
        relInvitee.role = "user";

        relInvitee
          .save()
          .then((res) => resolve(res))
          .catch((err) => {
            errors.push(err);
            reject(err);
          });
      });
    })
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: "Members added Successfully!",
      });
    })
    .catch(() => {
      res.status(404).json({
        success: false,
        message: "Promise all Failed",
      });
    });
};

const addMemberToProject = async (req, res) => {
  const invitees = JSON.parse(req.body.invitee);
  const projectId = req.body.projectId;
  const worker = [...new Array(invitees.length)];
  const errors = [];
  await Promise.all(
    worker.map(async (_, index) => {
      return new Promise(async (resolve, reject) => {
        const relInvitee = new UserProject();
        let invitee;

        const existedUser = await getUserByEmailPromise(invitees[index]);

        if (existedUser) {
          sendMailTemplate(
            invitees[index],
            "DEMO-APS - You have been Invited to Group !"
          );
          invitee = existedUser;
        } else {
          sendMailTemplate(
            invitees[index],
            "DEMO-APS - You have been Invited to Group !",
            "register",
            `?invitee=${invitees[index]}`
          );
          await createUserPromise(invitees[index]).then(
            (user) => (invitee = user)
          );
        }

        relInvitee.user = invitee._id;
        relInvitee.project = projectId;
        // relInvitee.role = 'user';

        relInvitee
          .save()
          .then((res) => resolve(res))
          .catch((err) => {
            errors.push(err);
            reject(err);
          });
      });
    })
  )
    .then(() => {
      res.status(200).json({
        success: true,
        message: "New Project Members added Successfully!",
      });
    })
    .catch(() => {
      res.status(404).json({
        success: false,
        message: "Promise all Failed",
      });
    });
};

const removeUserFromGroup = (req, res) => {
  GroupUser.deleteOne({ user: req.body.userId })
    .then((data) => {
      res.status(200).json({
        success: true,
        data: data,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        data: err,
      });
    });
};

const updateUserInfo = async (req, res) => {
  await User.findOneAndUpdate(
    { email: req.body.email },
    {
      $set: {
        first_name: req.body.firstName,
        last_name: req.body.lastName,
      },
    }
  )
    .then((ures) => {
      res.status(202).json({
        success: true,
        data: ures,
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        data: err,
      });
    });
};

const createUser = async (req, res) => {
  const user = new User();

  user.email = req.body.email;
  user.username = req.body.username;
  user.created = new Date().getTime();

  await user
    .save()
    .then((data) => {
      const token = jwt.sign(
        {
          user: user.username,
          email: user.email,
        },
        "secret",
        { expiresIn: "1h" }
      );

      res.status(201).json({
        success: true,
        auth_token: token,
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

const createUserProjectLink = async (userId, projectId) => {
  return new Promise((resolve, reject) => {
    const newLink = new UserProject();

    newLink.user = userId;
    newLink.project = projectId;
    // newLink.created = new Date().getTime();

    newLink
      .save()
      .then((res) => resolve(res))
      .catch((err) =>
        reject(new Error("An error occurs while creating new User: ", err))
      );
  });
};

const createUserPromise = (email) => {
  return new Promise((resolve, reject) => {
    const user = new User();

    user.email = email;
    user.username = "";
    user.created = new Date().getTime();

    user
      .save()
      .then((user) => resolve(user))
      .catch((err) =>
        reject(new Error("An error occurs while creating new User: ", err))
      );
  });
};

const updateMemberRole = async (req, res) => {
  const user = await getUserByEmailPromise(req.body.email);
  if (user) {
    await GroupUser.findOneAndUpdate(
      { group: req.body.group, user: user._id },
      {
        $set: {
          role: req.body.role,
        },
      },
      { new: true }
    )
      .then((ures) => {
        res.status(202).json({
          // currently not return true despite run well
          success: true,
          data: ures,
        });
      })
      .catch((err) => {
        res.status(404).json({
          success: false,
          message: "Role update Failed!: " + err,
        });
      });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByEmailPromise,
  getUsersByGroupId,
  getUsersByProjectId,
  addMemberToGroup,
  addMemberToProject,
  removeUserFromGroup,
  createUser,
  createUserPromise,
  updateUserInfo,
  updateMemberRole,
  createUserProjectLink,
};
