'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var User = require('../user/user.model');

// Get list of posts
exports.index = function(req, res) {
  Post.find(function (err, posts) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(posts);
  });
};

// Get a single post
exports.show = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    return res.json(post);
  });
};

exports.showMyPosts = function(req, res) {
  User.findOne({_id:req.user._id}, function(err,user){
    if(err) { return handleError(res, err); };
    Post.find({'_id': { $in: user.post}}, function(err, posts){
      if(err) { return handleError(res, err); }
      return res.status(200).json(posts);
    })
  })
}

// Creates a new post in the DB.
exports.create = function(req, res) {
  req.body.owner = req.user._id;
  Post.create(req.body, function(err, post) {
    if(err) { return handleError(res, err); };
    User.findById(req.body.owner, function(err, user){
      if(err) { return handleError(res, err); };
      user.post.push(post);
      user.save(function(err){
        if(err) { return handleError(res, err); };
        return res.status(201).json(post);
      })
    })
    
  });
};

// Updates an existing post in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Post.findById(req.params.id, function (err, post) {
    if (err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function(req, res) {
  Post.findById(req.params.id, function (err, post) {
    if(err) { return handleError(res, err); }
    if(!post) { return res.status(404).send('Not Found'); }
    User.findById(post.owner, function(err, user){
      var i = user.post.indexOf(post._id);
      user.post.splice(i,1);
      user.save(function(err){
        if(err) { return handleError(res, err); }
        post.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.status(204).send('No Content');
        });
      })
    })
  });
};

function handleError(res, err) {
  return res.status(500).send(err);
}