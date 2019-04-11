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

function searchTasks() {
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('search');
  filter = input.value.toUpperCase();
  ul = document.getElementById("task_list");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    title = li[i].getElementsByClassName("card_title")[0];
    txtValueTitle = title.textContent || title.innerText;

    description = li[i].getElementsByClassName("card_description")[0];
    txtValueDescription = description.textContent || description.innerText;

    date = li[i].getElementsByClassName("card_date")[0];
    txtValueDate = date.textContent || date.innerText;

    trip = li[i].getElementsByClassName("card_trip")[0];
    txtValueTrip = trip.textContent || trip.innerText;

    loc = li[i].getElementsByClassName("card_location")[0];
    txtValueLocation = loc.textContent || loc.innerText;

    if (txtValueTitle.toUpperCase().indexOf(filter) > -1 
      || txtValueDescription.toUpperCase().indexOf(filter) > -1 
      || txtValueDate.toUpperCase().indexOf(filter) > -1
      || txtValueTrip.toUpperCase().indexOf(filter) > -1
      || txtValueLocation.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

$(document).ready(function() {
  $('.card_item').hover(function(event) {
    if (event.type == "mouseenter") {
      for (i = 0; i < $(this)[0].getElementsByClassName('card_button').length; i++) {
        $(this)[0].getElementsByClassName('card_button')[i].style.display = "inline-block";
      }
      
    }
    else {
      for (i = 0; i < $(this)[0].getElementsByClassName('card_button').length; i++) {
        $(this)[0].getElementsByClassName('card_button')[i].style.display = "none";
      }
    }
  });

  $('.card_trip').each(function (index, value) {
    $('.card_trip')[index].innerHTML = $.date($('.card_trip')[index].innerHTML);
    if ($('.card_trip')[index].innerHTML == "No Due Date") {
      $('.card_trip')[index].innerHTML = "No Trip";
      $('.card_trip')[index].style["font-style"] = "italic";
    }
  });

  $('.card_date').each(function (index, value) {
    $('.card_date')[index].innerHTML = $.date($('.card_date')[index].innerHTML);
    if ($('.card_date')[index].innerHTML == "No Due Date") {
      $('.card_date')[index].style["font-style"] = "italic";
    }
  });

  $('.task_delete').click(function(){
    var id = $(this).attr('id');
    const url = window.location.origin + "/database/task/"+id+"/delete";
    const body = "";
    $.post(url, body, function(body,status) {
        window.location = window.location.origin + "/admin";
    });
  });

  $('.inbox_delete').click(function(){
    var id = $(this).attr('id');
    const url = window.location.origin + "/database/task/"+id+"/delete";
    const body = "";
    $.post(url, body, function(body,status) {
        window.location = window.location.origin + "/admin";
    });
  });
});