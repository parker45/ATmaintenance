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