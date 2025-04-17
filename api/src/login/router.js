var express = require('express');
var router = express.Router();
const { signin } = require('./controller')

router.post('/', signin);

module.exports = router;