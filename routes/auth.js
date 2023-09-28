const express = require('express');
let router = express.Router();

const { HandleRegister, HandleLogin } = require('../controller/auth');

router.post('/signup', HandleRegister);
router.post('/signin', HandleLogin);

module.exports = router;
