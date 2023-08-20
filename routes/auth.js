const express = require('express');
let router = express.Router();


const {
    HandleRegister,
    HandleLogin
} = require('../controller/auth');


router.post('/register', HandleRegister)
router.post('/login', HandleLogin)


module.exports=router;