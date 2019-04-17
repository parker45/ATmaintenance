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

  $('#trip_date')[0].value = $("#trip_id option:selected").text();

  $('#trip_id').change(function() {
    $('#trip_date')[0].value = $("#trip_id option:selected").text();
  });

  $("input[type=file]").on("change", function(){
      var $files = $(this).get(0).files;
      console.log($files);
      // document.getElementById("uploadFile").value = $files[0].name;
      // if ($files.length) {
      //     var reader = new FileReader();

      //     reader.onload = function (e) {
      //         $('#userimg')
      //             .css({'display':'unset'})
      //             .attr('src', e.target.result)
      //             .width(150)
      //             .height(150);
      //     };

      //     reader.readAsDataURL($files[0]);
      // }
      
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
              $('#image_url')[0].value = imageUrl;
          });
      }
  });
});