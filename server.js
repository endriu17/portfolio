require('dotenv').config();

const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = process.env.PORT || 3000;
const app = express();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/dist')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/main.js'));
});

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    secure: true,
    auth: {
      type: 'OAuth2',
      user: process.env.GMAIL_USER,
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      refreshToken: process.env.REFRESH_TOKEN,
      accessToken: process.env.ACCESS_TOKEN
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: process.env.GMAIL_USER,
    subject: `New message from contact form at Portfolio`,
    html: `<p style="font-size:16px;font-weight:bold">${req.body.name} &lt;${
      req.body.email
    }&gt; says:</p>
    <p style="font-size:16px">${req.body.message}</p>`
  };

  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log('error: ', error);
      // res.status(502).send('Bad Gateway');
      res.sendStatus(502);
    } else {
      console.log('response: ', response);
      // res.status(200).send('OK');
      res.sendStatus(200);
    }
  });
});

app.listen(PORT, () => console.log('running'));