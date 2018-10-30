// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(document).ready(function () {
  $(".viewitems").on("click", function (event) {
    var id = $(this).data("id");
    alert(localStorage.getItem("userprofile"));

    $.ajax("/api/home/" + localStorage.getItem("userprofile"), {
      type: "GET"
    }).then(function (r) {
      console.log(r);
      alert(r);
      //location.reload();
    });
  });

  $("#cancel").on("click", function (event) {
    //clear Text boxes here
    $("#item").val("");
    $("#unit").val("");
    $("#qu").val("");
    $("#image").val("");
    window.location.href = "/home/" + localStorage.getItem("userprofile");
  });
  $("#done").on("click", function (event) {
    window.location.href = "/home/" + localStorage.getItem("userprofile");
  });

  $(".delete").on("click", function (event) {
    event.preventDefault();

    var id = $(this).data("id");

    $.ajax("/api/remove/" + id + "/" + 0, {
      type: "PUT",
      value: 0
    }).then(function () {
      location.reload();
    });
  });

  $(".send").on("submit", function (event) {
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
    }).then(function () {
      // Reload the page to get the updated list
      location.reload();
    });
  });

  $(".quote-asset").on("submit", function (event) {
    event.preventDefault();
    // var item = $("#quoteitembyName").val().trim();
    // console.log(item);
    var row = $("ITEM");
    var cells = $("td");
    var quoteItem = cells[0].innerText.split(" ").join("+");
    alert(quoteItem);

    //Now make api call to prosperent API and populate the spanid field.
    $.ajax("https://api.prosperent.com/api/search?api_key=c0fb9b207a0c050b8ce13200035e473e", {
      type: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      data: {
        query: quoteItem
      }
    }).then(function (response) {
      console.log('response is : ' + response.data);
      // .then(function() {
      //   // Reload the page to get the updated list
      //   alert("Quote Ran");
      // });
    });
  });

  $(".update-asset").on("submit", function (event) {
    // Make sure to preventDefault on a submit event.

    event.preventDefault();
    var id = $(this).data("id");

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
      quantity: $("#qu")
        .val()
        .trim(),
      // image: $("#image")
      //   .val()
      //   .trim(),
      totalcustvalue: totalunitvalue,
      id: $(this).data("id")
    };
    console.log(newItem);
    $.ajax("/api/update/", {
      type: "PUT",
      data: newItem
    }).then(function () {
      // Reload the page to get the updated list
    });
    window.location.href = "/home/" + localStorage.getItem("userprofile");
  });
});
