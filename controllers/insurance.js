var express = require("express");

var router = express.Router();

var users = require("../models/users.js");

router.get("/", function(req, res) {
  res.render("index");
});

router.get("/home", function(req, res) {
    res.render("home"); 
});

router.get("/users/:email", function(req, res) {
  var email = req.params.email;
  users.selectWhere(email, function(data) {
    var assets = {
      users: data
    };

    res.render("users", assets);
  });
});

router.get("/login", function(req, res) {
  users.all(function(data) {
    var insuranceObject = {
      users: data
    };

    res.render("login", insuranceObject);
  });
});

router.post("/login/:email/:password", function(req, res) {
  var email = req.params.email;
  var password = req.params.password;

  var holduser = [];
  users.all(function(data) {
    var insuranceObject = {
      users: data
    };

    for (var i = 0; i < insuranceObject["users"].length; i++) {
      var pair = insuranceObject["users"][i];
      for (n in pair) {
        if (email == pair["id_email"] && password === pair["userpassword"]) {
          holduser.push(insuranceObject["users"][i]);
          break;
        }
      }
    } //Found user
    //Now find homeassets
  });
  users.all(function(data) {
    var assetsObject = {
      homeassets: data
    };
    // console.log("All Assets in the table: " + assetsObject);
    // console.log("All Assets in the table length: " + assetsObject["homeassets"].length);
    for (var i = 0; i < assetsObject["homeassets"].length; i++) {
      var pair = assetsObject["homeassets"][i];
      // console.log(pair);
      for (n in pair) {
        if (email == pair[n]) {
          // console.log("Where is randy and YY??");
          holduser.push(pair);
          break;
        }
      }
    }

    // for (var i = 0; i < holduser.length; i++) {
    //   console.log(holduser[i]);
    // }
    // console.log(req);
    //console.log(holduser);
    //  res.json({ id: result.insertId });
    res.json(holduser);
    // res.json("index");
    // res.json(holduser);
  });
});

module.exports = router;
