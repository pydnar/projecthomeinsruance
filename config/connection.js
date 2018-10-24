var mysql = require("mysql");
var connection;
if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  connection = mysql.createConnection({
    host: "u28rhuskh0x5paau.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    user: "hjysvfuheirkkde1",
    password: "wrmohcvy9hb0mau7",
    database: "c9tbk1oei4eajy1s"
  });
}

connection.connect();
module.exports = connection;



// module.exports = config;

//  connection = mysql.createConnection({
//   host: "localhost",
//   port: 8889,
//   user: "root",
//   password: "root",
//   database: "burgers_db"
// });

// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// Export connection for our ORM to use.
