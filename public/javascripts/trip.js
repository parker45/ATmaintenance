var formatted = new Date(date);
window.onload = function(){
    $('h3').html(formatted.toISOString().substr(0, 10) + " Work Trip")
    $('#date').val(formatted.toISOString().substr(0, 10))
}