var express = require("express");

var router = express.Router();

var assets = require("../models/homeassets.js");

router.get("/api/usersassets", function(req, res) {
  assets.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
 
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
