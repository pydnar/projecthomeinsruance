$(".register-form").on("submit", function(event) {
  // Make sure to preventDefault on a submit event.
  event.preventDefault();

  var newUser = {
    id_email: $("#idgoeshere").val().trim(),
    firstname: $("[name=sleepy]:checked").val().trim(),
    lastname:  $("#idgoeshere").val().trim(),
    phone:  $("#idgoeshere").val().trim(),
    address:  $("#idgoeshere").val().trim(),
    isagent: 1,
    userpassword: $("#idgoeshere").val().trim(),
    useractive: 0

  };

  // Send the POST request.
  $.ajax("/api/newuser", {
    type: "POST",
    data: newUser
  }).then(function() {
    console.log("created new user");
    $( "#assets" ).show();
    location.reload();
  });
});
