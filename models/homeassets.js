var orm = require("../config/orm.js");
console.log("HERE");
var homeassets = {
  all: function(cb) {
    orm.all("homeassets", function(res) {
      // console.log(res);
      cb(res);
    });
  }


};

// console.log("HERE");
module.exports = homeassets;
