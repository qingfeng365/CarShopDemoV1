'use strict';

var mongoose = require('mongoose');

var schemaCar = new mongoose.Schema({
  proTitle: String,
  brand: String,
  series: String,
  color: String,
  yearStyle: String,
  carModelName: String,
  ml: String,
  kw: String,
  gearbox: String,
  guidePrice: String,
  imageLogo: String,
  buyNum: {
    type: Number,
    default: 0
  },
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

//注意:该预处理过程,只会在使用doc对象的save方法才会触发
//this表示doc对象自身
schemaCar.pre('save', function(next) {
  if (!this.isNew) {
    this.meta.updateDate = Date.now();
  }
  next();
});

//注意:该预处理过程,只会在使用Model对象的findOneAndUpdate或findIdAndUpdate才会触发
//this表示Query对象
schemaCar.pre('findOneAndUpdate', function(next) {
  this.update({}, {
    $set: {
      'meta.updateDate': Date.now()
    }
  });
  next();
});


schemaCar.statics = {
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
  },
  getCount: function(s, cb) {
    if (s) {
      var regex = new RegExp(s + '.*', 'i');
      return this.find()
        .or([{
          proTitle: regex
        }, {
          brand: regex
        }, {
          series: regex
        }, {
          carModelName: regex
        }])
        .count(cb);
    } else {
      return this.count(cb);
    }
  },
  findByPage: function(s, page, size, cb) {
    if (s) {
      var regex = new RegExp(s + '.*', 'i');
      
      return this.find()
        .or([{
          proTitle: regex
        }, {
          brand: regex
        }, {
          series: regex
        }, {
          carModelName: regex
        }])
        .sort('meta.createDate')
        .skip((page - 1) * size)
        .limit(size)
        .exec(cb);

    } else {

      return this
        .find({})
        .sort('meta.createDate')
        .skip((page - 1) * size)
        .limit(size)
        .exec(cb);
    }
  }
};

var ModelCar = mongoose.model('ModelCar', schemaCar, 'car');

module.exports = ModelCar;
