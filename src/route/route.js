const express = require('express');
const router = express.Router();

const { getPlayerData } = require('../controllers/controllers');

router.get('/:id', getPlayerData);

module.exports = router;
