$('.sidenav .nav-link').on('click', function() {
  $('.sidenav')
    .find('.active')
    .removeClass('active');
  $(this).addClass('active');
});

$('.nav-tabs .nav-item').on('click', function() {
  $('.nav')
    .find('.active')
    .removeClass('active');
  $(this).addClass('active');
});

window.addEventListener('load', function(event) {
  const p = window.fetch('http://localhost:3005/email');
  p.then(response => {
    console.info('got a response', response);
  });
  console.log(
    'Web page fully Loaded. HTML, Javascript, CSS, Images, Iframes and objects are fully loaded.'
  );
});
