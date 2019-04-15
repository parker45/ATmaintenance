$(document).ready(function(){

  if (date) {
    var formatted = new Date(date);
    date = formatted.toDateString();
    $('#due_date').val(formatted.toISOString().substr(0, 10));
  } 

  // Fix for MDL date inputs
  if (!$('#due_date')[0].value) {
    $('#due_date')[0].style['color'] = "#FFF";
  }

  $('#due_date').focus(function() {
    $('#due_date')[0].style['color'] = "";
  });

  $('#due_date').blur(function() {
    if (!$('#due_date')[0].value) {
      $('#due_date')[0].style['color'] = "#FFF";
    }
  });

  var image_urls = images.split(",");

  for (i = 0; i < image_urls.length; i++) {
    if (!!image_urls[i]) {
      $(".image_card.mdl-card")[i].style.background = "url(" + image_urls[i] + ";) center / cover";
    }
  }

  switch($('#priority')[0].value) {
      case "1":
        $('#priority')[0].style.background = "#61BD4F";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "2":
        $('#priority')[0].style.background = "#F2D600";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "3":
        $('#priority')[0].style.background = "#EB5A46";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "4":
        $('#priority')[0].style.background = "#C377E0";
        $('#priority')[0].style.color = "#FFF";
        break;
      default:
        $('#priority')[0].style.background = "";
        $('#priority')[0].style.color = "";
  }

  $('#priority').change(function() {
    switch($('#priority')[0].value) {
      case "1":
        $('#priority')[0].style.background = "#61BD4F";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "2":
        $('#priority')[0].style.background = "#F2D600";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "3":
        $('#priority')[0].style.background = "#EB5A46";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "4":
        $('#priority')[0].style.background = "#C377E0";
        $('#priority')[0].style.color = "#FFF";
        break;
      default:
        $('#priority')[0].style.background = "";
        $('#priority')[0].style.color = "";
    }
  });
});