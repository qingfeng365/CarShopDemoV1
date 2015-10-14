var mongoose = require('mongoose');

var ModelCar = require('./models/car');

mongoose.connect('mongodb://localhost/carShop');

var carArray = [{
    proTitle: "英朗",
    brand: "别克",
    series: "英朗",
    color: "中国红",
    yearStyle: "2015款",
    carModelName: "15N 手动 进取型",
    ml: "1.5L",
    kw: "84kw",
    gearbox: "6挡 手自一体",
    guidePrice: "11.99",
    imageLogo: "http://img10.360buyimg.com/n7/jfs/t751/148/1231629630/30387/67209b8b/5528c39cNab2d388c.jpg",
    buyNum: 200
  },
  {
    proTitle: "哈弗H6",
    brand: "哈弗",
    series: "哈弗",
    color: "雅致银",
    yearStyle: "2015款",
    carModelName: "升级版 1.5T 手动 两驱 都市型",
    ml: "1.5L",
    kw: "110kw",
    gearbox: "6挡 手动",
    guidePrice: "9.63",
    imageLogo: "http://img10.360buyimg.com/n7/jfs/t874/304/396255796/41995/328da75e/5528c399N3f9cc646.jpg",
    buyNum: 888
  },
  {
    proTitle: "速腾",
    brand: "大众",
    series: "速腾",
    color: "雅士银",
    yearStyle: "2015款",
    carModelName: "1.4T 双离合 230TSI 舒适型",
    ml: "1.4L",
    kw: "96kw",
    gearbox: "7挡 双离合",
    guidePrice: "12.30",
    imageLogo: "http://img10.360buyimg.com/n7/jfs/t988/239/475904647/32355/a1d35780/55278f2cN574b21ab.jpg",
    buyNum: 100
  },
  {
    proTitle: "捷达",
    brand: "一汽大众",
    series: "捷达",
    color: "珊瑚蓝",
    yearStyle: "2015款",
    carModelName: "质惠版 1.4L 手动时尚型",
    ml: "1.4L",
    kw: "66kw",
    gearbox: "5挡 手动",
    guidePrice: "7.51",
    imageLogo: "http://img10.360buyimg.com/n7/jfs/t1108/41/489298815/33529/38655c9f/5528c276N41f39d00.jpg",
    buyNum: 300
  },
  {
    proTitle: "本田XR-V",
    brand: "东风本田",
    series: "XR-V",
    color: "炫金银",
    yearStyle: "2015款",
    carModelName: "1.5L 自动 经典版",
    ml: "1.5L",
    kw: "96kw",
    gearbox: "无级挡 CVT无级变速",
    guidePrice: "12.78",
    imageLogo: "http://img10.360buyimg.com/n7/jfs/t754/341/1237166856/40843/baf73c5c/5528c273Ncb42f04c.jpg",
    buyNum: 500
  }
];

ModelCar.create(carArray,function(err, cars){
  if(err){
    console.log(err);
  }else{
    console.log('新增 %d 条记录', cars.length);
  }
  mongoose.disconnect();
});

