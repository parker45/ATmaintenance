$.date = function(dateObject) {
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

$(document).ready(function(){
  $('.card_date').each(function (index, value) {
    $('.card_date')[index].innerHTML = $.date($('.card_date')[index].innerHTML);
  });
});