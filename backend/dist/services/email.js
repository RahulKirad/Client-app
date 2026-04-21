"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.INQUIRY_RECIPIENT_EMAIL = void 0;
exports.sendInquiryEmail = sendInquiryEmail;
const nodemailer_1 = __importDefault(require("nodemailer"));
exports.INQUIRY_RECIPIENT_EMAIL = 'cottonunique.co@gmail.com';
function getTransporter() {
    const user = process.env.EMAIL_USER;
    const pass = process.env.EMAIL_APP_PASSWORD;
    if (!user || !pass) {
        throw new Error('EMAIL_USER and EMAIL_APP_PASSWORD must be set to send inquiry emails');
    }
    return nodemailer_1.default.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: { user, pass },
    });
}
async function sendInquiryEmail(payload) {
    const recipient = process.env.INQUIRY_RECIPIENT_EMAIL || exports.INQUIRY_RECIPIENT_EMAIL;
    try {
        const transporter = getTransporter();
        const from = process.env.EMAIL_USER || recipient;
        const subject = `[Cottonunique] New inquiry from ${payload.name}`;
        const text = [
            '═══════════════════════════════════════════════════════',
            '           NEW INQUIRY - COTTONUNIQUE WEBSITE',
            '═══════════════════════════════════════════════════════',
            '',
            'CUSTOMER INFORMATION',
            '───────────────────────────────────────────────────────',
            `Name:        ${payload.name}`,
            `Email:       ${payload.email}`,
            payload.company ? `Company:     ${payload.company}` : null,
            payload.region ? `Region:      ${payload.region}` : null,
            payload.order_type ? `Order Type:  ${payload.order_type}` : null,
            '',
            'INQUIRY MESSAGE',
            '───────────────────────────────────────────────────────',
            payload.message,
            '',
            '═══════════════════════════════════════════════════════',
            `Submitted: ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}`,
            '═══════════════════════════════════════════════════════',
            '',
            'Reply directly to this email to respond to the customer.',
        ]
            .filter(Boolean)
            .join('\n');
        const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Inquiry - Cottonunique</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5; line-height: 1.6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f5f5f5; padding: 20px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #78350F 0%, #A0522D 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: 0.5px;">
                🎯 New Inquiry Received
              </h1>
              <p style="margin: 10px 0 0 0; color: #FDF6E3; font-size: 14px; opacity: 0.9;">
                Cottonunique Website Contact Form
              </p>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Customer Information Section -->
              <div style="background-color: #FDF6E3; border-left: 4px solid #78350F; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
                <h2 style="margin: 0 0 20px 0; color: #78350F; font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  👤 Customer Information
                </h2>
                
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7;">
                      <span style="display: inline-block; min-width: 140px; color: #78350F; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Name:</span>
                      <span style="color: #3a2f1f; font-size: 15px; font-weight: 500;">${escapeHtml(payload.name)}</span>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7;">
                      <span style="display: inline-block; min-width: 140px; color: #78350F; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Email:</span>
                      <a href="mailto:${escapeHtml(payload.email)}" style="color: #78350F; font-size: 15px; font-weight: 500; text-decoration: none; border-bottom: 1px solid #78350F;">${escapeHtml(payload.email)}</a>
                    </td>
                  </tr>
                  ${payload.company ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7;">
                      <span style="display: inline-block; min-width: 140px; color: #78350F; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Company:</span>
                      <span style="color: #3a2f1f; font-size: 15px; font-weight: 500;">${escapeHtml(payload.company)}</span>
                    </td>
                  </tr>
                  ` : ''}
                  ${payload.region ? `
                  <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #E8D5B7;">
                      <span style="display: inline-block; min-width: 140px; color: #78350F; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Region:</span>
                      <span style="color: #3a2f1f; font-size: 15px; font-weight: 500;">${escapeHtml(payload.region)}</span>
                    </td>
                  </tr>
                  ` : ''}
                  ${payload.order_type ? `
                  <tr>
                    <td style="padding: 12px 0;">
                      <span style="display: inline-block; min-width: 140px; color: #78350F; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">Order Type:</span>
                      <span style="display: inline-block; background-color: #78350F; color: #ffffff; padding: 4px 12px; border-radius: 20px; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">${escapeHtml(payload.order_type)}</span>
                    </td>
                  </tr>
                  ` : ''}
                </table>
              </div>

              <!-- Message Section -->
              <div style="background-color: #ffffff; border: 2px solid #E8D5B7; padding: 25px; border-radius: 4px; margin-bottom: 20px;">
                <h2 style="margin: 0 0 20px 0; color: #78350F; font-size: 20px; font-weight: 600; text-transform: uppercase; letter-spacing: 1px;">
                  💬 Inquiry Message
                </h2>
                <div style="background-color: #FDF6E3; padding: 20px; border-radius: 4px; border-left: 3px solid #78350F;">
                  <p style="margin: 0; color: #3a2f1f; font-size: 15px; line-height: 1.8; white-space: pre-wrap; font-family: inherit;">${escapeHtml(payload.message)}</p>
                </div>
              </div>

              <!-- Action Section -->
              <div style="background-color: #FDF6E3; padding: 20px; border-radius: 4px; text-align: center; margin-top: 30px;">
                <p style="margin: 0 0 15px 0; color: #78350F; font-size: 14px; font-weight: 600;">
                  📧 Reply directly to this email to respond to the customer
                </p>
                <a href="mailto:${escapeHtml(payload.email)}" style="display: inline-block; background-color: #78350F; color: #ffffff; padding: 12px 30px; text-decoration: none; border-radius: 4px; font-weight: 600; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
                  Reply to Customer
                </a>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #FDF6E3; padding: 20px 40px; text-align: center; border-top: 1px solid #E8D5B7;">
              <p style="margin: 0; color: #78350F; font-size: 12px; opacity: 0.8;">
                This inquiry was submitted through the Cottonunique website contact form.<br>
                <strong>Timestamp:</strong> ${new Date().toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'long' })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;
        await transporter.sendMail({
            from: `Cottonunique Contact <${from}>`,
            to: recipient,
            subject,
            text,
            html,
            replyTo: payload.email,
        });
        console.log(`Inquiry email sent to ${recipient} for ${payload.email}`);
        return true;
    }
    catch (err) {
        console.error('Failed to send inquiry email:', err);
        return false;
    }
}
function escapeHtml(s) {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
//# sourceMappingURL=email.js.map