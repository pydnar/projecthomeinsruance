$(document).ready(function() {
  var f = "";
  $("#button").on("click", function() {
    var userandassets = {};
    event.preventDefault();
    var email = $("#email")
      .val()
      .trim();
    var password = $("#password")
      .val()
      .trim();
    console.log(document.URL);

    // Is this where the login happends
    console.log(email);
    var values = {
      email,
      password
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
    }); //End of ajax call
  }); //End of button click
}); //End of document ready





  $(".create-form").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var newBurger = {
      burger_name: $("#bur").val().trim(),
      devoured: $("[name=devoured]:checked").val().trim()
    };
  
    // Send the POST request.
    $.ajax("/api/burgers", {
      type: "POST",
      data: newBurger
     
    }).then(
      function() {
        console.log("created new Burger");
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });
});
