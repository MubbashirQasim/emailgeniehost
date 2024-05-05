import express from 'express';
// import EmailBank from '../models/EmailBank.js';
import multer from 'multer';
import nodemailer from 'nodemailer'
// import { signUpUser , loginUser } from '../controller/login.js';
// // import SendingEmails from '../models/SendingEmails';
// // import { sendEmail } from '../utils/mail.js';
// // import { sendEmail } from '../utils/mail';
// // sendEmail

const router = express.Router();
// router.post('/signUp', signUpUser)
// router.post('/login', loginUser)

// router.post('/check', (req, res)=>{
//     console.log(req.body)
//     res.json('working')
// })
// const upload = multer({ dest: 'uploads/' });

// router.post('/upload', upload.single('file'), async (req, res) => {
//     // File is available as req.file
//     var file = await req.file
//     console.log(req.file)
//     const emails =  extractEmailsFromFile(file);
//       console.log(emails)
//     res.send('File uploaded successfully');

// });

//  router.post('/upload-emails', async  (req, res) => {
//     console.log(req.body)
//     res.json('uploading')
//     // var email = await EmailBank.insertMany(req.body)
//     // res.json(email)    
//     // console.log(res )


// //   EmailBank.insertMany(emails, (err) => {
// //     if (err) {
// //       res.status(500).send({ message: 'Error uploading emails' });
// //     } else {
// //       res.send({ message: 'Emails uploaded successfully' });
// //     }
// //   });
// });

// router.post('/upload-sending-emails', (req, res) => {
//   const file = req.body.file;
//   const emails = extractEmailsFromFile(file);
//   SendingEmails.insertMany(emails, (err) => {
//     if (err) {
//       res.status(500).send({ message: 'Error uploading sending emails' });
//     } else {
//       res.send({ message: 'Sending emails uploaded successfully' });
//     }
//   });
// });

// router.post('/send-emails', async (req, res) => {
//   try {
//     const emailBankEmail = await getEmailFromEmailBank();
//     const sendingEmails = await getSendingEmails();
//     await sendEmails(emailBankEmail, sendingEmails);
//     res.send({ message: 'Emails sent successfully' });
//   } catch (err) {
//     res.status(500).send({ message: 'Error sending emails' });
//   }
// });

// function extractEmailsFromFile(file) {

//   const emails = [];
//   const fileReader = new FileReader();
//   fileReader.onload = (event) => {
//     const fileContent = event.target.result;
//     const lines = fileContent.split('\n');
//     lines.forEach((line) => {
//       const email = line.trim();
//       if (email) {
//         emails.push(email);
//       }
//     });
//   };
//   fileReader.readAsText(file);
//   return emails;
// }

// async function getEmailFromEmailBank() {
//   const emailBankEmail = await EmailBank.findOne();
//   return emailBankEmail.email;
// }

// async function getSendingEmails() {
//   const sendingEmails = await SendingEmails.find();
//   return sendingEmails.map((email) => email.email);
// }

// async function sendEmails(emailBankEmail, sendingEmails) {
//   const subject = 'Test Email';
//   const body = 'This is a test email';
//   const from = 'your_email@example.com';
//   const to = sendingEmails.slice(0, 50); // Send to the first 50 emails
//   try {
//     const result = await sendEmail(subject, body, from, to);
//     console.log(`Email sent to ${to.join(', ')}`);
//     // Remove the sent emails from the sendingEmails collection
//     await SendingEmails.deleteMany({ email: { $in: to } });
//   } catch (err) {
//     console.error(`Error sending email: ${err}`);
//   }
// }

// export default router;


// // const express = require('express');
// const router = express.Router();
// // const nodemailer = require('nodemailer');

// router.post('/send-email', async (req, res) => {
//   const { from, to, body, subject, replyTo } = req.body;

//   // Create a Nodemailer transporter
//   let transporter = nodemailer.createTransport({
//     service: 'Gmail',
//     auth: {
//       user: 'your-email@gmail.com', // Your Gmail email address
//       pass: 'your-password' // Your Gmail password
//     }
//   });

//   // Construct email options
//   let mailOptions = {
//     from: `${from.senderName} <${from.email}>`,
//     to: to.email,
//     subject: subject,
//     text: body,
//     replyTo: replyTo
//   };

//   try {
//     // Send email
//     let info = await transporter.sendMail(mailOptions);
//     console.log('Email sent: ' + info.response);
//     res.status(200).send('Email sent successfully');
//   } catch (error) {
//     console.error('Error sending email:', error);
//     res.status(500).send('Error sending email');
//   }
// });




// const express = require('express');
// const nodemailer = require('nodemailer');
// const csv = require('csv-parser');
// const fs = require('fs');
import fs from 'fs'
import csv from 'csv-parser'
import Mailgen from 'mailgen';
import { send } from 'process';

const app = express();
// const PORT = process.env.PORT || 3000;

