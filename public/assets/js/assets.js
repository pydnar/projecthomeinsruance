$("#assets").css("display", "block");
function addsearchabledata(data) {
  for (var i = 0; i < data.Count; i++) {
    homeassetitems[data.itemname] = "";
  }

  $("input.autocomplete").autocomplete({
    data: homeassetitems,
    onAutocomplete: function(text) {
      view = text;

      $("#view").text(view);
    }
  });
  document.addEventListener("DOMContentLoaded", function() {
    var elems = document.querySelectorAll(".autocomplete");
    var instances = M.Autocomplete.init(elems, accountNames);
  });
}
