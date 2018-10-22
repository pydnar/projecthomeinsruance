var express = require("express");

var router = express.Router();

var assets = require("../models/assets_models.js");

// router.get("/", function(req, res) {
//   res.render("index");
// });

// router.get("/users", function(req, res) {
//   users.selectWhere("admin@admin.com", function(data) {
//     var assets = {
//       users: data
//     };
    

//     res.render("users", assets);
//   });
// });

router.get("/assets", function(req, res) {
  assets.all(function(data) {
    var assets = {
      users: data
    };
    console.log(assets)

    
    // for (var i = 0; i < assets["assets"].length; i++) {
    //   var pair = assets["assets"][i];
    //   for (n in pair) {
    //     //if (email == pair["id_email"] && password === pair["userpassword"]) {
    //      // holduser.push(assets["users"][i]);
    //      //  break;
    //     //}
    //   }
    // } //Found user   

    res.render("assets", assets);
  });
});

router.get("/api/assets", function(req, res) {
  assets.all(function(data) {
    var assets = {
      users: data
    };
    console.log(assets)
    for (x in assets) {
      console.log(assets[x]);
    }
    // for (var i = 0; i < assets["assets"].length; i++) {
    //   var pair = assets["assets"][i];
    //   for (n in pair) {
    //     //if (email == pair["id_email"] && password === pair["userpassword"]) {
    //      // holduser.push(assets["users"][i]);
    //      //  break;
    //     //}
    //   }
    // } //Found user   

    res.json(assets["users"]);

  });
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

// router.get("/agent", function(req, res) {
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     // console.log(data);
//     //console.log(insuranceObject);
//     res.render("agent", insuranceObject);
//   });
// });

// router.get("/users", function(req, res) {
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };

//     res.render("users", insuranceObject);
//   });
// });
// router.get("/users/:email", function(req, res) {
//   var email = req.params.email;
//   var holduser = [];
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };

//     for (var i = 0; i < insuranceObject["users"].length; i++) {
//       var pair = insuranceObject["users"][i];
//       for (n in pair) {
//         if (email == pair[n]) {
//           // console.log("Where is randy??");
//           //console.log(insuranceObject["users"][i]);
//           holduser.push(insuranceObject["users"][i]);
//           break;
//         }
//       }
//     } //Found user
//     //Now find homeassets
//   });
//   insurance.homeassets.all(function(data) {
//     var assetsObject = {
//       homeassets: data
//     };
//     // console.log("All Assets in the table: " + assetsObject);
//     // console.log("All Assets in the table length: " + assetsObject["homeassets"].length);
//     for (var i = 0; i < assetsObject["homeassets"].length; i++) {
//       var pair = assetsObject["homeassets"][i];
//       // console.log(pair);
//       for (n in pair) {
//         if (email == pair[n]) {
//           // console.log("Where is randy and YY??");
//           holduser.push(pair);
//           break;
//         }
//       }
//     }
//     console.log("Start");
//     for (var i = 0; i < holduser.length; i++) {
//       console.log(holduser[i]);
//     }
//     console.log("End");
//     res.render("users", holduser);
//   });
// });

// router.post("/login", function(req, res) {
//   console.log(res);
//    console.log(req);
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     console.log("Start");
//     //console.log(insuranceObject);
//     console.log("END");
//     res.render("login", insuranceObject);
//   });
// });
// router.get("/login", function(req, res) {
//   console.log(res);
//    console.log(req);
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     console.log("Start");
//     //console.log(insuranceObject);
//     console.log("END");
//     res.render("login", insuranceObject);
//   });
// });

// router.get("/api/users", function(req, res) {
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     res.json(insuranceObject);
//   });
// });

// router.get("/api/users", function(req, res) {
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };
//     res.json(insuranceObject);
//   });
// });

// router.get("/api/agents", function(req, res) {
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
//             res.json(insuranceObject["users"][i]);
//           }
//         }
//         // console.log(typeof findAllAgent);
//       }
//     }
//   });
// });

// router.get("/agents", function(req, res) {
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
//             // This is just one agent.
//             // We need a list of agent or an object of agents
//             res.render(insuranceObject["users"][i]);
//           }
//         }
//         // console.log(typeof findAllAgent);
//       }
//     }
//   });
// });
// // router.get("/api/agents/:email", function(req, res) {
// //   insurance.users.all(function(data) {
// //     var insuranceObject = {
// //       users: data
// //     };
// //     for (var i = 0; i < insuranceObject["users"].length; i++) {
// //       var pair = insuranceObject["users"][i];
// //       for (n in pair) {
// //         var user = pair[n];
// //         if (n == "isagent") {
// //           if (user == "1") {
// //             res.json( insuranceObject["users"][i]);
// //           }
// //         }
// //         console.log(typeof findAllAgent);
// //       }
// //     }
// //   });
// // });

// router.get("/api/users/:email", function(req, res) {
//   var email = req.params.email;
//   insurance.users.all(function(data) {
//     var insuranceObject = {
//       users: data
//     };

//     for (var i = 0; i < insuranceObject["users"].length; i++) {
//       var pair = insuranceObject["users"][i];
//       for (n in pair) {
//         if (email == pair[n]) {
//           //  console.log("View one user:");
//           res.json(insuranceObject["users"][i]);
//         }
//       }
//     }
//   });
// });

module.exports = router;
