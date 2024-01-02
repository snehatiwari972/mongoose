const nodemailer = require('nodemailer');



async function sendMail(toMail, subject,text){
    // create an email transporter.
    // SMTP
   const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "snehatiwari972@gmail.com",
            pass: "" // Here We Put Password
        }
    })

    // configure email content 

    const mailOptions = {
        from :"snehatiwari@gmail.com", // Here We put our email id which helps to send email
        to : toMail,
        subject: subject,
        text: text
    }

    try {
        transporter.sendMail(mailOptions);
        console.log("Email Send Successfully");
    } catch (error) {
        console.log("Email send failed with error:", error);
    }
}

// sendMail();
module.exports = sendMail;
