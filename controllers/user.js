//create new user
var express = require("express");

var router = express.Router();

var user = require("../models/users.js");

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/api/newuser", function(req, res) {
  //  console.log(Object.values(req.body));
  console.log(req.body.id_email);
  user.create([Object.keys(req.body)], [Object.values(req.body)], function(
    result
  ) {
    // Send back the ID of the new quote
    var userdata = {
      users: result
    };

    console.log("Here");
    user.selectUser(req.body.id_email, function(data) {
      var userdata = {
        user: data
      };
      console.log(userdata.user);
     
      if (result.affectedRow !== 1) {
        console.log("Users Added");
        res.render("users", userdata);
      } else {
        res.render("register");
      }
    });
  });
});

router.get("/api/user/:email", function(req, res) {
  //Change update value in table itemactive

  users.create(function(data) {
    var userdata = {
      user: data
    };
    console.log(user);
    for (x in user) {
      console.log(user);
    }
    console.log("It  Ran");
    res.json(user);
  });
});

module.exports = router;
