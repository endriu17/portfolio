const nodemailer = require("nodemailer");
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// app.set("port", 5000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

var server = app.listen(5000, 'localhost', function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('aplikacja nasłuchuje na http://' + host + ':' + port);
});

app.post("/send", (req, res) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aolaszewski@gmail.com",
      pass: ''
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from: req.body.name + " &lt;" + req.body.email + "&gt;",
    to: "anolaszewski@outlook.com",
    subject: "Sending Email using Node.js",
    html: `<p>${req.body.name} ${req.body.surname}</p>
          <p>(${req.body.email})</p>  
          <h2>Message:</h2>
          <p>${req.body.message}</p>`
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, response) => {
    if (error) {
      console.log("error: ", error);

      res.status(502).send(error);
    }
    console.log("response: ", response);
    res.status(200).send(response);
  });
  res.redirect("http://localhost:3000/#contact");
});