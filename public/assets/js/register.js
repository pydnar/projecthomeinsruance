// Make sure we wait to attach our handlers until the DOM is fully loaded.
// Why doens't this work
$(document).ready(function() {
  $("#registerbtn").on("click", function(event) {
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
      userpassword: $("#password1")
        .val()
        .trim(),
      useractive: 0
    };

    $("#currentuser").text(newUser.firstname);
    $.ajax("/api/newuser", {
      type: "POST",
      data: newUser
    }).then(function(res) {
      f =
        "/users/" +
        $("#email")
          .val()
          .trim();

      console.log(newUser.firstname);
     
       window.location.href = f;
      //location.reload();
    });
  });
});
