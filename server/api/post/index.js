'use strict';

var express = require('express');
var controller = require('./post.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');
var router = express.Router();

router.get('/', controller.index);
//router.get('/:id', controller.show);
router.get('/myposts', auth.isAuthenticated(), controller.showMyPosts);
router.post('/', auth.isAuthenticated(), controller.create);
router.put('/:id', auth.isAuthenticated(), controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', auth.isAuthenticated(), controller.destroy);

module.exports = router;