import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return Response.json({ error: 'Email is required' }, { status: 400 });
    }

    // Send thank you email to user
    await resend.emails.send({
      from: 'OnTimeCoders <onboarding@resend.dev>', 
      to: email,
      subject: 'Welcome to OnTimeCoders - Your Free Landing Page Awaits!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Joining! 🎉</h1>
          </div>
          
          <div style="background: #ffffff; padding: 30px; border: 1px solid #e0e0e0; border-top: none; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Hi there,</h2>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              We're excited to help you build your <strong>FREE landing page</strong>!
            </p>
            
            <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
              <h3 style="color: #764ba2; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; padding-left: 20px; line-height: 1.8;">
                <li>Our team will review your request within 24 hours</li>
                <li>We'll contact you to discuss your requirements</li>
                <li>Get your landing page delivered in 3-5 business days</li>
              </ul>
            </div>
            
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              <strong>Special Offer Reminder:</strong><br/>
              ✅ <span style="color: #22c55e;">100% FREE</span> when you order additional pages<br/>
              ✅ <span style="color: #f59e0b;">50% OFF</span> if you only need the landing page
            </p>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="https://ontimecoders.netlify.app/contact" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                Contact Support
              </a>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
            
            <p style="color: #999; font-size: 12px; text-align: center;">
              OnTimeCoders Team<br>
              <a href="https://ontimecoders.netlify.app" style="color: #764ba2;">www.ontimecoders.netlify.app</a>
            </p>
          </div>
        </div>
      `,
    });

    // Send lead notification to you (admin)
    await resend.emails.send({
      from: 'OnTimeCoders Leads <leads@resend.dev>',
      to: process.env.EMAIL_USER, 
      subject: `🎯 New Lead: ${email} - Free Landing Page Request`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #764ba2;">🎉 New Lead Captured!</h2>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${email}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Source</td>
              <td style="padding: 12px; border: 1px solid #ddd;">Landing Page Popup</td>
            </tr>
            <tr style="background: #f3f4f6;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Date</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${new Date().toLocaleString()}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Offer</td>
              <td style="padding: 12px; border: 1px solid #ddd;">Free Landing Page</td>
            </tr>
          </table>
          
          <div style="margin-top: 30px; padding: 20px; background: #fef3c7; border-radius: 8px; border-left: 4px solid #f59e0b;">
            <p style="margin: 0; color: #92400e; font-size: 14px;">
              <strong>Action Required:</strong> Contact this lead within 24 hours to maximize conversion!
            </p>
          </div>
        </div>
      `,
    });

    return Response.json({ success: true, message: 'Emails sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    return Response.json({ error: 'Failed to send emails' }, { status: 500 });
  }
}