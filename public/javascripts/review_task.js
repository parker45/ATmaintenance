$(document).ready(function() {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyCavNWccud6WHP9hFNR3pWYPjjZ1_oBwqA';
    document.getElementsByTagName('head')[0].appendChild(js_file);
})

var map;
var marker;
function initMap() {
    // The location of AT
    var location = loc.substring(1, loc.length - 1).split(", ");
    var mark = {lat: parseFloat(location[0]), lng: parseFloat(location[1])}
    map = new google.maps.Map(document.getElementById('map'), {zoom: 15, center: mark});
    marker = new google.maps.Marker({position: mark, map: map});
}