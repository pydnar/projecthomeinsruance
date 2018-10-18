var express = require("express");

var router = express.Router();

var insurance = require("../models/insurance.js");

router.get("/", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    console.log(data)
    //console.log(insuranceObject);
    res.render("index", insuranceObject);
  });
});

router.post("/api/insurance", function(req, res) {
 console.log(` What are thoses ${req.body}`);
//   burger.create(["burger_name", "devoured"], [req.body.burger_name, req.body.devoured], function(result) {
    // Send back the ID of the new quote
//   });
 res.json({ id: result.insertId });
});

router.get("/api/users", function(req, res){
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    console.log
    res.json(insuranceObject);
  });
})
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
