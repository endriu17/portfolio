require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();

app.use(express.static(path.join(__dirname, '/')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/load', (req, res) => {
  let lang = process.env.LANGUAGE;

  const now = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  const output = `
  <p>Your site was visited</p>
  <p>Date: ${now} language: ${lang} hostname: ${os.hostname()} System: ${os.platform()} </p>
  <p>Browser ${req.headers['user-agent']}</p>
`;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: process.env.MY_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_USER,
      pass: process.env.MY_PASSWORD
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: `"Portfolio Contact" <${process.env.MY_USER}>`, // sender address
    cc: process.env.MY_USER, // list of receivers
    subject: 'Visit site request',
    text: 'Your message was send',
    html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info);
  });
});

let message = false;
app.post('/contact', (req, res) => {
  console.log(req.body.email);
  res.status(404);
  const now = new Date()
    .toISOString()
    .replace(/T/, ' ')
    .replace(/\..+/, '');
  const output = `
    <p>Your contact request to Andrzej Olaszewski</p>
    <h3>Message Details</h3>
    <div>  
      <h4>Name: ${req.body.name}</h4>
      <h4>Email: ${req.body.email}</h4>
    </div>
    <h3>Message</h3>
    <p>${req.body.message}</p>
    <br>
    <p>Date ${now}</p>
    <p>Thank you and I will try to get in touch with you as soon as possible</p>
  `;

  let transporter = nodemailer.createTransport({
    host: process.env.MY_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.MY_USER,
      pass: process.env.MY_PASSWORD
    }
  });

  let mailOptions = {
    from: `"Portfolio Contact" <${process.env.MY_USER}>`,
    to: req.body.email,
    cc: process.env.MY_USER,
    subject: 'Contact Request',
    text: 'Your message was send',
    html: output
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    message = true;
    res.redirect('/#contact');
  });
});

app.use('/message', (req, res) => {
  if (!message) {
    res.status(404);
  } else {
    res.status(200);
    res.send({ message: message });
  }
  message = false;
});

app.listen(3005, () => console.log('Server started on port 3005...'));
