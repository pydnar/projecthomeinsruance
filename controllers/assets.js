var express = require("express");

var router = express.Router();

var assets = require("../models/assets_models.js");

router.put("/api/update", function(req, res) {
  var transformlist = [];
  var val = [];
  console.log("Full picute");
  console.log(req.body);

  console.log("END Full picute");

  console.log("Length");

  console.log("END Values\n\n\n\n");
  console.log("Start map data");
  for (var index = 0; index < Object.values( req.body).length -1; index++) {
    console.log(Object.keys(req.body)[index]);
    // var temp = Object.keys(req.body)[index];
    // console.log(Object.keys(req.body)[index]);

    var temp = Object.keys(req.body)[index];
    var tmp = Object.values(req.body)[index];
    transformlist.push(temp);
    val.push(tmp);
  }
  console.log("End map data\n\n\n\n\n");
  assets.update(transformlist,val,[req.body.id],
    function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      } else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
    }
  );
});

router.get("/assetms", function(req, res) {
  res.render("assetms");
});

router.get("/edit/:id", function(req, res) {
  //Change update value in table itemactive

  var id = req.params.id;

  assets.selectOne([id], function(data) {
    var assets = {
      homeassets: data
    };

    res.render("edit", assets);
  });
});

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
  var email = req.params.email;
  assets.selectWhere(email, function(data) {
    var assets = {
      homeassets: data
    };

    res.render("home", assets);
  });
});

router.post("/api/assetms", function(req, res) {
  var email = Object.values(req.body);

  console.log(email[2]);

  assets.create([Object.keys(req.body)], [Object.values(req.body)], function(
    result
  ) {
    var assetdata = {
      assets: result
    };

    res.json("/home/" + email[2]);
  });
});

router.get("/assets", function(req, res) {
  assets.all(function(data) {
    var assets = {
      homeassets: data
    };

    res.render("assets", assets);
  });
});

router.get("/api/assets/:id", function(req, res) {
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

    res.json(assets);
  });
});

router.get("/api/assets/:id", function(req, res) {
  //Change update value in table itemactive

  var id = req.params.id;
  console.log(id);
  assets.selectWhere([id], function(data) {
    var assets = {
      homeassets: data
    };
    console.log(assets);
    for (x in assets) {
      console.log(assets[x]);
    }

    res.json(assets);
  });
});

router.get("/edit/:id", function(req, res) {
  //Change update value in table itemactive

  var id = req.params.id;
  console.log(id);
  assets.selectOne([id], function(data) {
    var assets = {
      homeassets: data
    };

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

    res.json(holduser);
  });
});

module.exports = router;
