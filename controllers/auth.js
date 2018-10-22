var firebase = require("firebase");
var admin = require("firebase-admin");
var config = require("../config/connection.js");
var serviceAcct = require("../config/project2auth.json");
var orm = require("../config/orm.js");

// Leaving in case anyone wants to test this method from CLI using Node.
// var email = process.argv[2];
// var password = process.argv[3];

$(document).ready(() => {

    var serviceAccount = serviceAcct;

    firebase.initializeApp(config);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    $('#login').click(function () {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            console.log('Signin Success');
        }).catch(function (error) {
            var errorC = error.code;
            var errorM = error.message;
            console.log(errorM, errorC);
        });

        $('#logout').click(function () {
            firebase.auth().signOut().then(function () {
                console.log('Signout Success');
                //Sign-out Success
            }).catch(function (error) {
                var errorC = error.code;
                var errorM = error.message;
                console.log(errorC, errorM);
            })
        })

        $('#signup').click(function () {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
                admin.auth().createCustomToken(email).then(function (customToken) {
                    // Send token back to client
                    firebase.auth().signInWithCustomToken(customToken).catch(function (error) {
                        console.log('LOGGED IN');
                        console.log(customToken);
                        // Handle Errors here.
                        var errorC = error.code;
                        var errorM = error.message;
                        console.log(errorC, errorM);
                    }).catch(function (error) {
                        var errorC = error.code;
                        var errorM = error.message;
                        console.log(errorC, errorM);
                    });
                });
            });
        });
    });
});