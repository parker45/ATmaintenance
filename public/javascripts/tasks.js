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
  $('.card_date').each(function (index, value) {
    $('.card_date')[index].innerHTML = $.date($('.card_date')[index].innerHTML);
    if ($('.card_date')[index].innerHTML == "No Due Date") {
      $('.card_date')[index].innerHTML = "No Trip";
      $('.card_date')[index].style["font-style"] = "italic";
    }
  });

  $('.card_item').hover(function(event) {
    if (event.type == "mouseenter") {
      for (i = 0; i < $(this)[0].getElementsByClassName('task_button').length; i++) {
        $(this)[0].getElementsByClassName('task_button')[i].style.display = "inline-block";
      }

    }
    else {
      for (i = 0; i < $(this)[0].getElementsByClassName('task_button').length; i++) {
        $(this)[0].getElementsByClassName('task_button')[i].style.display = "none";
      }
    }
  });
});
