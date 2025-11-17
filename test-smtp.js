const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "ondra.heri@gmail.com",
    pass: "qghvgrmahhrlbdww",
  },
});

console.log("Testing SMTP connection...\n");

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ SMTP Connection FAILED:");
    console.error(error);
  } else {
    console.log("✅ SMTP Connection SUCCESS!");
    console.log("Sending test email...\n");
    
    transporter.sendMail({
      from: "ondra.heri@gmail.com",
      to: "ondra.heri@gmail.com",
      subject: "Test Email from NextAuth",
      text: "If you receive this, SMTP is working correctly!",
      html: "<b>If you receive this, SMTP is working correctly!</b>",
    }, (err, info) => {
      if (err) {
        console.error("❌ Email sending FAILED:");
        console.error(err);
      } else {
        console.log("✅ Email sent successfully!");
        console.log(info);
      }
    });
  }
});
