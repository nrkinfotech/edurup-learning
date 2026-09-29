const nodemailer = require('nodemailer');
const twilio = require('twilio');

/**
 * Send real-time Email OTP via Nodemailer
 */
const sendEmailOTP = async (email, otpCode, userName = 'Student') => {
  const user = process.env.EMAIL_USER; // e.g. edurup.official@gmail.com
  const pass = process.env.EMAIL_PASS; // Gmail 16-character App Password

  if (!user || !pass) {
    console.log(`📧 [EMAIL SIMULATION Mode] To: ${email} | OTP: ${otpCode}`);
    return { success: true, mode: 'simulation' };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass }
    });

    const mailOptions = {
      from: `"Edurup Learning" <${user}>`,
      to: email,
      subject: `Your Verification Code for Edurup Learning: ${otpCode}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff;">
          <div style="text-align: center; padding-bottom: 20px; border-bottom: 2px solid #6366f1;">
            <h2 style="color: #4f46e5; margin: 0;">Edurup Learning</h2>
            <p style="color: #6b7280; font-size: 14px; margin-top: 5px;">Verification & Sign-In Request</p>
          </div>
          <div style="padding: 30px 10px; text-align: center;">
            <p style="font-size: 16px; color: #374151;">Hello <strong>${userName}</strong>,</p>
            <p style="font-size: 14px; color: #4b5563;">Use the following 6-digit One-Time Password (OTP) to complete your verification and access your dashboard:</p>
            <div style="display: inline-block; background-color: #EEF2FF; color: #4338CA; font-size: 32px; font-weight: bold; letter-spacing: 6px; padding: 15px 30px; border-radius: 8px; margin: 20px 0;">
              ${otpCode}
            </div>
            <p style="font-size: 13px; color: #ef4444; margin-top: 15px;">⏳ This OTP code will expire in <strong>10 minutes</strong>. Do not share this code with anyone.</p>
          </div>
          <div style="border-top: 1px solid #e5e7eb; padding-top: 15px; text-align: center; font-size: 12px; color: #9ca3af;">
            <p>© 2026 Edurup Learning. All rights reserved.</p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`🟢 [REAL EMAIL SENT] OTP ${otpCode} delivered to ${email}`);
    return { success: true, mode: 'real' };
  } catch (error) {
    console.error('❌ Email OTP Error:', error.message);
    return { success: false, error: error.message };
  }
};

/**
 * Send real-time SMS OTP via Twilio or Fast2SMS
 */
const sendSmsOTP = async (phone, otpCode) => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

  if (accountSid && authToken && twilioPhone) {
    try {
      const client = twilio(accountSid, authToken);
      await client.messages.create({
        body: `[Edurup Learning] Your OTP verification code is: ${otpCode}. Valid for 10 minutes.`,
        from: twilioPhone,
        to: phone
      });
      console.log(`🟢 [REAL SMS SENT via Twilio] OTP ${otpCode} delivered to ${phone}`);
      return { success: true, mode: 'twilio' };
    } catch (error) {
      console.error('❌ Twilio SMS Error:', error.message);
      return { success: false, error: error.message };
    }
  }

  // Fast2SMS (India) API Support
  const fast2smsApiKey = process.env.FAST2SMS_API_KEY;
  if (fast2smsApiKey) {
    try {
      const axios = require('axios');
      const cleanPhone = phone.replace(/\D/g, '').slice(-10);

      if (cleanPhone.length === 10) {
        try {
          // Attempt 1: Fast2SMS OTP Route
          await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsApiKey}&route=otp&variables_values=${otpCode}&flash=0&numbers=${cleanPhone}`);
          console.log(`🟢 [REAL SMS SENT via Fast2SMS OTP Route] OTP ${otpCode} delivered to +91 ${cleanPhone}`);
          return { success: true, mode: 'fast2sms' };
        } catch (err1) {
          // Attempt 2: Fast2SMS Quick Route (No DLT required)
          await axios.get(`https://www.fast2sms.com/dev/bulkV2?authorization=${fast2smsApiKey}&route=q&message=${encodeURIComponent('Your Edurup Learning verification code is: ' + otpCode)}&language=english&flash=0&numbers=${cleanPhone}`);
          console.log(`🟢 [REAL SMS SENT via Fast2SMS Quick Route] OTP ${otpCode} delivered to +91 ${cleanPhone}`);
          return { success: true, mode: 'fast2sms' };
        }
      }
    } catch(error) {
      console.error('❌ Fast2SMS Error:', error.response ? JSON.stringify(error.response.data) : error.message);
      return { success: false, error: error.message };
    }
  }

  console.log(`📱 [SMS SIMULATION Mode] To: ${phone} | OTP: ${otpCode}`);
  return { success: true, mode: 'simulation' };
};

module.exports = {
  sendEmailOTP,
  sendSmsOTP
};
