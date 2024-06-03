import sgMail from "@sendgrid/mail";
import { User } from "lucia";
const config = useRuntimeConfig();

const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

export async function sendVerificationEmail(
  email: string,
  code: string,
  user: User
) {
  const msg = {
    to: email,
    from: "samuelantwidev@gmail.com",
    subject: "Email Verification",
    text: `Your verification code is: ${code}`,
    html: `
    <p>Hello <strong>${user.given_name}, </strong>it is greate to have you onboard. Below is your verification code</p>
    <p>Verification code: <strong>${code}</strong></p>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
