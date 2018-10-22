// Data 
var orm = require("../config/orm.js");

var homeassets = {
  all: function(cb) {
    orm.all("homeassets", function(res) {
      cb(res);
    });
  },
  create: function(cols, vals, cb) {
    orm.create("homeassets", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("homeassets", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("homeassets", condition, function(res) {
      cb(res);
    });
  },
  selectWhere: function(useremail, cb) {
    orm.selectWhere("homeassets", "id_email", useremail, function(res) {
      cb(res);
    });
  },
  
    selectUser: function(useremail, cb) {
    orm.selectUser("homeassets", "id_email", useremail, function(res) {
      cb(res);
    });
  }
};

module.exports = homeassets;

