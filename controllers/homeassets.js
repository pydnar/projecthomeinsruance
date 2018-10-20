var express = require("express");

var router = express.Router();

var assets = require("../models/homeassets.js");

router.get("/api/homeassets", function(req, res) {
  assets.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
    res.json(assetsObject);
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
