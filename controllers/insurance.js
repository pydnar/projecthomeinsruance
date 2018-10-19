var express = require("express");

var router = express.Router();

var insurance = require("../models/insurance.js");

router.get("/", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    console.log(data);
    //console.log(insuranceObject);
    res.render("index", insuranceObject);
  });
});

router.get("/login", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    //   console.log(data)
    //   //console.log(insuranceObject);
    res.render("login", insuranceObject);
  });
});

router.post("/api/users", function(req, res) {
  console.log(` What are thoses ${req.body}`);
  //   burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
  // Send back the ID of the new quote
  //   });
  res.json({ id: result.insertId });
});

router.get("/api/users", function(req, res) {
  console.log(` What are thoses ${req.body}`);

  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };

    res.json(insuranceObject);
  });
});
router.get("/api/users/:email", function(req, res) {
  var chosen = req.params.email;
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    for (var i = 0; i < insuranceObject["users"].length; i++) {
      var pair = insuranceObject["users"][i];
      for (n in pair) {
        if (chosen== pair[n]) {
          console.log(insuranceObject["users"][i]);
            // insuranceObject["users"][i]
        }
      }
      // $.each(pair, function(key, value) {
      //   console.loq(key + ": " + value);
      // });
  
    }

    res.json(insuranceObject);
  });
});

router.get("/api/users", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    console.log;
    res.json(insuranceObject);
  });

  return res.json(insuranceObject);
});

// router.get("/api/users:email", function(req, res) {
//   var chosen = req.params.email;
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };

//     res.json(insuranceObject);
//   });
// });

// router.put("/api/insurance/:id", function(req, res) {
//   var condition = "id = " + req.params.id;

//   console.log("condition", condition);

//   insurance.update(
//     {
//       devoured: req.body
//     },
//     condition,
//     function(result) {
//       if (result.changedRows === 0) {
//         // User Doesn't exist in database
//         return res.status(404).end();
//       }
//       res.status(200).end();

//     }
//   );
// });

// Export routes for server.js to use.
module.exports = router;
