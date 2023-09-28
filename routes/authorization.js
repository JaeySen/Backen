const express = require('express');
const router = express.Router();

const { getAllAuthorizations, createAuthorization, deleteAuthorization } = require('../controller/authorization');

router.get('/', getAllAuthorizations);
router.post('/', createAuthorization);
router.delete('/:idAuthor', deleteAuthorization);

module.exports = router;
