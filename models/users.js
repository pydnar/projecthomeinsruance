// Data 
var orm = require("../config/orm.js");

var users = {
  all: function(cb) {
    orm.all("users", function(res) {
      cb(res);
    });
  },
  create: function(cols, vals, cb) {
    orm.create("users", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  },
  selectWhere: function(useremail, cb) {
    orm.selectWhere("homeassets", "id_email", useremail, function(res) {
      cb(res);
    });
  },
  
    selectUser: function(useremail, cb) {
    orm.selectUser("users", "id_email", useremail, function(res) {
      cb(res);
    });
  },

  joinselectOne: function(condition, cb){
    orm. joinselectOne("itemname", "firstname", "lastname","id_email","id_email", "homeassets", "users", condition, function(res){
      cb(res);
    });
  },
};

module.exports = users;

