var firebase = require("firebase");
var admin = require("firebase-admin");

var email = process.argv[2];
//var password = process.argv[3];
var uid = email;

$(document).ready(() => {

    var serviceAccount = require('/Users/randyporter/Desktop/project2auth-firebase-adminsdk-4pw6k-a4f4e8e280.json');

    firebase.initializeApp(config);

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });

    $('#login').click(function () {
        admin.auth().createCustomToken(uid)
            .then(function (customToken) {
                // Send token back to client
                firebase.auth().signInWithCustomToken(customToken).catch(function (error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                    console.log('LOGGED IN');
                    console.log(customToken);
                });

                firebase.auth().signOut().then(function () {
                    // Sign-out successful.
                }).catch(function (error) {
                    console.log("Error creating custom token:", error);
                });
            });
    });
});
