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

var config = {
  apiKey: "AIzaSyBa96oWMfmbWVq09zsFd90703oO_VSJtck",
  authDomain: "project2auth.firebaseapp.com",
  databaseURL: "https://project2auth.firebaseio.com",
  projectId: "project2auth",
  storageBucket: "project2auth.appspot.com",
  messagingSenderId: "784148365615"
};
