const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

//Welcome page...
router.get('/', (req, res) => res.render('first'));
//Contact
router.get('/contact', (req, res) => res.render('contact'));


    


router.get('/dashboard', (req, res) => {
    User.find((err, docs) => {
        if (err) {
            console.log('Errror in get data ');
        }
        else {
            // console.log(' here    ',docs)
            res.render('dashboard', { users: docs });
        }
    });
});
//Contact
router.post('/contact', (req, res) => {
    const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

 
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, 
    auth: {
        user: 'sarmadrauf@gmail.com', 
        pass: 'ustadabbas1122'  
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: '"Nodemailer Contact" <sarmadrauf@gmail.com>', 
      to: 'sarmadrauf1@gmail.com', 
      subject: 'Node Contact Request', 
      text: 'Hello world?', 
      html: output 
  };


  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('first');
  });
});


module.exports = router;
