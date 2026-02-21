import nodemailer from "nodemailer";

// Email templates with animations and branding
const getAdminTemplate = (name, email, projectType, message, siteUrl, siteName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Lead — ${siteName}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

          <!-- Header bar -->
          <tr>
            <td style="background:#6366f1;padding:16px 24px;border-radius:10px 10px 0 0;">
              <p style="margin:0;color:#fff;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">New Inquiry — ${siteName}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1e293b;padding:24px;border-radius:0 0 10px 10px;border:1px solid #334155;border-top:none;">

              <!-- Fields -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td style="padding:5px 0;color:#64748b;font-size:12px;white-space:nowrap;width:70px;">Name</td>
                  <td style="padding:5px 0;color:#e2e8f0;font-size:14px;font-weight:600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:#64748b;font-size:12px;">Email</td>
                  <td style="padding:5px 0;font-size:14px;"><a href="mailto:${email}" style="color:#818cf8;text-decoration:none;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding:5px 0;color:#64748b;font-size:12px;">Project</td>
                  <td style="padding:5px 0;"><span style="background:#1e3a5f;color:#93c5fd;font-size:12px;font-weight:600;padding:3px 10px;border-radius:20px;">${projectType}</span></td>
                </tr>
              </table>

              <!-- Divider -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr><td style="border-top:1px solid #334155;font-size:0;line-height:0;">&nbsp;</td></tr>
              </table>

              <!-- Message -->
              <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;">Message</p>
              <p style="margin:0 0 24px;color:#cbd5e1;font-size:14px;line-height:1.7;background:#0f172a;padding:16px;border-radius:8px;border:1px solid #334155;">${message}</p>

              <!-- CTA -->
              <a href="mailto:${email}" style="display:block;text-align:center;background:#6366f1;color:#fff;text-decoration:none;padding:12px;border-radius:8px;font-size:13px;font-weight:700;letter-spacing:0.03em;">Reply to ${name}</a>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:16px 0 0;text-align:center;">
              <p style="margin:0;color:#475569;font-size:11px;">${new Date().toLocaleString()}</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


// CONTINUATION OF THANK YOU TEMPLATE
const getThankYouTemplate = (name, projectType, message, siteUrl, siteName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You — ${siteName}</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">

  <!-- Preheader -->
  <div style="display:none;max-height:0;overflow:hidden;">Thanks ${name}! We got your ${projectType} inquiry and will reply within 24 hours.</div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0f172a;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:520px;">

          <!-- Header -->
          <tr>
            <td align="center" style="background:linear-gradient(135deg,#0891b2,#2563eb);padding:28px 24px 24px;border-radius:10px 10px 0 0;">
              
              <!-- Logo -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:16px;">
                <tr>
                  <td style="width:52px;height:52px;background:rgba(255,255,255,0.15);border-radius:10px;border:2px solid rgba(255,255,255,0.3);text-align:center;vertical-align:middle;">
                    <span style="color:#22d3ee;font-size:20px;font-weight:bold;font-family:monospace;">&lt;/&gt;</span>
                  </td>
                </tr>
              </table>
              <p style="margin:0 0 14px;font-size:20px;font-weight:800;color:#fff;">ontime<span style="color:#22d3ee;">coders</span></p>

              <!-- Check -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 12px;">
                <tr>
                  <td style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:50%;border:2px solid rgba(255,255,255,0.35);text-align:center;vertical-align:middle;">
                    <span style="color:#22d3ee;font-size:20px;font-weight:bold;">✓</span>
                  </td>
                </tr>
              </table>

              <h1 style="margin:0 0 6px;color:#fff;font-size:22px;font-weight:700;">Thank You, ${name}!</h1>
              <p style="margin:0;color:rgba(255,255,255,0.8);font-size:13px;">We've received your message and will reply within 24 hours.</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#1e293b;padding:24px;border-radius:0 0 10px 10px;border:1px solid #334155;border-top:none;">

              <!-- Project badge -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;">
                <tr>
                  <td align="center">
                    <span style="display:inline-block;background:rgba(6,182,212,0.1);border:1px solid #06b6d4;color:#22d3ee;padding:5px 16px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;">${projectType}</span>
                  </td>
                </tr>
              </table>

              <!-- Timeline (compact) -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;background:#0f172a;border-radius:8px;border:1px solid #334155;">
                <tr>
                  <td style="padding:16px 20px;">
                    <!-- Step 1 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle"><div style="width:28px;height:28px;background:#06b6d4;border-radius:50%;text-align:center;line-height:28px;color:#fff;font-size:13px;font-weight:700;">✓</div></td>
                        <td style="padding-left:12px;color:#22d3ee;font-size:13px;font-weight:600;">Inquiry Received</td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 4px 13px;"><tr><td style="width:2px;height:14px;background:#334155;"></td></tr></table>
                    <!-- Step 2 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle"><div style="width:28px;height:28px;background:#1e293b;border:2px solid #475569;border-radius:50%;text-align:center;line-height:24px;color:#64748b;font-size:12px;font-weight:700;">2</div></td>
                        <td style="padding-left:12px;color:#94a3b8;font-size:13px;font-weight:600;">Under Review</td>
                      </tr>
                    </table>
                    <table cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 4px 13px;"><tr><td style="width:2px;height:14px;background:#334155;"></td></tr></table>
                    <!-- Step 3 -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="28" valign="middle"><div style="width:28px;height:28px;background:#1e293b;border:2px dashed #475569;border-radius:50%;text-align:center;line-height:24px;color:#64748b;font-size:12px;font-weight:700;">3</div></td>
                        <td style="padding-left:12px;color:#64748b;font-size:13px;font-weight:600;">Response Sent</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- Message recap -->
              <p style="margin:0 0 6px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.07em;text-transform:uppercase;">Your Message</p>
              <p style="margin:0 0 20px;background:#0f172a;border-left:3px solid #06b6d4;border-radius:0 6px 6px 0;padding:14px 16px;color:#cbd5e1;font-size:13px;line-height:1.7;font-style:italic;">"${message}"</p>

              <!-- Trust row -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom:20px;background:#0f172a;border-radius:8px;border:1px solid #334155;">
                <tr>
                  <td align="center" style="padding:12px;">
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:0 14px;color:#94a3b8;font-size:12px;border-right:1px solid #334155;">⚡ Fast Delivery</td>
                        <td style="padding:0 14px;color:#94a3b8;font-size:12px;border-right:1px solid #334155;">🛡️ Secure Code</td>
                        <td style="padding:0 14px;color:#94a3b8;font-size:12px;">💎 Premium Quality</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="center">
                    <a href="${siteUrl}" style="display:inline-block;background:#06b6d4;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-size:13px;font-weight:700;">Visit Our Website →</a>
                    <p style="margin:10px 0 0;color:#64748b;font-size:12px;">For urgent matters, <a href="mailto:hello@ontimecoders.com" style="color:#22d3ee;text-decoration:none;">reply to this email</a></p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 0 0;">

              <!-- Social -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:14px;">
                <tr>
                  <td style="padding:0 4px;"><a href="https://twitter.com/ontimecoders" style="display:block;width:34px;height:34px;background:#1e293b;border:1px solid #334155;border-radius:8px;text-align:center;line-height:34px;color:#22d3ee;text-decoration:none;font-size:13px;">𝕏</a></td>
                  <td style="padding:0 4px;"><a href="https://linkedin.com/company/ontimecoders" style="display:block;width:34px;height:34px;background:#1e293b;border:1px solid #334155;border-radius:8px;text-align:center;line-height:34px;color:#22d3ee;text-decoration:none;font-size:13px;">in</a></td>
                  <td style="padding:0 4px;"><a href="https://github.com/ontimecoders" style="display:block;width:34px;height:34px;background:#1e293b;border:1px solid #334155;border-radius:8px;text-align:center;line-height:34px;color:#22d3ee;text-decoration:none;font-size:13px;">Gh</a></td>
                </tr>
              </table>

              <p style="margin:0 0 4px;font-size:15px;font-weight:800;color:#f1f5f9;"><span style="color:#22d3ee;">ontime</span>coders</p>
              <p style="margin:0 0 12px;color:#64748b;font-size:11px;">Building Scalable Digital Experiences</p>
              <p style="margin:0;color:#475569;font-size:11px;">© ${new Date().getFullYear()} ${siteName} · <a href="${siteUrl}/unsubscribe" style="color:#64748b;text-decoration:none;">Unsubscribe</a></p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;


// API Route Handler
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    // Validation
    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { success: false, message: "Invalid email address" },
        { status: 400 }
      );
    }

    // Get environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      SMTP_FROM_NAME,
      SMTP_FROM_EMAIL,
      ADMIN_EMAIL,
      SITE_URL,
      SITE_NAME,
    } = process.env;

    // Check required env vars
    if (!SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP credentials");
      return Response.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST || "smtp.gmail.com",
      port: parseInt(SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Verify connection
    await transporter.verify();

    const fromName = SMTP_FROM_NAME || "OntimeCoders";
    const fromEmail = SMTP_FROM_EMAIL || SMTP_USER;
    const adminEmail = ADMIN_EMAIL || SMTP_USER;
    const siteUrl = SITE_URL || "https://ontimecoders.netlify.app";
    const siteName = SITE_NAME || "OntimeCoders";

    // Send emails in parallel
    await Promise.all([
      // Admin notification
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: adminEmail,
        replyTo: email,
        subject: `🚀 New Lead: ${name} - ${projectType}`,
        html: getAdminTemplate(name, email, projectType, message, siteUrl, siteName),
      }),
      
      // Thank you email to user
      transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: email,
        subject: `✨ ${name}, We Received Your Message!`,
        html: getThankYouTemplate(name, projectType, message, siteUrl, siteName),
      })
    ]);

    return Response.json({
      success: true,
      message: "Emails sent successfully",
    });

  } catch (error) {
    console.error("MAIL ERROR:", error);
    
    const isDevelopment = process.env.NODE_ENV === "development";
    
    return Response.json(
      { 
        success: false, 
        message: isDevelopment ? error.message : "Failed to send email. Please try again later." 
      },
      { status: 500 }
    );
  }
}

