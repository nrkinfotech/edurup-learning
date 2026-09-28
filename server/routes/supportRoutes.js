const express = require('express');
const router = express.Router();
const Ticket = require('../models/Ticket');

// @route   POST /api/support/ticket
// @desc    Submit a support ticket and save to MongoDB Compass
router.post('/ticket', async (req, res) => {
  try {
    const { fullName, email, phone, category, message } = req.body;

    const name = fullName || req.body['Full Name'] || 'Student User';
    const mail = email || req.body['Email Address'] || 'not_provided@edurup.app';
    const mobile = phone || req.body['Phone Number'] || req.body['Contact Number'] || '+91 9876543210';
    const topic = category || req.body['Category'] || req.body['Subject / Topic'] || req.body['_subject'] || 'General Support';
    const text = message || req.body['Question Message'] || req.body['Your Query / Issue Details'] || req.body['details'] || 'No detailed message provided.';

    const ticket = await Ticket.create({
      fullName: name,
      email: mail,
      phone: mobile,
      category: topic,
      message: text
    });

    console.log(`🎫 [MongoDB Compass] Support Ticket #${ticket._id} created for ${name} (${topic})`);

    return res.status(201).json({
      success: true,
      message: 'Support ticket saved in MongoDB Compass',
      ticket
    });
  } catch (error) {
    console.error('Support Ticket Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

// @route   GET /api/support/tickets
// @desc    Get all support tickets from MongoDB Compass
router.get('/tickets', async (req, res) => {
  try {
    const tickets = await Ticket.find().sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: tickets.length, tickets });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
