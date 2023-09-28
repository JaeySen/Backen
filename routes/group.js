const express = require('express');
let router = express.Router();
// const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const {
  getAllGroups,
  createGroup,
  deleteGroup,
  getGroupsWithUserId,
  getGroupsWithProjectId,
  // getUsersByGroupId,
  // getUsersByProjectId
} = require('../controller/group');
const { addMemberToGroup, removeUserFromGroup, updateMemberRole } = require('../controller/user');

// router.route('/getAllEmployee').get(HandleControllerOne).post(HandleControllerTwo);
// router.post('/addEmployee', upload.single('avatar'), HandleAddEmployee);
router.post('/', createGroup);
router.get('/', getAllGroups);
router.get('/project/:projectId', getGroupsWithProjectId);
router.delete('/:groupId', deleteGroup);
router.post('/add-user', addMemberToGroup);
router.get('/user/:userId', getGroupsWithUserId);
router.put('/user/set-role', updateMemberRole);
router.delete('/user/remove', removeUserFromGroup);
// router.get('/getUsersByGroupId/:gid', getUsersByGroupId);
// router.get('/getUsersByProjectId/:pid', getUsersByProjectId);
// router.put('/updateEmployeeById/:id', HandleUpdateEmployeeById);
// router.patch('/patchEmployeeById/:id', HandlePatchEmployeeById);
// router.delete('/deleteEmployeeById/:id', HandleDeleteEmployeeById);
// router.get('/search/:key', HandleSearchEmployee);

module.exports = router;
