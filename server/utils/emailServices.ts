// server/utils/emailService.ts

import sgMail from "@sendgrid/mail";
const config = useRuntimeConfig();

const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

export async function sendVerificationEmail(email: string, code: string) {
  const msg = {
    to: email,
    from: "samuelantwidev@gmail.com", // Use your verified SendGrid sender email
    subject: "Email Verification",
    text: `Your verification code is: ${code}`,
    html: `<p>Your verification code is: <strong>${code}</strong></p>`,
  };

  try {
    await sgMail.send(msg);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
