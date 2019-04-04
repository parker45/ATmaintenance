$(document).ready(function(){

  var formatted = new Date(date);
  date = formatted.toDateString();
  $('#due_date').val(formatted.toISOString().substr(0, 10))

  switch($('#priority')[0].value) {
      case "Low":
        $('#priority')[0].style.background = "#61BD4F";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Medium":
        $('#priority')[0].style.background = "#F2D600";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Urgent":
        $('#priority')[0].style.background = "#EB5A46";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Emergency":
        $('#priority')[0].style.background = "#C377E0";
        $('#priority')[0].style.color = "#FFF";
        break;
      default:
        $('#priority')[0].style.background = "";
        $('#priority')[0].style.color = "";
    }

  $('#priority').change(function() {
    switch($('#priority')[0].value) {
      case "Low":
        $('#priority')[0].style.background = "#61BD4F";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Medium":
        $('#priority')[0].style.background = "#F2D600";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Urgent":
        $('#priority')[0].style.background = "#EB5A46";
        $('#priority')[0].style.color = "#FFF";
        break;
      case "Emergency":
        $('#priority')[0].style.background = "#C377E0";
        $('#priority')[0].style.color = "#FFF";
        break;
      default:
        $('#priority')[0].style.background = "";
        $('#priority')[0].style.color = "";
    }
  });
});