const express = require('express');
let router = express.Router();

const {
  getPartnersByOwnerId,
  createPartner
} = require('../controller/partner');
const { getProjectsWithPartnerId, createProject } = require('../controller/project');

router.get('/:owner', getPartnersByOwnerId);
router.get('/:partnerId/projects', getProjectsWithPartnerId);
router.post('/', createPartner);
router.post('/projects', createProject);

module.exports = router;
