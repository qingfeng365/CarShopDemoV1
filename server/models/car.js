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

var ModelCar = mongoose.model('ModelCar', schemaCar, 'car');

module.exports = ModelCar;
