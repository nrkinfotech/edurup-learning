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

const bcrypt = require('bcryptjs');

// @route   POST /api/auth/signup
// @desc    Register a new student profile with password in MongoDB
router.post('/signup', async (req, res) => {
  try {
    const {
      'Full Name': fullName,
      'Email Address': email,
      'Phone Number': phone,
      'Create Password': rawPasswordInput,
      password: rawPasswordBody,
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
    const userPassword = rawPasswordInput || rawPasswordBody || req.body['Password'] || 'Edurup@123';

    if (!userEmail || !userPhone) {
      return res.status(400).json({ success: false, message: 'Email Address and Phone Number are required' });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    let areasOfInterest = ['Data Analytics', 'Data Science', 'AI & ML', 'Digital Marketing'];
    if (areasOfInterestStr) {
      if (Array.isArray(areasOfInterestStr)) {
        areasOfInterest = areasOfInterestStr;
      } else if (typeof areasOfInterestStr === 'string') {
        areasOfInterest = areasOfInterestStr.split(',').map(s => s.trim());
      }
    }

    let user = await User.findOne({ $or: [{ email: userEmail.toLowerCase() }, { phone: userPhone }] });

    if (user) {
      user.fullName = userName;
      user.email = userEmail.toLowerCase();
      user.phone = userPhone;
      user.password = hashedPassword;
      user.isEmailVerified = true;
      user.isPhoneVerified = true;
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
      await user.save();
    } else {
      user = await User.create({
        fullName: userName,
        email: userEmail.toLowerCase(),
        phone: userPhone,
        password: hashedPassword,
        isEmailVerified: true,
        isPhoneVerified: true,
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
        howDidYouHear: howDidYouHear || 'Instagram'
      });
    }

    const token = generateToken(user._id);

    console.log(`👤 [MongoDB] User Registered Successfully: ${user.fullName} (${user.phone})`);

    return res.status(200).json({
      success: true,
      message: 'Registration successful! Profile saved to MongoDB.',
      token,
      user
    });
  } catch (error) {
    console.error('Signup Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   POST /api/auth/signin
// @desc    Authenticate user with Phone Number & Password
router.post('/signin', async (req, res) => {
  try {
    const { phone, email, password } = req.body;
    const targetPhone = phone || req.body['Phone Number'] || req.body['Mobile Phone Number'];
    const targetEmail = email ? email.toLowerCase() : '';
    const userPassword = password || req.body['Password'];

    if ((!targetPhone && !targetEmail) || !userPassword) {
      return res.status(400).json({ success: false, message: 'Phone Number/Email and Password are required.' });
    }

    let user = await User.findOne({
      $or: [
        { phone: targetPhone },
        { email: targetEmail },
        { email: (targetPhone || '').toLowerCase() }
      ]
    });

    if (!user) {
      return res.status(401).json({ success: false, message: 'No registered account found with this Phone Number or Email address. Please sign up first.' });
    }

    // If user exists and has a password
    if (user.password) {
      const isMatch = await bcrypt.compare(userPassword, user.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, message: 'Incorrect Password. Please check your password and try again.' });
      }
    } else {
      // Set password if logging in for first time
      user.password = await bcrypt.hash(userPassword, 10);
      await user.save();
    }

    user.isEmailVerified = true;
    user.isPhoneVerified = true;
    await user.save();

    const token = generateToken(user._id);

    console.log(`🔐 [MongoDB] User Signed In Successfully: ${user.fullName} (${user.phone})`);

    return res.status(200).json({
      success: true,
      message: 'Signed in successfully!',
      token,
      user
    });
  } catch (error) {
    console.error('Sign In Error:', error);
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
