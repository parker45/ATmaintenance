var selected;
var selectedList= []
var imageUrl = '';
$('document').ready(function(){
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyCavNWccud6WHP9hFNR3pWYPjjZ1_oBwqA';
    document.getElementsByTagName('head')[0].appendChild(js_file);
    
    $(".demo-card-square.mdl-card.mdl-shadow--2dp").click(function(){
        selected = $(this).attr('id'); 
        selectedList.push(selected);
        $("#"+selected).toggleClass("selected");
    });

    $("#submit-btn").click(function(){
        const description = $('#description-input').val();
        console.log(description);
        const body = buildBody(localStorage.getItem("location"), selectedList, description, imageUrl);
        const url = window.location.origin + "/database/task/create"
        $.post(url,body, function(body,status){
            window.location = window.location.origin + "/report/submitted"           
        });
    });

    $("input[type=file]").on("change", function(){
        var $files = $(this).get(0).files;
        document.getElementById("uploadFile").value = $files[0].name;
        if ($files.length) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('#userimg')
                    .css({'display':'unset'})
                    .attr('src', e.target.result)
                    .width(150)
                    .height(150);
            };

            reader.readAsDataURL($files[0]);
        }
        
        if ($files.length) {

            // Reject big files
            if ($files[0].size > $(this).data("max-size") * 1024) {
                console.log("Please select a smaller file");
                return false;
            }

            // Begin file upload
            console.log("Uploading file to Imgur..");

            // Replace ctrlq with your own API key
            var apiUrl = 'https://api.imgur.com/3/image';
            var apiKey = '326f36253761cdb';

            var settings = {
                async: true,
                crossDomain: true,
                processData: false,
                contentType: false,
                type: 'POST',
                url: apiUrl,
                headers: {
                Authorization: 'Client-ID ' + apiKey,
                Accept: 'application/json'
                },
                mimeType: 'multipart/form-data'
            };

            var formData = new FormData();
            formData.append("image", $files[0]);
            settings.data = formData;

            // Response contains stringified JSON
            // Image URL available at response.data.link
            $.ajax(settings).done(function(response) {
                var parsed = JSON.parse(response)
                console.log(parsed.data.link);
                imageUrl = parsed.data.link;
            });

        }
    });

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

function buildBody(position, id_list, description, imageUrl) {
    body = {};
    body.location = position;
    body.creation_date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    body.due_date = null;
    body.title = "User Report";
    body.priority = '1';
    body.image_urls = imageUrl;
    body.type = "Inbox";
    body.completed = false;
    body.trip_id = null;
    body.description = description;
    id_list.forEach(element => {
        switch(element) {
            case "tree":
                body.description = "Tree Blowdown on the trail. "+body.description;
                break;
            case "shelter" :
                body.description = "The shelter is in need of Maintenance. "+body.description;
                break;
            case "garbage" :
                body.description = "There is a garabage issue on the trail. " + body.description;
                break;
            case "trail" :
                body.description = "The trail is in need of maintenance. " + body.description;
                break;
            case "blaze" :
                body.description = "The blazes on the trail are faded or not visible. " + body.description;
                break
            case "other" :
                body.description = "Other Trail Issue. "+ body.description;
                break;
            default:
                break;
        }
    });
    
    return body;
}



