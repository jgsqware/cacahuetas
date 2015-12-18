var express = require('express');
var nodemailer = require('nodemailer');
var Styliner = require('styliner');
var router = express.Router();

var styliner = new Styliner(__dirname + '/emails');
var giverHtml = require('fs').readFileSync(__dirname + '/emails/givers.html', 'utf8');
var receiverHtml = require('fs').readFileSync(__dirname + '/emails/receivers.html', 'utf8');

var giverEmail = "🎁 Cacahuetas for Givers 🎁 <givers@cacahuetas.be>";
var receiverEmail = "🎁 Cacahuetas for Receivers 🎁 <receivers@cacahuetas.be>";

function getMailOptions(_from,_to, _subject, _html) {
  return {
    from: _from,
    to: _to,
    subject: _subject,
    html: _html
  };
}

function sendCacahuetasEmail(cacahuetas) {

  styliner.processHTML(giverHtml)
    .then(function(processedSource) {
      processedSource = processedSource.replace("%giver-name%", cacahuetas.giver.name).replace("%receiver-name%", cacahuetas.receiver.name);
      sendMail(getMailOptions(giverEmail,cacahuetas.giver.email, "It's your time...", processedSource));
    });

  styliner.processHTML(receiverHtml)
    .then(function(processedSource) {
      processedSource = processedSource.replace("%receiver-name%", cacahuetas.receiver.name);
      sendMail(getMailOptions(receiverEmail,cacahuetas.receiver.email, "You will receive a present.", processedSource));
    });
}

function sendMail(mailOptions) {
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent');
  });
}

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});


router.post('/mail', function(req, res, next) {
  var cacahuetas = req.body;
  cacahuetas.forEach(function(cacahueta, index, array) {
    sendCacahuetasEmail(cacahueta);
  });
  res.end();
});

module.exports = router;