// Read Gmail credentials from CSV file
function readGmailCredentials(csvFilePath) {
  return new Promise((resolve, reject) => {
    const credentials = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (data) => {
        credentials.push(data);
      })
      .on('end', () => {
        resolve(credentials);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
}

// Authenticate with Gmail and send email
async function sendEmailWithGmail(credentials, emailData) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: credentials[0].email,
      pass: credentials[0].password
    }
  });

  try {
    const info = await transporter.sendMail({
      from: emailData.from.email,
      to: emailData.to.email,
      subject: emailData.subject,
      text: emailData.body
    });

    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
// var resp = []

// // Handle POST request to send email
// router.post('/send-email', async (req, res) => {
//   console.log(123)
//   const emailBank = req.body.FileEmailFrom;
//   const sendingEmails = req.body.FileEmailTo;
//   // console.log(emailBank)
//   console.log(req.body)
//   let st = 0
//   let s1
//   emailBank.forEach( async smail => {
//     if(sendingEmails.length >= 100){
//      s1 = sendingEmails.slice(st,st+100)
//     }
//     else{
//       s1 = sendingEmails.slice(st)
//     }
//     s1.forEach(async dmails => {
//    const sender= await getbill(smail, dmails , res)
//     resp.push(sender)
//   // res.json(resp)

//     console.log(resp)

//     });

//     st +=100

//   });

//     // Wait for all promises to resolve
//     Promise.all(resp)
//         .then(() => {
//             console.log(resp);

//             res.status(200).json({ message: 'Emails sent successfully', resp });

//         })
//         .catch(error => {
//             console.error('Error sending emails:', error);
//             res.status(500).json({ error: 'Failed to send emails' });
//         });


//   // console.log(resp)

// });
// const getbill = async(semail, dmail ) => {

//   // const { userEmail } = req.body;
//   // console.log(userEmail)

//   let config = {
//       service : 'gmail',
//       auth : {
//           user: semail.email,
//           pass: semail.password
//       }
//   }

//   let transporter = nodemailer.createTransport(config);
//   //  console.log(transporter)
//   let MailGenerator = new Mailgen({
//       theme: "default",
//       product : {
//           name: "Mubbashir",
//           link : 'https://mailgen.js/'
//       }
//   })

//   let response = {
//       body: {
//           name : "Daily Tuition",
//           intro: "Your bill has arrived!",
//           table : {
//               data : [
//                   {
//                       item : "Nodemailer Stack Book",
//                       description: "A Backend application",
//                       price : "$10.99",
//                   }
//               ]
//           },
//           outro: "Looking forward to do more business"
//       }
//   }

//   let mail = MailGenerator.generate(response)

//   let message = {
//       name:"yourSeen@gmail.com",
//       from : "yourSeen@gmail.com",
//       to : dmail.email,
//       subject: "Product Marketing",
//       html: mail,
//       replyTo:'yourSeen@gmail.com'
//   }
//   try {
//     let data = await transporter.sendMail(message);
//     return { emailSender: semail.email ,sendedemail: dmail.email, status: 'sent' };
// } catch (error) {
//     console.log(error);
//     return { email: dmail.email, status: 'failed' };
// }
// }


// // Start the server


router.post('/send-email', async (req, res) => {
  console.log(123);
  console.log(req.body)
  const emailSubject = req.body.emailSubject
  const emailBody = req.body.emailBody
  const emailBank = req.body.FileEmailFrom;
  const sendingEmails = req.body.FileEmailTo;
  let resp = [];

  // Create an array to store promises
  let promises = [];

  emailBank.forEach(async smail => {
    let st = 0;
    while (st < sendingEmails.length) {
      let s1 = sendingEmails.slice(st, st + 100);
      console.log(s1)
      promises.push(getBill(smail, s1,resp , emailBody ,emailSubject));
      // console.log(getBill(smail, s1, resp))
      console.log(promises)
      st += 100;
    }
  });

  // Wait for all promises to resolve
  Promise.all(promises)
    .then(() => {
      // console.log(resp);
      res.status(200).json({ message: 'Emails sent successfully', sendedEmail:resp,totalEmails:sendingEmails });
    })
    .catch(error => {
      console.error('Error sending emails:', error);
      res.status(500).json({ error: 'Failed to send emails' });
    });
});

const getBill = async (semail, dmails,  resp, emailBody,emailSubject) => {
  let config = {
    service: 'gmail',
    auth: {
      user: semail.email,
      pass: semail.password
    }
  };

  let transporter = nodemailer.createTransport(config);
  let MailGenerator = new Mailgen({
    theme: 'default',
    product: {
      name: 'Daily Tuition',
      link: 'https://mailgen.js/'
    }
  });

  let response = {
    body: {
      name: 'Daily Tuition',
      intro: 'Your bill has arrived!',
      table: {
        data: [
          {
            item: 'Nodemailer Stack Book',
            description: 'A Backend application',
            price: '$10.99'
          }
        ]
      },
      outro: 'Looking forward to do more business'
    }
  };

  let mail = MailGenerator.generate(response);

  let promises = dmails.map(async dmail => {
    let message = {

      from: 'Yaseen <yourSeen@gmail.com>',
      to: dmail.email,
      subject: emailSubject,
      html: emailBody,
      replyTo: 'yourSeen@gmail.com',
     
    };

    try {
      let data = await transporter.sendMail(message);
      resp.push({ emailSender: semail.email, sendedemail: dmail.email, status: 'sent' });
    } catch (error) {
      console.error(error);
      resp.push({ email: dmail.email, status: 'failed' });
    }
  });

  // Wait for all emails to be sent
  await Promise.all(promises);
};


export default router