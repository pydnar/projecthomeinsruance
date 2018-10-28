var orm = require("../config/orm.js");

var users = {
  all: function (cb) {
    orm.all("users", function (res) {
      cb(res);
    });
  },
}

var homeassets = {
  all: function (cb) {
    orm.all("homeassets", function (res) {
      cb(res);
    });
  }

};

module.exports = { users, homeassets };
