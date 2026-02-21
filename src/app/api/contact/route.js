import nodemailer from "nodemailer";

// Email templates with animations and branding
const getAdminTemplate = (name, email, projectType, message, siteUrl, siteName) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>New Lead - ${siteName}</title>
  <style>
    @media screen and (max-width: 600px) {
      .mobile-padding { padding: 20px !important; }
      .mobile-font { font-size: 20px !important; }
      .mobile-hide { display: none !important; }
    }
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-30px); }
      to { opacity: 1; transform: translateX(0); }
    }
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    .animate-slide { animation: slideInLeft 0.6s ease-out forwards; }
    .animate-fade { animation: fadeIn 0.8s ease-out forwards; }
  </style>
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5); border: 1px solid #334155;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); padding: 30px; text-align: center;">
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 0 auto;">
                <tr>
                  <td style="font-size: 32px; color: #ffffff; font-weight: 800; letter-spacing: -1px;">
                    <span style="color: #fbbf24;">⚡</span> NEW LEAD
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 35px 30px;" class="mobile-padding">
              <table width="100%" cellpadding="0" cellspacing="0" border="0" class="animate-slide">
                
                <!-- Lead Info -->
                <tr>
                  <td style="padding-bottom: 25px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0f172a; border-radius: 12px; border-left: 4px solid #dc2626;">
                      <tr>
                        <td style="padding: 20px;">
                          <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Contact Information</p>
                          
                          <p style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 15px;">
                            <strong style="color: #60a5fa; display: inline-block; width: 80px;">Name:</strong> ${name}
                          </p>
                          <p style="margin: 0 0 8px 0; color: #f1f5f9; font-size: 15px;">
                            <strong style="color: #60a5fa; display: inline-block; width: 80px;">Email:</strong> 
                            <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none;">${email}</a>
                          </p>
                          <p style="margin: 0; color: #f1f5f9; font-size: 15px;">
                            <strong style="color: #60a5fa; display: inline-block; width: 80px;">Project:</strong> 
                            <span style="background: rgba(220, 38, 38, 0.2); color: #fca5a5; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${projectType}</span>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Message -->
                <tr>
                  <td style="padding-bottom: 25px;">
                    <p style="margin: 0 0 12px 0; color: #94a3b8; font-size: 11px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Message</p>
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: #0f172a; border-radius: 12px; border: 1px solid #334155;">
                      <tr>
                        <td style="padding: 20px; color: #cbd5e1; font-size: 14px; line-height: 1.6; font-style: italic;">
                          "${message}"
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Action Button -->
                <tr>
                  <td align="center" style="padding: 20px; background: rgba(220, 38, 38, 0.1); border-radius: 12px; border: 1px solid rgba(220, 38, 38, 0.2);">
                    <p style="margin: 0 0 15px 0; color: #fca5a5; font-size: 13px; font-weight: 600;">⏰ Response SLA: 24 hours</p>
                    <a href="mailto:${email}" style="display: inline-block; background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 6px -1px rgba(220, 38, 38, 0.2);">Reply to ${name} →</a>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px; text-align: center; background: #0f172a; border-top: 1px solid #334155;">
              <p style="margin: 0; color: #64748b; font-size: 12px;">${siteName} Lead Notification System</p>
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
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="color-scheme" content="dark">
  <meta name="supported-color-schemes" content="dark">
  <title>Thank You - ${siteName}</title>
  
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
  
  <style>
    /* Reset */
    body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
    img { -ms-interpolation-mode: bicubic; border: 0; outline: none; text-decoration: none; }
    
    /* Responsive */
    @media screen and (max-width: 600px) {
      .mobile-padding { padding: 30px 20px !important; }
      .mobile-font-lg { font-size: 28px !important; }
      .mobile-font-md { font-size: 16px !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-spacer { height: 20px !important; }
      .mobile-full { width: 100% !important; max-width: 100% !important; }
    }
    
    /* Dark mode support */
    @media (prefers-color-scheme: dark) {
      .dark-bg { background-color: #020617 !important; }
      .dark-card { background-color: rgba(15, 23, 42, 0.95) !important; }
    }
    
    /* Animations - Webkit only (Apple Mail, iOS, Outlook Mac) */
    @keyframes heroEntrance {
      0% { opacity: 0; transform: translateY(40px) scale(0.9); }
      60% { transform: translateY(-10px) scale(1.02); }
      100% { opacity: 1; transform: translateY(0) scale(1); }
    }
    
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      25% { transform: translateY(-15px) rotate(1deg); }
      75% { transform: translateY(-5px) rotate(-1deg); }
    }
    
    @keyframes pulse-glow {
      0%, 100% { box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2); }
      50% { box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3); }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    @keyframes checkmark {
      0% { transform: scale(0) rotate(-45deg); opacity: 0; }
      50% { transform: scale(1.2) rotate(-45deg); }
      100% { transform: scale(1) rotate(0deg); opacity: 1; }
    }
    
    @keyframes slideUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes borderGlow {
      0%, 100% { border-color: rgba(6, 182, 212, 0.3); }
      50% { border-color: rgba(6, 182, 212, 0.8); }
    }
    
    @keyframes typing {
      from { width: 0; }
      to { width: 100%; }
    }
    
    @keyframes blink {
      50% { border-color: transparent; }
    }
    
    @keyframes rotate {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes scaleIn {
      from { transform: scale(0.8); opacity: 0; }
      to { transform: scale(1); opacity: 1; }
    }
    
    /* Animation classes */
    .animate-hero { animation: heroEntrance 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .animate-float { animation: float 6s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 3s ease-in-out infinite; }
    .animate-shimmer { 
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 1000px 100%;
      animation: shimmer 3s infinite linear;
    }
    .animate-check { animation: checkmark 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.5s forwards; opacity: 0; }
    .animate-slide-up { animation: slideUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
    .animate-gradient { 
      background-size: 200% 200%;
      animation: gradientShift 8s ease infinite;
    }
    .animate-border { animation: borderGlow 2s ease-in-out infinite; }
    .animate-rotate { animation: rotate 20s linear infinite; }
    .animate-scale { animation: scaleIn 0.5s ease-out forwards; }
    
    /* Hover effects */
    .hover-lift:hover { transform: translateY(-4px) !important; box-shadow: 0 20px 40px rgba(0,0,0,0.4) !important; }
    .hover-scale:hover { transform: scale(1.05) !important; }
    .hover-glow:hover { box-shadow: 0 0 40px rgba(6, 182, 212, 0.6) !important; }
    .hover-bright:hover { filter: brightness(1.2) !important; }
    
    /* Gradient text */
    .gradient-text {
      background: linear-gradient(135deg, #22d3ee 0%, #3b82f6 50%, #a855f7 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  </style>
</head>

<body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Preheader text (hidden) -->
  <div style="display: none; max-height: 0; overflow: hidden; mso-hide: all;">
    Thank you for contacting ${siteName}, ${name}! We've received your ${projectType} inquiry and will respond within 24 hours. 
    &nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;
  </div>

  <!-- Main Container -->
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(135deg, #020617 0%, #0f172a 50%, #1e1b4b 100%); padding: 40px 20px;" class="dark-bg">
    <tr>
      <td align="center">
        
        <!-- Card Container -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background: rgba(15, 23, 42, 0.95); border-radius: 24px; overflow: hidden; border: 1px solid rgba(6, 182, 212, 0.2); box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 60px rgba(6, 182, 212, 0.1);" class="dark-card animate-hero hover-lift">
          
          <!-- Animated Header Background -->
          <tr>
            <td align="center" style="background: linear-gradient(135deg, #0891b2 0%, #2563eb 50%, #7c3aed 100%); padding: 50px 30px; position: relative; overflow: hidden;" class="animate-gradient">
              
              <!-- Shimmer Overlay -->
              <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; animate-shimmer; opacity: 0.3;"></div>
              
              <!-- Animated Background Circles -->
              <div style="position: absolute; top: -50%; left: -50%; width: 200%; height: 200%; background: radial-gradient(circle, rgba(34,211,238,0.1) 0%, transparent 70%); animate-rotate;"></div>
              
              <!-- Logo Section with Floating Animation -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px; position: relative; z-index: 10;" class="animate-float">
                <tr>
                  <td align="center">
                    <!-- Logo Container with Glow -->
                    <div style="width: 80px; height: 80px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 20px; display: inline-block; border: 2px solid rgba(255,255,255,0.3); box-shadow: 0 0 30px rgba(34,211,238,0.4), inset 0 0 20px rgba(255,255,255,0.1); margin-bottom: 15px; position: relative; overflow: hidden;" class="animate-pulse-glow">
                      
                      <!-- Code Icon -->
                      <table width="100%" height="100%" cellpadding="0" cellspacing="0" border="0">
                        <tr>
                          <td align="center" valign="middle" style="font-size: 32px; color: #ffffff; font-weight: bold; font-family: 'Courier New', monospace; letter-spacing: -2px;">
                            <span style="color: #22d3ee; text-shadow: 0 0 20px rgba(34,211,238,0.8);">&lt;/&gt;</span>
                          </td>
                        </tr>
                      </table>
                      
                      <!-- Inner Glow -->
                      <div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%); pointer-events: none;"></div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 10px;">
                    <span style="font-size: 28px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px; text-shadow: 0 2px 10px rgba(0,0,0,0.3);">
                      ontime<span style="color: #22d3ee; text-shadow: 0 0 20px rgba(34,211,238,0.5);">coders</span>
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Success Animation -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin: 25px auto; position: relative; z-index: 10;">
                <tr>
                  <td style="width: 70px; height: 70px; background: rgba(255,255,255,0.15); border-radius: 50%; border: 3px solid rgba(255,255,255,0.4); display: inline-block; position: relative; box-shadow: 0 0 30px rgba(34,211,238,0.3);" class="animate-check">
                    <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
                      <span style="color: #22d3ee; font-size: 36px; font-weight: bold; text-shadow: 0 0 20px rgba(34,211,238,0.8);">✓</span>
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Thank You Text with Gradient -->
              <h1 style="color: #ffffff; margin: 15px 0 0 0; font-size: 36px; font-weight: 800; text-shadow: 0 2px 20px rgba(0,0,0,0.3); letter-spacing: -1px; position: relative; z-index: 10;" class="mobile-font-lg animate-slide-up">
                Thank You, <span class="gradient-text">${name}!</span> 🎉
              </h1>
              
              <p style="color: rgba(255,255,255,0.9); margin: 15px 0 0 0; font-size: 16px; font-weight: 500; position: relative; z-index: 10;" class="animate-slide-up">
                We've received your message and we're excited to work with you
              </p>

            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 40px 35px; color: #e2e8f0; font-size: 15px; line-height: 1.8;" class="mobile-padding">
              
              <!-- Project Type Badge -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;" class="animate-slide-up">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background: linear-gradient(135deg, rgba(6,182,212,0.15), rgba(59,130,246,0.15)); border: 1px solid rgba(6,182,212,0.4); color: #22d3ee; padding: 12px 30px; border-radius: 50px; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 4px 15px rgba(6,182,212,0.2), inset 0 0 10px rgba(6,182,212,0.1);" class="animate-border hover-glow">
                      ${projectType}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Welcome Message -->
              <p style="margin: 0 0 25px 0; text-align: center; font-size: 16px; color: #94a3b8; line-height: 1.7;" class="animate-slide-up">
                We're thrilled about your project! Our team of elite developers is already reviewing your requirements to craft the perfect solution for your needs.
              </p>

              <!-- Progress Timeline -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 35px 0; background: rgba(30, 41, 59, 0.4); border-radius: 16px; padding: 30px; border: 1px solid rgba(71, 85, 105, 0.3);" class="animate-slide-up hover-lift">
                <tr>
                  <td>
                    <!-- Step 1: Completed -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" valign="top">
                          <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #06b6d4, #3b82f6); border-radius: 50%; text-align: center; line-height: 45px; color: #ffffff; font-weight: bold; font-size: 18px; box-shadow: 0 0 20px rgba(6,182,212,0.5); border: 2px solid rgba(255,255,255,0.2);">
                            ✓
                          </div>
                        </td>
                        <td style="padding-left: 20px;" valign="middle">
                          <p style="margin: 0; color: #22d3ee; font-weight: 700; font-size: 14px;">Inquiry Received</p>
                          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">We've got your message</p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Connector Line -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-left: 22px; margin-bottom: 20px;">
                      <tr>
                        <td style="width: 2px; height: 30px; background: linear-gradient(to bottom, #06b6d4, #64748b);"></td>
                      </tr>
                    </table>

                    <!-- Step 2: In Progress -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 20px;">
                      <tr>
                        <td width="50" valign="top">
                          <div style="width: 45px; height: 45px; background: rgba(100, 116, 139, 0.3); border: 2px solid #64748b; border-radius: 50%; text-align: center; line-height: 43px; color: #94a3b8; font-weight: bold; font-size: 16px;">
                            2
                          </div>
                        </td>
                        <td style="padding-left: 20px;" valign="middle">
                          <p style="margin: 0; color: #94a3b8; font-weight: 700; font-size: 14px;">Under Review</p>
                          <p style="margin: 5px 0 0 0; color: #64748b; font-size: 12px;">Team analyzing requirements</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Connector Line -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-left: 22px; margin-bottom: 20px;">
                      <tr>
                        <td style="width: 2px; height: 30px; background: linear-gradient(to bottom, #64748b, #475569);"></td>
                      </tr>
                    </table>

                    <!-- Step 3: Pending -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td width="50" valign="top">
                          <div style="width: 45px; height: 45px; background: rgba(71, 85, 105, 0.2); border: 2px dashed #475569; border-radius: 50%; text-align: center; line-height: 43px; color: #64748b; font-weight: bold; font-size: 16px;">
                            3
                          </div>
                        </td>
                        <td style="padding-left: 20px;" valign="middle">
                          <p style="margin: 0; color: #64748b; font-weight: 700; font-size: 14px;">Response Coming</p>
                          <p style="margin: 5px 0 0 0; color: #475569; font-size: 12px;">Within 24 hours</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Response Time Badge -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top: 25px;">
                      <tr>
                        <td align="center">
                          <span style="display: inline-block; background: rgba(6, 182, 212, 0.1); border: 1px solid rgba(6, 182, 212, 0.3); color: #22d3ee; padding: 10px 25px; border-radius: 30px; font-size: 13px; font-weight: 600;">
                            ⏱️ Guaranteed Response: <strong>Within 24 Hours</strong>
                          </span>
                        </td>
                      </tr>
                    </table>

                  </td>
                </tr>
              </table>

              <!-- Message Box -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 30px;" class="animate-slide-up">
                <tr>
                  <td>
                    <p style="margin: 0 0 15px 0; font-weight: 700; color: #cbd5e1; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
                      Your Message:
                    </p>
                    
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="background: linear-gradient(135deg, #1e293b, #0f172a); padding: 25px; border-radius: 12px; border-left: 4px solid #06b6d4; color: #f1f5f9; font-style: italic; line-height: 1.7; box-shadow: inset 0 2px 4px rgba(0,0,0,0.3), 0 4px 6px rgba(0,0,0,0.1); position: relative;" class="animate-border">
                          <span style="color: #22d3ee; font-size: 24px; line-height: 0; vertical-align: middle;">"</span>
                          ${message}
                          <span style="color: #22d3ee; font-size: 24px; line-height: 0; vertical-align: middle;">"</span>
                          
                          <!-- Decorative corner -->
                          <div style="position: absolute; top: 10px; right: 10px; width: 20px; height: 20px; border-top: 2px solid rgba(6,182,212,0.3); border-right: 2px solid rgba(6,182,212,0.3); border-radius: 0 4px 0 0;"></div>
                          <div style="position: absolute; bottom: 10px; left: 10px; width: 20px; height: 20px; border-bottom: 2px solid rgba(6,182,212,0.3); border-left: 2px solid rgba(6,182,212,0.3); border-radius: 0 0 0 4px;"></div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- CTA Section -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 35px 0;" class="animate-slide-up">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 20px 0; color: #94a3b8; font-size: 14px;">
                      Want to explore more while you wait?
                    </p>
                    
                    <!-- Primary CTA -->
                    <a href="${siteUrl}" style="display: inline-block; background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 50%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 18px 45px; border-radius: 50px; font-weight: 700; font-size: 15px; text-transform: uppercase; letter-spacing: 1.5px; box-shadow: 0 10px 30px rgba(6,182,212,0.4), 0 0 20px rgba(6,182,212,0.2); border: 2px solid rgba(255,255,255,0.1); position: relative; overflow: hidden;" class="hover-scale hover-glow animate-gradient">
                      <span style="position: relative; z-index: 10;">Visit Our Website →</span>
                      <div style="position: absolute; top: 0; left: -100%; width: 100%; height: 100%; background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent); animate-shimmer;"></div>
                    </a>
                    
                    <!-- Secondary CTA -->
                    <p style="margin: 20px 0 0 0; color: #64748b; font-size: 13px;">
                      Or <a href="mailto:hello@ontimecoders.com" style="color: #22d3ee; text-decoration: none; border-bottom: 1px solid rgba(34,211,238,0.3);">reply to this email</a> for urgent matters
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Trust Badges -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin: 30px 0; padding: 25px; background: rgba(30, 41, 59, 0.3); border-radius: 12px; border: 1px solid rgba(71, 85, 105, 0.2);" class="animate-slide-up">
                <tr>
                  <td align="center">
                    <p style="margin: 0 0 20px 0; color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; font-weight: 600;">Why Clients Trust Us</p>
                    
                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" style="padding: 0 15px;">
                          <div style="font-size: 24px; margin-bottom: 5px;">⚡</div>
                          <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Fast Delivery</p>
                        </td>
                        <td align="center" style="padding: 0 15px;">
                          <div style="font-size: 24px; margin-bottom: 5px;">🛡️</div>
                          <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Secure Code</p>
                        </td>
                        <td align="center" style="padding: 0 15px;">
                          <div style="font-size: 24px; margin-bottom: 5px;">🎯</div>
                          <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Pixel Perfect</p>
                        </td>
                        <td align="center" style="padding: 0 15px;" class="mobile-hide">
                          <div style="font-size: 24px; margin-bottom: 5px;">💎</div>
                          <p style="margin: 0; color: #94a3b8; font-size: 12px; font-weight: 600;">Premium Quality</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 40px 30px; background: rgba(15, 23, 42, 0.8); border-top: 1px solid rgba(71, 85, 105, 0.3);">
              
              <!-- Social Links -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 0 8px;">
                    <a href="https://twitter.com/ontimecoders" style="display: block; width: 45px; height: 45px; background: rgba(6,182,212,0.1); border-radius: 12px; text-align: center; line-height: 45px; color: #22d3ee; text-decoration: none; font-size: 20px; border: 1px solid rgba(6,182,212,0.2); transition: all 0.3s;" class="hover-scale hover-glow">
                      𝕏
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://linkedin.com/company/ontimecoders" style="display: block; width: 45px; height: 45px; background: rgba(6,182,212,0.1); border-radius: 12px; text-align: center; line-height: 45px; color: #22d3ee; text-decoration: none; font-size: 20px; border: 1px solid rgba(6,182,212,0.2);" class="hover-scale hover-glow">
                      in
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://github.com/ontimecoders" style="display: block; width: 45px; height: 45px; background: rgba(6,182,212,0.1); border-radius: 12px; text-align: center; line-height: 45px; color: #22d3ee; text-decoration: none; font-size: 20px; border: 1px solid rgba(6,182,212,0.2);" class="hover-scale hover-glow">
                      Gh
                    </a>
                  </td>
                  <td style="padding: 0 8px;">
                    <a href="https://instagram.com/ontimecoders" style="display: block; width: 45px; height: 45px; background: rgba(6,182,212,0.1); border-radius: 12px; text-align: center; line-height: 45px; color: #22d3ee; text-decoration: none; font-size: 20px; border: 1px solid rgba(6,182,212,0.2);" class="hover-scale hover-glow">
                      Ig
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Company Info -->
              <p style="margin: 0 0 10px 0; font-size: 18px; font-weight: 700; color: #f1f5f9;">
                <span style="color: #22d3ee;">ontime</span>coders
              </p>
              
              <p style="margin: 0 0 20px 0; font-size: 13px; color: #64748b; line-height: 1.6;">
                Building Scalable Digital Experiences<br>
                <span style="color: #475569;">Premium Software Development Services</span>
              </p>

              <!-- Contact Info -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom: 25px;">
                <tr>
                  <td style="padding: 0 15px; border-right: 1px solid #334155;">
                    <a href="mailto:hello@ontimecoders.com" style="color: #94a3b8; text-decoration: none; font-size: 12px;">hello@ontimecoders.com</a>
                  </td>
                  <td style="padding: 0 15px;">
                    <a href="tel:+1234567890" style="color: #94a3b8; text-decoration: none; font-size: 12px;">+1 (234) 567-890</a>
                  </td>
                </tr>
              </table>

              <!-- Copyright -->
              <p style="margin: 0; font-size: 12px; color: #475569;">
                © ${new Date().getFullYear()} ${siteName}. All rights reserved.<br>
                <span style="font-size: 11px; color: #334155;">Crafted with 💙 by elite developers</span>
              </p>

            </td>
          </tr>

        </table>

        <!-- View in Browser / Unsubscribe -->
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; margin-top: 30px;">
          <tr>
            <td align="center" style="padding: 20px;">
              <p style="margin: 0; font-size: 12px; color: #475569;">
                <a href="${siteUrl}/email-view" style="color: #64748b; text-decoration: none; border-bottom: 1px solid #334155;">View in browser</a>
                <span style="color: #334155; margin: 0 10px;">|</span>
                <a href="${siteUrl}/preferences" style="color: #64748b; text-decoration: none; border-bottom: 1px solid #334155;">Email preferences</a>
                <span style="color: #334155; margin: 0 10px;">|</span>
                <a href="${siteUrl}/unsubscribe" style="color: #64748b; text-decoration: none; border-bottom: 1px solid #334155;">Unsubscribe</a>
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

