const express = require('express');
let router = express.Router();
// const checkAuth = require('../middleware/check-auth');
const upload = require('../middleware/upload');

const {
    getAllUsers,
    getUsersByGroupId,
    getUsersByProjectId
} = require('../controller/user');



// router.route('/getAllEmployee').get(HandleControllerOne).post(HandleControllerTwo);
// router.post('/addEmployee', upload.single('avatar'), HandleAddEmployee);
router.get('/getAllUsers', getAllUsers);
router.get('/getUsersByGroupId/:gid', getUsersByGroupId);
router.get('/getUsersByProjectId/:pid', getUsersByProjectId);
// router.put('/updateEmployeeById/:id', HandleUpdateEmployeeById);
// router.patch('/patchEmployeeById/:id', HandlePatchEmployeeById);
// router.delete('/deleteEmployeeById/:id', HandleDeleteEmployeeById);
// router.get('/search/:key', HandleSearchEmployee);


module.exports=router;