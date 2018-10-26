// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(function() {
  $(".delete").on("click", function(event) {
    var id = $(this).data("id");

    $.ajax("/api/assets/" + id + "/" + 0, {
      type: "PUT",
      value: 0
    }).then(function() {
      location.reload();
    });
  });

  $(".send").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();

    var totalunitvalue =
      parseFloat(
        $("#qu")
          .val()
          .trim()
      ) *
      parseFloat(
        $("#unit")
          .val()
          .trim()
      );
    var newItem = {
      itemname: $("#item")
        .val()
        .trim(),
      custunitvalue: $("#unit")
        .val()
        .trim(),
      id_email: id_email,
      quantity: $("#qu")
        .val()
        .trim(),
      image: $("#image")
        .val()
        .trim(),
      totalcustvalue: totalunitvalue
    };

    console.log(newItem);
    // Send the POST request.

    if (newItem.itemname !== "") {
      $.ajax("/api/assetms", {
        type: "POST",
        data: newItem
      }).then(function() {
        console.log(Object.keys(newItem).length);
        if (Object.keys(newItem).length !== 0) {
          window.location.href = "/users/" + newItem.id_email;
        } else {
          location.reload();
        }

        // Reload the page to get the updated list
      });
    }
  });
});
