import nodemailer from 'nodemailer';
import mailgen from 'mailgen';

const transporter = nodemailer.createTransport({
  host: '(link unavailable)',
  port: 587,
  secure: false, // or 'STARTTLS'
  auth: {
    user: 'username',
    pass: 'password'
  }
});

const mailGenerator = new mailgen.MailGenerator();

async function sendEmail(subject, body, from, to) {
  const email = {
    from,
    to,
    subject,
    body
  };
  const html = mailGenerator.generate(email);
  try {
    const result = await transporter.sendMail({ html, from, to, subject });
    return result;
  } catch (err) {
    throw err;
  }
}

export { sendEmail };