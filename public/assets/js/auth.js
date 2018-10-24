// var firebase = require("firebase");
// var admin = require("firebase-admin");
// var config = require("../../../config/connection.js");
// var serviceAcct = require("../config/project2auth.json");
// var orm = require("../../../config/orm.js");

// Leaving in case anyone wants to test this method from CLI using Node.
// var email = process.argv[2];
// var password = process.argv[3];

$(document).ready(() => {

    //adapted from login.js
    var f = "";

    var config = {
        apiKey: "AIzaSyBa96oWMfmbWVq09zsFd90703oO_VSJtck",
        authDomain: "project2auth.firebaseapp.com",
        databaseURL: "https://project2auth.firebaseio.com",
        projectId: "project2auth",
        storageBucket: "project2auth.appspot.com",
        messagingSenderId: "784148365615"
      };

      firebase.initializeApp(config);

    // Commenting this bc I need to come back and figure out the SDK bit for tokenization.  
    // var serviceAccount = serviceAcct;


    // admin.initializeApp({
    //     credential: admin.credential.cert(serviceAccount),
    // });

    $('#login').click(function () {
        firebase.auth().signInWithEmailAndPassword(email.value, password.value).then(function () {
            alert('Signin Success');
            alert(email.value);
            alert(password.value);
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