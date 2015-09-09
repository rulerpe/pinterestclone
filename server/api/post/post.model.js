'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  link: String,
  imgLink: String
});

module.exports = mongoose.model('Post', PostSchema);