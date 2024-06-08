import sgMail from "@sendgrid/mail";
import type { User } from "lucia";
const config = useRuntimeConfig();

const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

export async function sendPasswordResetToken(
  email: string,
  resetLink: string,
  user: User
) {
  const msg = {
    to: email,
    from: "samuelantwidev@gmail.com",
    subject: "Password Reset Request",
    text: `
Dear ${user?.given_name},

We received a request to reset your password for your Onegii account. If you made this request, please use the link below to reset your password:

Password Reset Link: ${resetLink}

If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.

For security reasons, this link will expire in 24 hours.

If you have any questions or need assistance, feel free to contact our support team at [support email or phone number].

Thank you for choosing Onegii. We are here to help!

Best regards,

<p><strong>Samuel Antwi</strong><br>
<strong>Customer Support</strong><br>
<strong>Onegii Ltd</strong><br>
    `,
    html: `
<p>Dear <strong>${user.given_name}</strong>,</p>
<p>We received a request to reset your password for your <strong>Onegii</strong> account. If you made this request, please use the link below to reset your password:</p>
<p><a href="${resetLink}">Reset Password</a></p>
<p>If you did not request a password reset, please ignore this email or contact our support team if you have any concerns.</p>
<p>For security reasons, this link will expire in 24 hours.</p>
<p>If you have any questions or need assistance, feel free to contact our support team at <strong>[support email or phone number]</strong>.</p>
<p>Thank you for choosing <strong>Onegii</strong>. We are here to help!</p>
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
    console.error("Error sending password reset email:", error);
  }
}
