import { config } from "dotenv";
import { createTransport } from "nodemailer";

config();

const { MAIL_EMAIL, MAIL_PASSWORD } = process.env;

const MAIL_SETTINGS = {
  service: "gmail",
  auth: {
    user: MAIL_EMAIL,
    pass: MAIL_PASSWORD,
  },
};

const transporter = createTransport(MAIL_SETTINGS);

export default async (candidateEmail, otp) => {
  const info = await transporter.sendMail({
    from: MAIL_SETTINGS.auth.user,
    to: candidateEmail,
    subject: "Hello ✔",
    html: `
      <div
        class="container"
        style="max-width: 90%; margin: auto; padding-top: 20px"
      >
        <h2>Welcome to the club.</h2>
        <h4>You are officially In ✔</h4>
        <p style="margin-bottom: 30px;">Pleas enter the sign up OTP to get started</p>
        <h1 style="font-size: 40px; letter-spacing: 2px; text-align:center;">${otp}</h1>
   </div>
    `,
  });
  return { status: true, info };
};
