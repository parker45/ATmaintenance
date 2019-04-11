$.date = function() {
    var d = new Date();
    var day = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    if (day < 10) {
        day = "0" + day;
    }
    if (month < 10) {
        month = "0" + month;
    }
    var date = year + "-" + month + "-" + day;

    return date;
};

$(document).ready(function(){

  $('#due_date').val($.date);

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