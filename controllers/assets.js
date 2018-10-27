var express = require("express");

var router = express.Router();

var assets = require("../models/assets_models.js");

router.get("/assetms", function(req, res) {
  res.render("assetms");
});

// router.get("/home", function(req, res) {
//      res.render("home", assets);
// });
router.get("/api/home/:email", function(req, res) {
  var email = req.params.email;
  console.log(email);
  assets.selectWhere(email, function(data) {
    var assets = {
      homeassets: data
    };

    res.render("home", assets);
  });
});

router.get("/home/:email", function(req, res) {
  console.log("Home controller");
  var email = req.params.email;
  assets.selectWhere(email ,function(data) {
    var assets = {
      homeassets: data
    };
    console.log(res);
    res.render("home", assets);
  });
});

router.put("/api/assetms", function(req, res) {
  assets.update([Object.keys(req.body)], [Object.values(req.body)], function(
    result
  ) {
    var assetdata = {
      assets: result
    };
    console.log(assetdata);
    res.render("/users/" + assetdata.id_email);
  });
});

router.post("/api/assetms", function(req, res) {
  console.log(Object.keys(req.body));
  assets.create([Object.keys(req.body)], [Object.values(req.body)], function(
    result
  ) {
    var assetdata = {
      assets: result
    };
    console.log(assetdata);
    res.render("/users/" + assetdata.id_email);
  });
});

router.get("/assets", function(req, res) {
  assets.all(function(data) {
    var assets = {
      homeassets: data
    };
    console.log(assets);

    res.render("assets", assets);
  });
});

router.get("/api/assets/", function(req, res) {
  //Change update value in table itemactive

  var id = req.params.id;
  console.log(id);
  assets.all(function(data) {
    var assets = {
      homeassets: data
    };
    console.log(assets);
    for (x in assets) {
      console.log(assets[x]);
    }
    console.log("It  Ran");
    res.json(assets);
  });
});

router.get("/api/assets/:id", function(req, res) {
  //Change update value in table itemactive

  var id = req.params.id;
  console.log(id);
  assets.all(function(data) {
    var assets = {
      homeassets: data
    };
    console.log(assets);
    for (x in assets) {
      console.log(assets[x]);
    }
    console.log("It  Ran");
    res.json(assets);
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

router.put("/api/assets/:id/:switch", function(req, res) {
  var condition = "id = " + req.params.id;
  var isactive = req.params.switch;
  console.log("condition", condition);
  assets.update(
    {
      itemactive: isactive
    },
    condition,
    function(result) {
      if (result.changedRows == 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      } else {
        res.status(200).end();
      }
    }
  );
});
router.get("/api/asset/:id", function(req, res) {
  var id = req.params.id;
  assets.selectOne(id, function(data) {
    console.log(data);
    var asset = {
      assets: data
    };
    console.log(asset);
    res.json(asset);
  });
});

router.get("/asset/:id", function(req, res) {
  var id = req.params.id;
  assets.selectOne(id, function(data) {
    console.log(data);
    var asset = {
      assets: data
    };
    console.log(asset);
    res.render("assetms", data[0]);
  });
});

router.post(
  "/api/assets/:itemName/:custunitvalue/:id_email/:quantity",
  function(req, res) {
    assets.create(Object.keys(req.params), Object.values(req.params), function(
      data
    ) {
      var assets = {
        homeassets: data
      };

      // itemname: req.params.itemName,
      // unitvalue: req.params.custunitvalue,
      // email: req.params.id_email,
      // quantity: req.params.quantity,
      console.log(assets);
      res.render("assets", assets);
    });
  }
);

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
