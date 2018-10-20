var express = require("express");

var router = express.Router();

var assets = require("../models/homeassets.js");
// '51', 'Wine - Mondavi Coastal Private', '25.15', 'kaldam1@biglobe.ne.jp', '93.20', '95', '59.49', '66.77', 'http://dummyimage.com/250x216.bmp/5fa2dd/ffffff'

router.get("/api/homeassets", function(req, res) {
  assets.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
    var asset = assetsObject["homeassets"];

    for (var i = 0; i < asset.length; i++) {
      if (asset[i]["id_email"] == "kaldam1@biglobe.ne.jp") {
        console.log(asset[i]);
      }
    }
    res.json(assetsObject);
  });
});

router.get("/api/homeassets/:email", function(req, res) {
  var email = req.params.email;
  assets.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
    var asset = assetsObject["homeassets"];
    var arrayofObject = [];
    for (var i = 0; i < asset.length; i++) {
      if (asset[i]["id_email"] == email) {
        arrayofObject.push(asset[i]);
        console.log(asset[i]);
      }
    }
    res.json(arrayofObject);
  });
});

router.get("/homeassets", function(req, res) {
  assets.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
    // console.log(data);
    //console.log(insuranceObject);
    res.render("homeassets", assetsObject);
  });
});
module.exports = router;
