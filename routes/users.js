var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
  service: process.env.NODEMAILER_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});



/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/mail', function (req, res, next) {
  var cacahuetas = req.body;
  cacahuetas.forEach(function(element,index,array){
      console.log("giver: "+element.giver.name);
      console.log("receiver: "+element.receiver.name);
      
      var mailOptions = {
        from: 'Cacahuetas ✔ <gift@cacahuetas.be>', // sender address
        to: element.giver.email, // list of receivers
        subject: 'See your cacahuetas', // Subject line
        html: '<b>Hello '+element.giver.name+' ✔</b><br/>You will give a present to '+element.receiver.name+'.<br/> Shut! It\'s a secret' // html body
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent to giver: ' + info.response);
      });
      
      var mailOptions = {
        from: 'Cacahuetas ✔ <gift@cacahuetas.be>', // sender address
        to: element.receiver.email, // list of receivers
        subject: 'You will receive a present.', // Subject line
        html: '<b>Hello '+element.receiver.name+' ✔</b><br/>You will receive a present .<br/> Reply to this email with your wishlist.' // html body
      };
      
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          return console.log(error);
        }
        console.log('Message sent to giver: ' + info.response);
      });
  });
  res.end();
});

module.exports = router;
