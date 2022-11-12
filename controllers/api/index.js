var router = require('express').Router();
var userRoutes = require('./userRoutes');
var postRoutes = require('./postRoutes');

router.use('/users', userRoutes);

router.use('/posts', postRoutes);

module.exports = router;
