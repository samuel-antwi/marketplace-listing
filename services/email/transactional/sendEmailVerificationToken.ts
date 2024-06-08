import sgMail from "@sendgrid/mail";
import { User } from "lucia";
const config = useRuntimeConfig();

const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

export async function sendEmailVerificationToken(
  email: string,
  code: string,
  user: User
) {
  const msg = {
    to: email,
    from: "samuelantwidev@gmail.com",
    subject: "Verify Your Email Address for Onegii Ltd",
    text: `
Dear ${user.given_name},

Thank you for signing up with Onegii We are excited to have you on board.

To complete your registration and activate your account, please use the verification code below:

Verification code: ${code}

If you did not create an account with Onegii Ltd, please disregard this email.

If you have any questions or need assistance, feel free to contact our support team at support@onegii.com.

Thank you for choosing Onegii Ltd. We look forward to serving you.

Best regards,

<p><strong>Samuel Antwi</strong><br>
<strong>Customer Support</strong><br>
<strong>Onegii Ltd</strong><br>
    `,
    html: `
<p>Dear <strong>${user.given_name}</strong>,</p>
<p>Thank you for signing up with <strong>Onegii</strong>! We are excited to have you on board.</p>
<p>To complete your registration and activate your account, please use the verification code below:</p>
<p><strong>Verification code: ${code}</strong></p>
<p>If you did not create an account with <strong>Onegii Ltd</strong>, please disregard this email.</p>
<p>If you have any questions or need assistance, feel free to contact our support team at <strong>support@onegii.com</strong>.</p>
<p>Thank you for choosing <strong>Onegii</strong>. We look forward to serving you.</p>
<br>
<p>Best regards,</p>
<p><strong>Samuel Antwi</strong><br>
<strong>Customer Support</strong><br>
<strong>Onegii Ltd</strong><br>
    `,
  };

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
}
