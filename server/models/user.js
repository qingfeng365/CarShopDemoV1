'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

var schemaUser = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },
  password: String,
  level: {
    type: Number,
    default: 0
  },
  lastSigninDate: Date,
  meta: {
    createDate: {
      type: Date,
      default: Date.now()
    },
    updateDate: {
      type: Date,
      default: Date.now()
    }
  }
});

schemaUser.pre('save', function(next) {
  var docUser = this;
  if (!docUser.isNew) {
    docUser.meta.updateDate = Date.now();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(docUser.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      docUser.password = hash;
      next();
    });
  });
});

schemaUser.statics = {
  fetch: function(cb) {
    return this
      .find({})
      .sort('meta.createDate')
      .exec(cb);
  },
  findById: function(id, cb) {
    return this
      .findOne({
        _id: id
      })
      .exec(cb);
  }
};

schemaUser.methods = {
  comparePassword: function(inputpw, cb) {
    var docUser = this;
    bcrypt.compare(inputpw, docUser.password,
      function(err, isMatch) {
        if(err){
          return cb(err);
        }
        cb(null, isMatch);
      });
  }
};

var ModelUser = mongoose.model('ModelUser', schemaUser, 'user');

module.exports = ModelUser;
