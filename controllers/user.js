//create new user
var express = require("express");

var router = express.Router();

var user = require("../models/users.js");
router.get("/register", function(req, res) {
  res.render("register");
});

var user = require("../models/users.js");
router.post("/api/user", function(req, res) {
  user.create(
    [
      "id_email",
      "firstname",
      "lastname",
      "phone",
      "address",
      "isagent",
      "userpassword",
      "useractive"
    ],
    [
      "Test120duser.com",
      "test",
      "user",
      "1111111111",
      "12345 test street",
      1,
      "super secret",
      0
    ],
    function(result) {
      // Send back the ID of the new quote
      if (result.affectedRow !== 1) {
        res.json({ sendtoview: "Test120duser.com" });
      } else {
        res.json({ sendtoview: "Could not add user!" });
      }
    }
  );
});

//router.put("/api/user", function(req, res) {

//Change update value in table itemactive

//   user.create(function(data) {
//       var userdata = {
//       email: 'id_email@gmail.com',
//     };
//     // var userdata = {
//     //   user: data
//     // };
//     console.log(userdata);
//     // console.log(user);
//     // for (x in user) {
//     //   console.log(user);
//     // }
//     // console.log("It Ran");
//     res.json(user);
//   });
// });
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
