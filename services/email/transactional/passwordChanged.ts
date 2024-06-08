import sgMail from "@sendgrid/mail";
import type { User } from "lucia";
const config = useRuntimeConfig();

const apiKey = config.SENDGRID_API_KEY;

sgMail.setApiKey(apiKey);

export async function sendPasswordChangedNotification(user: User) {
  const msg = {
    to: user.email,
    from: "samuelantwidev@gmail.com",
    subject: "Your Password Has Been Changed",
    text: `
Dear ${user?.given_name},

This is a confirmation that the password for your Onegii account has been successfully changed. If you did not make this change, please contact our support team immediately.

If you have any questions or need assistance, feel free to contact our support team at upport@Onegii.com.

Thank you for choosing Onegii. We are here to help!

Best regards,

Samuel Antwi
Customer Support
Onegii Ltd
    `,
    html: `
<p>Dear <strong>${user.given_name}</strong>,</p>
<p>This is a confirmation that the password for your <strong>Onegii</strong> account has been successfully changed. If you did not make this change, please contact our support team immediately.</p>
<p>If you have any questions or need assistance, feel free to contact our support team at <strong>support@Onegii.com</strong>.</p>
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
    console.error("Error sending password changed notification email:", error);
  }
}
