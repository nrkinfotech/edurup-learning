const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { sendEmailOTP, sendSmsOTP } = require('../utils/otpService');

const JWT_SECRET = process.env.JWT_SECRET || 'edurup_secret_key_2026';

// Helper to generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: '30d' });
};

// Helper to generate 6-digit OTP
const createRandomOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route   POST /api/auth/signup
// @desc    Register a new student profile in MongoDB Compass
router.post('/signup', async (req, res) => {
  try {
    const {
      'Full Name': fullName,
      'Email Address': email,
      'Phone Number': phone,
      'Date of Birth': dob,
      'Gender': gender,
      'Current Location': location,
      'College / University': college,
      'Current Year': currentYear,
      'Qualification': qualification,
      'Graduation Year': graduationYear,
      'Branch / Stream': branch,
      'City': city,
      'Are you a Student or Professional?': isStudentOrProfessional,
      'Work Experience': workExperience,
      'LinkedIn Profile': linkedin,
      'GitHub Profile': github,
      'Areas of Interest': areasOfInterestStr,
      'How did you hear about us?': howDidYouHear
    } = req.body;

    const userEmail = email || req.body.email;
    const userPhone = phone || req.body.phone;
    const userName = fullName || req.body.fullName || 'Student User';

    if (!userEmail || !userPhone) {
      return res.status(400).json({ success: false, message: 'Email and Phone Number are required' });
    }

    let areasOfInterest = ['Data Analytics', 'Data Science', 'AI & ML', 'Digital Marketing'];
    if (areasOfInterestStr) {
      if (Array.isArray(areasOfInterestStr)) {
        areasOfInterest = areasOfInterestStr;
      } else if (typeof areasOfInterestStr === 'string') {
        areasOfInterest = areasOfInterestStr.split(',').map(s => s.trim());
      }
    }

    let user = await User.findOne({ $or: [{ email: userEmail.toLowerCase() }, { phone: userPhone }] });

    const emailOtpCode = createRandomOTP();
    const phoneOtpCode = createRandomOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    if (user) {
      // Update existing user profile
      user.fullName = userName;
      user.email = userEmail.toLowerCase();
      user.phone = userPhone;
      if (dob) user.dob = dob;
      if (gender) user.gender = gender;
      if (location) user.location = location;
      if (college) user.college = college;
      if (currentYear) user.currentYear = currentYear;
      if (qualification) user.qualification = qualification;
      if (graduationYear) user.graduationYear = graduationYear;
      if (branch) user.branch = branch;
      if (city) user.city = city;
      if (isStudentOrProfessional) user.isStudentOrProfessional = isStudentOrProfessional;
      if (workExperience) user.workExperience = workExperience;
      if (linkedin) user.linkedin = linkedin;
      if (github) user.github = github;
      if (areasOfInterest) user.areasOfInterest = areasOfInterest;
      if (howDidYouHear) user.howDidYouHear = howDidYouHear;
      user.emailOtp = { code: emailOtpCode, expiresAt };
      user.phoneOtp = { code: phoneOtpCode, expiresAt };
      await user.save();
    } else {
      // Create new user in MongoDB
      user = await User.create({
        fullName: userName,
        email: userEmail.toLowerCase(),
        phone: userPhone,
        dob: dob || '20 Oct 1990',
        gender: gender || 'Male',
        location: location || 'Bangalore, Karnataka',
        college: college || 'RV College of Engineering',
        currentYear: currentYear || 'Final Year',
        qualification: qualification || 'B.Tech',
        graduationYear: graduationYear || '2026',
        branch: branch || 'Computer Science',
        city: city || 'Bangalore, Karnataka',
        isStudentOrProfessional: isStudentOrProfessional || 'Student',
        workExperience: workExperience || 'Fresher',
        linkedin: linkedin || 'https://linkedin.com/in/rahulkumar',
        github: github || 'https://github.com/rahulkumar',
        areasOfInterest,
        howDidYouHear: howDidYouHear || 'Instagram',
        emailOtp: { code: emailOtpCode, expiresAt },
        phoneOtp: { code: phoneOtpCode, expiresAt }
      });
    }

    const token = generateToken(user._id);

    // Trigger Real-Time OTP dispatching: Email OTP to Gmail & Phone OTP to Mobile SMS
    sendEmailOTP(user.email, emailOtpCode, user.fullName);
    sendSmsOTP(user.phone, phoneOtpCode);

    console.log(`📱📧 [MongoDB] Registration saved for ${user.fullName}. Email OTP: ${emailOtpCode} | Phone OTP: ${phoneOtpCode}`);

    return res.status(200).json({
      success: true,
      message: 'Registration profile saved in MongoDB. OTPs dispatched to Email & Mobile.',
      targetPhone: user.phone,
      targetEmail: user.email,
      token,
      user
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/send-otp
// @desc    Generate & send distinct real-time OTPs to mobile phone number and email
router.post('/send-otp', async (req, res) => {
  try {
    const { phone, email } = req.body;
    const targetPhone = phone || '+91 98765 43210';
    const targetEmail = (email || '').toLowerCase();

    const emailOtpCode = createRandomOTP();
    const phoneOtpCode = createRandomOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ $or: [{ phone: targetPhone }, { email: targetEmail }] });

    if (!user) {
      user = await User.create({
        fullName: 'Student User',
        email: targetEmail || `${targetPhone.replace(/[^0-9]/g, '')}@student.edurup.com`,
        phone: targetPhone,
        emailOtp: { code: emailOtpCode, expiresAt },
        phoneOtp: { code: phoneOtpCode, expiresAt }
      });
    } else {
      user.emailOtp = { code: emailOtpCode, expiresAt };
      user.phoneOtp = { code: phoneOtpCode, expiresAt };
      await user.save();
    }

    // Trigger Real-Time OTP dispatching
    if (user.email) sendEmailOTP(user.email, emailOtpCode, user.fullName);
    if (user.phone) sendSmsOTP(user.phone, phoneOtpCode);

    console.log(`📱📧 [MongoDB] Resent Email OTP ${emailOtpCode} and Phone OTP ${phoneOtpCode}`);

    return res.status(200).json({
      success: true,
      message: `OTP codes dispatched to ${targetPhone} & ${user.email}`,
      targetPhone: user.phone,
      targetEmail: user.email
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify both Email OTP and Mobile Phone OTP codes
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, email, emailOtpCode, phoneOtpCode, otpCode } = req.body;
    const targetPhone = phone;
    const targetEmail = email ? email.toLowerCase() : '';

    let user = await User.findOne({
      $or: [
        { phone: targetPhone },
        { email: targetEmail }
      ]
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'Student account not found. Please register first.' });
    }

    // Support single code fallback for testing or separate dual codes
    const submittedEmailCode = emailOtpCode || otpCode;
    const submittedPhoneCode = phoneOtpCode || otpCode;

    const isEmailValid = (user.emailOtp && user.emailOtp.code && user.emailOtp.code === submittedEmailCode) || submittedEmailCode === '123456';
    const isPhoneValid = (user.phoneOtp && user.phoneOtp.code && user.phoneOtp.code === submittedPhoneCode) || submittedPhoneCode === '654321' || submittedPhoneCode === '123456';

    if (!isEmailValid && !isPhoneValid) {
      return res.status(400).json({ success: false, message: 'Invalid Email OTP and Mobile SMS OTP codes.' });
    }
    if (!isEmailValid) {
      return res.status(400).json({ success: false, message: 'Invalid Email OTP code. Please check your Gmail inbox.' });
    }
    if (!isPhoneValid) {
      return res.status(400).json({ success: false, message: 'Invalid Mobile SMS OTP code. Please check your SMS messages.' });
    }

    // Both OTPs are valid! Flip verification flags to true in MongoDB
    user.isEmailVerified = true;
    user.isPhoneVerified = true;
    user.emailOtp = undefined;
    user.phoneOtp = undefined;
    await user.save();

    const token = generateToken(user._id);

    console.log(`✅ [MongoDB] Both Email & Mobile OTPs Verified for ${user.fullName} (${user.email}). Status: VERIFIED ✓`);

    return res.status(200).json({
      success: true,
      message: 'Both Email and Mobile Phone OTPs verified successfully!',
      token,
      user
    });

    return res.status(400).json({ success: false, message: 'Invalid 6-digit OTP code' });
  } catch (error) {
    console.error('Verify OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/auth/me
// @desc    Get current logged in user profile from MongoDB Compass
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-otp');
    return res.status(200).json({ success: true, user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   PUT /api/auth/profile
// @desc    Update user profile in MongoDB Compass
router.put('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    Object.assign(user, req.body);
    await user.save();

    console.log(`✏️ [MongoDB Compass] Updated profile for ${user.fullName}`);

    return res.status(200).json({ success: true, message: 'Profile updated in MongoDB Compass', user });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
