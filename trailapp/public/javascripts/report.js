var selected;
$('document').ready(function(){
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyCavNWccud6WHP9hFNR3pWYPjjZ1_oBwqA';
    document.getElementsByTagName('head')[0].appendChild(js_file);
    
    $(".mdl-button.mdl-button--colored.mdl-js-button.mdl-js-ripple-effect").click(function(){
        selected = $(this).parent().siblings()[0].id
        $("#"+selected).toggleClass("selected");
        console.log(localStorage.getItem("location"));
    });

    $("#submit-btn").click(function(){
        const body = buildBody(localStorage.getItem("location"), selected, "");
        const url = window.location.origin + "/database/task/create"
        $.post(url,body, function(body,status){
            $('body').replaceWith(body)
        });
        console.log("helo")
    })

})
var map;
var marker;
function initMap() {
    // The location of AT
    var AT = {lat:37.375814, lng:-80.757701};
    // The map, centered at the Trail
    if(window.location.pathname === "/report"){
        map = new google.maps.Map(
            document.getElementById('map'), {zoom: 15, center: AT});
        marker = new google.maps.Marker();
        map.addListener('click', function(e){
            placeMarkerAndPanTo(e.latLng, map, marker);
        });
        
    }  
}

function placeMarkerAndPanTo(latLng, map, marker) {
    marker.setMap(map);
    marker.setPosition(latLng);
    map.panTo(latLng);
    localStorage.setItem("location", latLng.toString());

}

function buildBody(position, id, description) {
    body = {};
    body.location = position.split(",");
    body.creation_date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    body.due_date = null;
    body.title = "User Report";
    body.priority = "Low";
    body.image_urls = [];
    body.type = "Inbox";
    body.completed = false;
    body.trip_id = null;
    body.description = description;
    switch(id){
        case "tree":
            body.description = "Tree Blowdown on the trail "+body.description;
            break;
        case "shelter" :
            body.description = "The shelter is in need of Maintenance "+body.description;
            break;
        case "garbage" :
            body.description = "There is a garabage issue on the trail " + body.description;
            break;
        case "trail" :
            body.description = "The trail is in need of maintenance " + body.description;
            break;
        case "blaze" :
            body.description = "The blazes on the trail are faded or not visible " + body.description;
            break
        case "other" :
            break;
        default:
            break;
    }
    return body;
}



