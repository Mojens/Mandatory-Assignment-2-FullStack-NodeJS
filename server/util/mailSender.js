import nodemail from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

const transporter = nodemail.createTransport({
    service: "gmail",
    port: 587,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    secure: false
});

function sendForgotPasswordMail(req, res) {
    const mailData = {
        from: process.env.MAIL_USER,
        to: process.env.MAIL_USER,
        subject: subject,
        text: ``,
        html: `<h1>Hi</h1>`
    };

    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            const errorMessage = 'An error has occurred. Please try again later.';
            console.log(err)
        } else {
            console.log(info);
            const successMessage = 'Your message has been sent successfully.';
        }
    });
}

export default {
    sendForgotPasswordMail
};
