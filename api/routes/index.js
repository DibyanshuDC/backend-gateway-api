'use strict';
/**
 * Module dependencies
 */
const router = require('express').Router();

const adminRoutes = require('./admin/admin.routes');
const userRoutes = require('./users/users.routes');


// mount admin routes at /admin
router.use('/admin', adminRoutes);
router.use('/user', userRoutes);



module.exports = router;