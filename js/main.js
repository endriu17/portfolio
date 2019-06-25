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
  const p = window.fetch('http://localhost:3005/load');
  p.then(response => {
    console.info('ok');
  });
  console.log(
    'Web page fully Loaded'
  );
});

const message = document.getElementById('email-message');
const ec = window.fetch('http://localhost:3005/message');

function checkMessages() {
  ec.then(res => {
    console.log(res.status);
    res.status === 200
      ? (message.innerHTML = 'Message sent!')
      : (message.innerHTML = '');
  });
  setTimeout(()=>{
    message.innerHTML = '';
  }, 5000)
}

checkMessages();
