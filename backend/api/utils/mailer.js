import nodemailer from "nodemailer";

export const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail", // or another provider like SendGrid, SES, etc.
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// helper function to send email
export const sendEmail = async ({ to, subject, text, html }) => {
  const transporter = getTransporter();

  const mailOptions = {
    from: `"Savingsville" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
    html,
  };

  return transporter.sendMail(mailOptions);
};
