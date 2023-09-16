const express = require('express');
let router = express.Router();
// const checkAuth = require('../middleware/check-auth');
// const upload = require('../middleware/upload');

const {
    getAllUsers,
    getUserById,
    getUserByUsername,
    getUserByEmail,
    getUsersByGroupId,
    getUsersByProjectId,
    createUser,
    updateUserInfo
} = require('../controller/user');

// router.route('/getAllEployee').get(HandleControllerOne).post(HandleControllerTwo);
// router.post('/addEmployee', upload.single('avatar'), HandleAddEmployee);
router.post('/', createUser);
router.get('/', getAllUsers);
router.put('/', updateUserInfo);
router.get('/:userId', getUserById);
router.get('/email/:email', getUserByEmail);
router.get('/name/:name', getUserByUsername);
router.get('/group/:groupId', getUsersByGroupId);
router.get('/project/:projectId', getUsersByProjectId);
// router.put('/updateEmployeeById/:id', HandleUpdateEmployeeById);
// router.patch('/patchEmployeeById/:id', HandlePatchEmployeeById);
// router.delete('/deleteEmployeeById/:id', HandleDeleteEmployeeById);
// router.get('/search/:key', HandleSearchEmployee);


module.exports=router;