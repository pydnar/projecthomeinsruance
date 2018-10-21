var express = require("express");

var router = express.Router();

var insurance = require("../models/insurance.js");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/agent", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    console.log(data);
    //console.log(insuranceObject);
    res.render("agent", insuranceObject);
  });
});

router.get("/login", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    res.render("login", insuranceObject);
  });
});

router.get("/api/users", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    res.json(insuranceObject);
  });
});

router.get("/api/users", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    res.json(insuranceObject);
  });
});

router.get("/api/agents", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    for (var i = 0; i < insuranceObject["users"].length; i++) {
      var pair = insuranceObject["users"][i];
      for (n in pair) {
        var user = pair[n];
        if (n == "isagent") {
          if (user == "1") {
            res.json( insuranceObject["users"][i]);
          }
        }
        console.log(typeof findAllAgent);
      }
    }    
  });
});

router.get("/agents", function(req, res) {
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };
    for (var i = 0; i < insuranceObject["users"].length; i++) {
      var pair = insuranceObject["users"][i];
      for (n in pair) {
        var user = pair[n];
        if (n == "isagent") {
          if (user == "1") {
            // This is just one agent.
            // We need a list of agent or an object of agents
            res.render(insuranceObject["users"][i]);
          }
        }
        console.log(typeof findAllAgent);
      }
    }    
  });
});
// router.get("/api/agents/:email", function(req, res) {
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     for (var i = 0; i < insuranceObject["users"].length; i++) {
//       var pair = insuranceObject["users"][i];
//       for (n in pair) {
//         var user = pair[n];
//         if (n == "isagent") {
//           if (user == "1") {
//             res.json( insuranceObject["users"][i]);
//           }
//         }
//         console.log(typeof findAllAgent);
//       }
//     }    
//   });
// });

router.get("/api/users/:email", function(req, res) {
  var email = req.params.email;
  insurance.users.all(function(data) {
    var insuranceObject = {
      users: data
    };

    for (var i = 0; i < insuranceObject["users"].length; i++) {
      var pair = insuranceObject["users"][i];
      for (n in pair) {
        if (email == pair[n]) {
          console.log("View one user:");
          res.json(insuranceObject["users"][i]);
        }
      }
    }
  });
});

module.exports = router;
