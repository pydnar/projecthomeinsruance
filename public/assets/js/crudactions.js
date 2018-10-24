// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
  $(".delete").on("click", function(event) {
    console.log(event);
    var id = $(this).data("id");
    console.log(id);
    $.ajax("/api/assets/" + id + "/" + 0, {
      type: "PUT",
      value: 0
    }).then(function() {
      location.reload();
    });
  });

  $(".create").on("submit", function(event) {
    // Make sure to preventDefault on a submit event.
    event.preventDefault();
    
    var totalunitvalue = parseFloat( $("#qu").val().trim()) *  parseFloat($("#unit").val().trim());
  
    var newItem = {
      itemname: $("#item").val().trim(),
      unitvalue: $("#unit").val().trim(),
      email: $("#email").val().trim(),
      qu: $("#qu").val().trim(),
      image: $("#image").val().trim(),
      totalunitvalue: totalunitvalue 
    };
      alert(totalunitvalue);
      alert(newItem);
    // Send the POST request.
    $.ajax("/api/assets", {
      type: "POST",
      data: newItem
    }).then(function() {
      console.log("created new cat");
      // Reload the page to get the updated list
      location.reload();
    });
  });

//   $(".").on("click", function(event) {
//     var id = $(this).data("id");

//     // Send the DELETE request.
//     $.ajax("/api/cats/" + id, {
//       type: "DELETE"
//     }).then(function() {
//       console.log("deleted cat", id);
//       // Reload the page to get the updated list
//       location.reload();
//     });
//   });
});
