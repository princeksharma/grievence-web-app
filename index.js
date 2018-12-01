const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const keys = require('./config/keys');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

app.post('/api/form', (req,res) => {
  nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
     <h3>Submitted Report</h3>
     <ul>
       <li>Name: ${req.body.name}</li>
       <li>Email: ${req.body.email}</li>
       <li>Roll No.: ${req.body.number}</li>
       <li>Phone Number: ${req.body.phoneNumber}</li>
       <li>Department: ${req.body.department}</li>
       <li>Year: ${req.body.year}</li>
     </ul>
     <h3>Message: </h3>
     <p>${req.body.message}</p>
    `
    let transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: keys.euser,
        pass:keys.epass
      }
    });
    let mailOptions = {
      from: req.body.email,
      to: 'ezwdivwgoi53m4vu@ethereal.email',
      replyTo: req.body.email,
      subject: 'New Message',
      text: req.body.message,
      html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
      if(err) {
        return console.log(err);
      }

      console.log('Message Sent: %s', info.message);
      console.log('Message URL: %s', nodemailer.getTestMessageUrl(info));
    })
  })
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, ()=>{
  console.log(`Server listen on port ${PORT}`);
});
