var orm = require("../config/orm.js");

var insurance = {
  all: function(cb) {
    orm.all("users", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  // create: function(cols, vals, cb) {
  //   orm.create("insurance", cols, vals, function(res) {
  //     cb(res);
  //   });
  // },
  // update: function(objColVals, condition, cb) {
  //   orm.update("insurance", objColVals, condition, function(res) {
  //     cb(res);
  //   });
  // }
};

module.exports = insurance;
