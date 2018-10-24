// Require dotenv package.
require('dotenv').config();

$(document).ready(() => {

    // Grab data from user form
    var email = $('#email').value.trim;
    console.log(email);
    var password = $('#password').value.trim;
    console.log(password);

    var values = {
        email,
        password
    };
    // Config for Firebase App
    var firebaseConfig = {
        apiKey: process.env.FIREBASE_APIKEY,
        authDomain: "project2auth.firebaseapp.com",
        databaseURL: "https://project2auth.firebaseio.com",
        projectId: "project2auth",
        storageBucket: "project2auth.appspot.com",
        messagingSenderId: "784148365615"
    };

    firebase.initializeApp(firebaseConfig);


    $('#login').click(function () {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            alert('Signin Success');
            var user = firebase.auth().currentUser();
            USER = {
                // Confirm if this is the write parameter to pull back.
                name: user.firstName,
                email: user.email,
                address: user.address,
                emailVerified: user.emailVerified,
                uid: user.uid,
            };

            $.ajax("/login/" + email + "/" + password, {
      method: "POST",
      async: false,

      data: values
      //Init values are coming from the login
    }).then(function(res) {
      userandassets = res;

      var x = document.getElementById("form_data");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
      var x = document.getElementById("loggingID");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }
      var x = document.getElementById("userID");
      if (x.style.display === "none") {
        x.style.display = "block";
      } else {
        x.style.display = "none";
      }

      console.log(userandassets);
      for (n in userandassets) {
        f = "/users/" + userandassets[n]["id_email"];
      }
      window.location.href = f;

        }).catch(function (error) {
            var errorC = error.code;
            var errorM = error.message;
            console.log(errorC, errorM);
        })
    })

    $('#signout').click(function () {
        auth.signOut().then(function () {
            console.log("Signout Success for user =>" + USER.email);
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