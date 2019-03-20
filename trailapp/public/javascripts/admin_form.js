$(document).ready(function(){

  $("#date")[0].value = new Date().toISOString().substr(0, 10);

  $("#priority").change(function() {
    var selected = $("#priority")[0].value;
    switch(selected) {
      case "easy":
        $("#priority")[0].style.background = "#61BD4F";
        $("#priority")[0].style.color = "#FFF";
        break;
      case "medium":
        $("#priority")[0].style.background = "#F2D600";
        $("#priority")[0].style.color = "#FFF";
        break;
      case "hard":
        $("#priority")[0].style.background = "#EB5A46";
        $("#priority")[0].style.color = "#FFF";
        break;
      case "epic":
        $("#priority")[0].style.background = "#C377E0";
        $("#priority")[0].style.color = "#FFF";
        break;
      default:
        $("#priority")[0].style.background = "";
        $("#priority")[0].style.color = "";
    }
  });
});