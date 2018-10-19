//  JS

// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
   
  $(".change-devour").on("click", function(event) {
    console.log("View");
    var id = $(this).data("id");
    var newDevoured = $(this).data("newdevoured");

    var newDevouredState = {
      devoured: newDevoured
    };

    // Send the PUT request.
    $.ajax("/api/insurance/" + id, {
      type: "PUT",
      data: newDevouredState
    }).then(
      function() {
        console.log("changed to devoured", newDevoured);
        // Reload the page to get the updated list
        location.reload();
      }
    );
  });


});
