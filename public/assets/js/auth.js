$(document).ready(() => {
  var currentuser;

  // Config for Firebase App
  var firebaseConfig = {
    apiKey: "AIzaSyBa96oWMfmbWVq09zsFd90703oO_VSJtck",
    authDomain: "project2auth.firebaseapp.com",
    databaseURL: "https://project2auth.firebaseio.com",
    projectId: "project2auth",
    storageBucket: "project2auth.appspot.com",
    messagingSenderId: "784148365615"
  };

  firebase.initializeApp(firebaseConfig);

  $("#submitLogin").click(function() {
    // Grab data from user form
    event.preventDefault();
    var email = $("#email").val();
    console.log(email);
    var password = $("#password").val();
    console.log(password);

    var values = {
      email,
      password
    };
    //
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(function() {
        console.log("You are login in");

        var user = firebase.auth().currentUser;
        currentuser = {
          email: user.email,
          uid: user.uid
        };
        alert("Signed in as " + currentuser.email);
        localStorage.setItem("userprofile", currentuser.email);

        // document.getElementById("username").innerHTML = localStorage.getItem( "userprofile");

        // Store

        // Retrieve
        // document.getElementById("userprofile").innerHTML = localStorage.getItem("userprofile");
        $.ajax("/login/" + email + "/" + password, {
          method: "POST",
          async: false,

          data: values
          //Init values are coming from the login
        }).then(function(res) {
          //   userandassets = res;
          alert(document.URL);
          window.location.href = "/home";
        }); //End of ajax call
      })
      .catch(function(error) {
        var errorC = error.code;
        var errorM = error.message;
        console.log(errorC, errorM);
        $("#loginAlert").text("There is no user record corresponding to this");
      });
  });

  $("#submitSignout").click(function() {
    localStorage.removeItem("userprofile");
    $("username").val("");
    alert("Signed out was " + $("username").val());
    firebase
      .auth()
      .signOut()
      .then(function() {
        // alert("You have been logged out");

        window.location.href = "/";
      })
      .catch(function(error) {
        var errorC = error.code;
        var errorM = error.message;
        console.log(errorC, errorM);
      });
  });

  $("#submitSignup").click(function() {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    var newUser = {
      id_email: $("#email")
        .val()
        .trim(),
      firstname: $("#first")
        .val()
        .trim(),
      lastname: $("#last")
        .val()
        .trim(),
      phone: $("#phone")
        .val()
        .trim(),
      address: $("#address")
        .val()
        .trim(),
      isagent: 1,
      userpassword: $("#password")
        .val()
        .trim(),
      useractive: 0
    };
    $.ajax("/api/newuser", {
      type: "POST",
      data: newUser
    }).then(function(res) {
      f =
        "/users/" +
        $("#email")
          .val()
          .trim();

      // Create new user in firebase now.

      firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.id_email, newUser.userpassword)
        .then(function() {
          alert("new user created");
        });

      console.log(newUser.firstname);

      window.location.href = "/";
      //location.reload();
    });
  });
});
