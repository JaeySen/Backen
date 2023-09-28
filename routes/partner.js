const express = require('express');
let router = express.Router();

const {
  getPartnersByOwnerId
} = require('../controller/partner');

router.get('/:owner', getPartnersByOwnerId);

module.exports = router;
