$(document).ready(function() {

  $("#button").on("click", function() {
    event.preventDefault();
    var email = $("#email")
      .val()
      .trim();
    var password = $("#password")
      .val()
      .trim();
    console.log(email);
    console.log(password);
// Is this where the login happends
    $.ajax("/api/users/" + email, {
      type: "GET",
      data: newDevouredState
    }).then(function() {
      console.log("changed to devoured", newDevoured);
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
