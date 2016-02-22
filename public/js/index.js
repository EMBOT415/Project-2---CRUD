console.log('cactus');

window.onload = function() {





$(".wrap > div:gt(0)").hide();

setInterval(function() { 
  $('.wrap > div:first')
    .fadeOut(7000)
    .next()
    .fadeIn(7000)
    .end()
    .appendTo('.wrap');
},  7000);











}