import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, projectType, message } = body;

    if (!name || !email || !message) {
      return Response.json(
        { success: false, message: "All fields are required" },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "umeshnaudiyal01@gmail.com",
        pass: "ebdacbcuyassyrrl",
      },
    });

    await transporter.verify();

    /* =========================
       1️⃣ ADMIN NOTIFICATION
    ========================== */

    const adminTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:20px 10px; font-family: Arial, sans-serif;">
  <tr>
    <td align="center">

      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#111827; border-radius:16px; overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#2563eb,#1e40af); padding:25px 15px;">
            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700;">
              New Project Inquiry
            </h1>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:25px 20px; color:#e5e7eb; font-size:14px; line-height:1.6;">
            
            <p style="margin-top:0;">You have received a new contact request:</p>

            <p><strong>Name:</strong><br/> ${name}</p>
            <p><strong>Email:</strong><br/> ${email}</p>
            <p><strong>Project Type:</strong><br/> ${projectType}</p>

            <p style="margin-bottom:8px;"><strong>Message:</strong></p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1f2937; padding:15px; border-radius:10px; color:#f3f4f6;">
                  ${message}
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:15px; font-size:12px; color:#9ca3af;">
            © ${new Date().getFullYear()} Ontime Coders
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;

    await transporter.sendMail({
      from: `"Ontime Coders" <umeshnaudiyal01@gmail.com>`,
      to: "umeshnaudiyal01@gmail.com",
      replyTo: email,
      subject: `🚀 New Inquiry from ${name}`,
      html: adminTemplate,
    });

    /* =========================
       2️⃣ THANK YOU EMAIL
    ========================== */

    const thankYouTemplate = `
<table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a; padding:20px 10px; font-family: Arial, sans-serif;">
  <tr>
    <td align="center">

      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background:#111827; border-radius:16px; overflow:hidden;">
        
        <!-- Header -->
        <tr>
          <td align="center" style="background:linear-gradient(135deg,#2563eb,#1e40af); padding:25px 15px;">
            <h1 style="color:#ffffff; margin:0; font-size:22px; font-weight:700;">
              Thank You, ${name}! 🙌
            </h1>
          </td>
        </tr>

        <!-- Content -->
        <tr>
          <td style="padding:25px 20px; color:#e5e7eb; font-size:14px; line-height:1.6;">
            
            <p style="margin-top:0;">
              We’ve received your inquiry regarding <strong>${projectType}</strong>.
            </p>

            <p>
              Our team will review your message and respond within 24 hours.
              We’re excited to collaborate with you!
            </p>

            <p style="margin-bottom:8px;"><strong>Your Message:</strong></p>

            <table width="100%" cellpadding="0" cellspacing="0">
              <tr>
                <td style="background:#1f2937; padding:15px; border-radius:10px; color:#f3f4f6;">
                  ${message}
                </td>
              </tr>
            </table>

            <p style="margin-top:20px;">
              If your matter is urgent, simply reply to this email.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td align="center" style="padding:15px; font-size:12px; color:#9ca3af;">
            Ontime Coders <br/>
            Building Scalable Digital Experiences
          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>
`;

    await transporter.sendMail({
      from: `"Ontime Coders" <umeshnaudiyal01@gmail.com>`,
      to: email,
      subject: "✨ We Received Your Message – Ontime Coders",
      html: thankYouTemplate,
    });

    return Response.json({
      success: true,
      message: "Emails sent successfully",
    });
  } catch (error) {
    console.error("MAIL ERROR:", error);

    return Response.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
