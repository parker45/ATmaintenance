window.onload = function(){
    $('.dates').each(function(index,value){
        formatted = new Date(value.innerHTML)
        value.innerHTML= formatted.toISOString().substr(0, 10)
    });
}