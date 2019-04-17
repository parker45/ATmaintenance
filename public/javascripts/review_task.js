$(document).ready(function() {
    var js_file = document.createElement('script');
    js_file.type = 'text/javascript';
    js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&signed_in=true&key=AIzaSyCavNWccud6WHP9hFNR3pWYPjjZ1_oBwqA';
    document.getElementsByTagName('head')[0].appendChild(js_file);

    // var image_urls = images.split(",");
    // console.log(image_urls);
    // var skipCounter = 0;
    // for (i = 0; i < image_urls.length; i++) {
    //   if (!!image_urls[i]) {
    //     $(".image_card.mdl-card")[i - skipCounter].style.background = "url(" + image_urls[i] + ";) center / cover";
    //   }
    //   else {
    //     skipCounter++;
    //   }
    // }

    // $('#trip_date')[0].value = $("#trip_id option:selected").text();

    // $('#trip_id').change(function() {
    //   $('#trip_date')[0].value = $("#trip_id option:selected").text();
    // });

    // $("input[type=file]").on("change", function(){
    //     var $files = $(this).get(0).files;
    //     console.log($files);
    //     // document.getElementById("uploadFile").value = $files[0].name;
    //     // if ($files.length) {
    //     //     var reader = new FileReader();

    //     //     reader.onload = function (e) {
    //     //         $('#userimg')
    //     //             .css({'display':'unset'})
    //     //             .attr('src', e.target.result)
    //     //             .width(150)
    //     //             .height(150);
    //     //     };

    //     //     reader.readAsDataURL($files[0]);
    //     // }
        
    //     if ($files.length) {

    //         // Reject big files
    //         if ($files[0].size > $(this).data("max-size") * 1024) {
    //             console.log("Please select a smaller file");
    //             return false;
    //         }

    //         // Begin file upload
    //         console.log("Uploading file to Imgur..");

    //         // Replace ctrlq with your own API key
    //         var apiUrl = 'https://api.imgur.com/3/image';
    //         var apiKey = '326f36253761cdb';

    //         var settings = {
    //             async: true,
    //             crossDomain: true,
    //             processData: false,
    //             contentType: false,
    //             type: 'POST',
    //             url: apiUrl,
    //             headers: {
    //             Authorization: 'Client-ID ' + apiKey,
    //             Accept: 'application/json'
    //             },
    //             mimeType: 'multipart/form-data'
    //         };

    //         var formData = new FormData();
    //         formData.append("image", $files[0]);
    //         settings.data = formData;

    //         // Response contains stringified JSON
    //         // Image URL available at response.data.link
    //         $.ajax(settings).done(function(response) {
    //             var parsed = JSON.parse(response)
    //             console.log(parsed.data.link);
    //             imageUrl = parsed.data.link;
    //             $('#image_url')[0].value = imageUrl;
    //         });
    //     }
    // });
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