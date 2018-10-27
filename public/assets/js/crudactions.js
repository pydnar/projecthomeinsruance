// Make sure we wait to attach our handlers until the DOM is fully loaded.

$(document).ready(function() {
  $(".viewitems").on("click", function(event) {
    var id = $(this).data("id");
    alert(localStorage.getItem("userprofile"));
    $.ajax("/api/home/" + localStorage.getItem("userprofile"), {
      type: "GET"
    }).then(function(r) {
      console.log(r);
      alert(r);
      //location.reload();
    });
  });

  $("#cancel").on("click", function(event) {
    //clear Text boxes here
    $("#item").val("");
    $("#unit").val("");
    $("#qu").val("");
    $("#image").val("");
  });
  $("#done").on("click", function(event) {
 
    window.location.href = "/home/" + localStorage.getItem("userprofile");
  });

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
      id_email: localStorage.getItem("userprofile"),
      quantity: $("#qu")
        .val()
        .trim(),
      image: $("#image")
        .val()
        .trim(),
      totalcustvalue: totalunitvalue
    };

    // Send the POST request.
    // $("#item").val("");
    // $("#unit").val("");
    // $("#qu").val("");
    // $("#image").val("");
    $.ajax("/api/assetms", {
      type: "POST",
      data: newItem
    }).then(function() {
      // Reload the page to get the updated list
      location.reload();
    });
  });
});
