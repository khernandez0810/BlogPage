const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./commentRoutes');

router.use('/users', userRoutes);
router.use('/comment', projectRoutes);

module.exports = router;
