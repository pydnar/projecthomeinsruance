$(document).ready(() => {
    var f = "";

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


    $('#submitLogin').click(function () {
        alert('Login func is running');
        // Grab data from user form
        event.preventDefault();
        var email = $('#email').val();
        console.log(email);
        var password = $('#password').val();
        console.log(password);

        var values = {
            email,
            password
        };
        //
        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            alert('Signin Success')
            $.ajax("/login/" + email + "/" + password, {
                method: "POST",
                async: false,

                data: values
                //Init values are coming from the login
            }).then(function (res) {
                userandassets = res;
                console.log(userandassets);
                for (n in userandassets) {
                    f = "/users/" + userandassets[n]["id_email"];
                }
                window.location.href = f;
            }); //End of ajax call
        }).catch(function (error) {
            var errorC = error.code;
            var errorM = error.message;
            console.log(errorC, errorM);
            $('#loginAlert').text('There is no user record corresponding to this');
        });

        $('#signout').click(function () {
            auth.signOut().then(function () {
                console.log("Signout Success for user =>" + USER.email);
            }).catch(function (error) {
                var errorC = error.code;
                var errorM = error.message;
                console.log(errorC, errorM);
            })
        })
        $('#signup').click(function () {// Make sure to preventDefault on a submit event.
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
                userpassword: $("#password1")
                    .val()
                    .trim(),
                useractive: 0
            };
            $.ajax("/api/newuser", {
                type: "POST",
                data: newUser
            }).then(function (res) {
                f =
                    "/users/" +
                    $("#email")
                        .val()
                        .trim();

                console.log(newUser.firstname);

                window.location.href = f;
                //location.reload();
            })
            firebase.auth().createUserWithEmailAndPassword(email, password).then(function () {
            });
        });
    });
});
