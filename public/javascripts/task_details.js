$.date = function(dateObject) {

    if (!dateObject) {
      return "No Due Date"
    }

    var d = new Date(dateObject);
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = month + "/" + day + "/" + year;

    return date;
};

$(document).ready(function() {
  $('.date').each(function (index, value) {
    $('.date')[index].innerHTML = $.date($('.date')[index].innerHTML);
    if ($('.date')[index].innerHTML == "No Due Date") {
      $('.date')[index].innerHTML = "No Trip";
      $('.date')[index].style["font-style"] = "italic";
    }
  });

  var image_urls = images.split(",");
  var skipCounter = 0;
  for (i = 0; i < image_urls.length; i++) {
    if (!!image_urls[i]) {
      $(".image_card.mdl-card")[i - skipCounter].style.background = "url(" + image_urls[i] + ";) center / cover";
    }
    else {
      skipCounter++;
    }
  }

});
