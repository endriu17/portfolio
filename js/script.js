$(".sidenav .nav-link").on("click", function() {
  $(".sidenav")
    .find(".active")
    .removeClass("active");
  $(this).addClass("active");
});

$(".nav-tabs .nav-item").on("click", function() {
  $(".nav")
    .find(".active")
    .removeClass("active");
  $(this).addClass("active");
});
