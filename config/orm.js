var connection = require("../config/connection.js");

function printQuestionMarksHelper(num) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr.push("?");
  }

  return arr.toString();
}

function convertObjectsToSQLSyntax(ob) {
  var arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (var key in ob) {
    var value = ob[key];
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      arr.push(key + "=" + value);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

var orm = {
  all: function(tablevalue, callback) {
    var queryString = "SELECT * FROM " + tablevalue + ";";
    var k = connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  selectWhere: function(tablevalue, colToSearch, valOfCol, callback) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    var k = connection.query(
      queryString,
      [tablevalue, colToSearch, valOfCol],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  selectOne: function(tablevalue, colToSearch, valOfCol, callback) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    var k = connection.query(
      queryString,
      [tablevalue, colToSearch, valOfCol],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  selectUser: function(tablevalue, colToSearch, valOfCol, callback) {
    var queryString = "SELECT * FROM ?? WHERE ?? = ?";
    var k = connection.query(
      queryString,
      [tablevalue, colToSearch, valOfCol],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  create: function(table, cols, vals, callback) {
    var queryString = "INSERT INTO " + table;
    console.log(`col:\n${cols}`);
    console.log(`val:\n${vals}`);
    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarksHelper(vals.length);
    queryString += ") ";

    console.log(`${queryString}`);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },

  update: function(table, objColVals, objVals, condition, callback) {
    console.log(`condition: ${condition}`);
    console.log(`table: ${table}`);
    console.log(`keys: ${objColVals}`);

    var makestring = "";
    for (var n = 0; n < objColVals.length; n++) {
      //makestring += objColVals[n] + "=" + objVals[n] + ",";
      if (objColVals.length - 1 !== n) {
        makestring += objColVals[n] + "='" + objVals[n] + "',";
      } else {
        makestring += objColVals[n] + "='" + objVals[n] + "'";
      }
    }

    console.log(makestring);

    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += makestring;
    queryString += " WHERE id=";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },

  delete: function(table, condition, callback) {
    var queryString = "DELETE FROM " + table;
    queryString += " WHERE ";
    queryString += condition;

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      callback(result);
    });
  },

  softDelete: function(table, objColVals, condition, callback) {
    console.log("We are vemon");
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objColVals+="=0";
    queryString += " WHERE id=";
    queryString += condition;

    console.log(queryString);
    console.log("Look up");

    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      callback(result);
    });
  },
  joinselect: function(
    table1col1,
    table2col1,
    table2col2,
    table2forightkey,
    table1primarykey,
    table1,
    table2,
    callback
  ) {
    var queryString =
      "SELECT ??.??, ??.??, ??.??, ??.?? FROM ?? JOIN ?? on ??.??=??.?? ORDER BY ??.??";
    var k = connection.query(
      queryString,
      [
        table2,
        table2col1,
        table2,
        table2col2,
        table2,
        table2forightkey,
        table1,
        table1col1,
        table1,
        table2,
        table1,
        table1primarykey,
        table2,
        table2forightkey,
        table1,
        table1primarykey
      ],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  },

  joinselectOne: function(
    table1col1,
    table1col2,
    table1col3,
    table2col1,
    table2col2,
    table2forightkey,
    table1primarykey,
    table1,
    table2,
    condition,
    callback
  ) {
    var queryString =
      "SELECT ??.??, ??.??, ??.??, ??.??, ??.??, ??. ?? FROM ?? JOIN ?? on ??.??=??.?? WHERE ??.??=?";
    var k = connection.query(
      queryString,
      [
        table2,
        table2col1,
        table2,
        table2col2,
        table2,
        table2forightkey,
        table1,
        table1col1,
        table1,
        table1col2,
        table1,
        table1col3,
        table1,
        table2,
        table1,
        table1primarykey,
        table2,
        table2forightkey,
        table1,
        table1primarykey,
        condition
      ],
      function(err, result) {
        if (err) {
          throw err;
        }
        callback(result);
      }
    );
  }
};

module.exports = orm;
