$(document).ready(function() {
  $('.parallax').parallax();
});

function openNav() {
  $('#side-nav').css("transform", "translateX(0px)");
  $('#body').css("overflow","hidden");
}

function closeNav() {
  $('#side-nav').css("transform", "translateX(-100%)");
  $('#body').css("overflow","auto");
}