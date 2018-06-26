'use strict';
/**
 * Module dependencies
 */
const router = require('express').Router();
const {authenticate} = require('../../middleware/authenticate');
const {claim} = require('../../middleware/claim');
const {isadmin} = require('../../middleware/isadmin');

// User Routes

router.route('/access').get(authenticate,claim,isadmin,(req, res) => {
    let info = {};
    res.send(info);
});


module.exports = router;