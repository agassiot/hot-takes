var router = require('express').Router();

var apiRoutes = require('./api');
var homeRoutes = require('./homeRoutes');

router.use('/', homeRoutes);

router.use('/api', apiRoutes);

module.exports = router;
