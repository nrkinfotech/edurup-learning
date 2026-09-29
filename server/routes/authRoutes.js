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

    const otpCode = createRandomOTP();
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
      user.otp = { code: otpCode, expiresAt };
      await user.save();
    } else {
      // Create new user in MongoDB Compass
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
        otp: { code: otpCode, expiresAt }
      });
    }

    const token = generateToken(user._id);

    // Trigger Real-Time OTP dispatching via Email & SMS
    sendEmailOTP(user.email, otpCode, user.fullName);
    sendSmsOTP(user.phone, otpCode);

    console.log(`📱 [MongoDB Compass] Registration saved for ${user.fullName} (${user.phone}). Generated OTP: ${otpCode}`);

    return res.status(200).json({
      success: true,
      message: 'Registration profile saved in MongoDB Compass',
      otpCode,
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
// @desc    Generate & send real-time OTP to mobile phone number and email
router.post('/send-otp', async (req, res) => {
  try {
    const { phone, email } = req.body;
    const targetPhone = phone || '+91 98765 43210';

    const otpCode = createRandomOTP();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

    let user = await User.findOne({ $or: [{ phone: targetPhone }, { email: (email || '').toLowerCase() }] });

    if (!user) {
      user = await User.create({
        fullName: 'Student User',
        email: email ? email.toLowerCase() : `${targetPhone.replace(/[^0-9]/g, '')}@student.edurup.com`,
        phone: targetPhone,
        otp: { code: otpCode, expiresAt }
      });
    } else {
      user.otp = { code: otpCode, expiresAt };
      await user.save();
    }

    // Trigger Real-Time OTP dispatching via Email & SMS
    if (user.email) sendEmailOTP(user.email, otpCode, user.fullName);
    if (user.phone) sendSmsOTP(user.phone, otpCode);

    console.log(`📱 [MongoDB Compass] Generated OTP ${otpCode} for phone: ${targetPhone}`);

    return res.status(200).json({
      success: true,
      message: `OTP code sent to ${targetPhone} & ${user.email}`,
      otpCode,
      targetPhone: user.phone,
      targetEmail: user.email
    });
  } catch (error) {
    console.error('Send OTP Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify 6-digit OTP code and sign in
router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, email, otpCode } = req.body;
    const target = phone || email;

    let user = await User.findOne({ $or: [{ phone: target }, { email: target ? target.toLowerCase() : '' }] });

    if (!user) {
      // Create user if testing
      user = await User.create({
        fullName: 'Rahul Kumar',
        email: 'rahul@gmail.com',
        phone: target || '+91 98765 43210',
        isEmailVerified: true,
        isPhoneVerified: true
      });
    }

    // Verify OTP code against MongoDB record (or demo code '123456')
    const isValidCode = (user.otp && user.otp.code && user.otp.code === otpCode) || otpCode === '123456';

    if (isValidCode) {
      user.isEmailVerified = true;
      user.isPhoneVerified = true;
      user.otp = undefined; // Clear OTP once verified
      await user.save();

      const token = generateToken(user._id);

      console.log(`✅ [MongoDB Compass] OTP Verified for ${user.fullName} (${user.email}). Status: VERIFIED ✓`);

      return res.status(200).json({
        success: true,
        message: 'OTP verified successfully for both Email and Phone Number.',
        token,
        user
      });
    }

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
