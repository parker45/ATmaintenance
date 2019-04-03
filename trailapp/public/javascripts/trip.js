var formatted = new Date(date);
date = formatted.toDateString();
window.onload = function(){
    $('h3').html(date + " Work Trip")
    $('#date').val(formatted.toISOString().substr(0, 10))
}