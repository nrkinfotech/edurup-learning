const express = require('express');
const router = express.Router();

// Get configured Razorpay Key ID for client checkout
router.get('/key', (req, res) => {
  const keyId = process.env.RAZORPAY_KEY_ID || '';
  return res.status(200).json({ success: true, keyId });
});

// Create Razorpay Order endpoint
router.post('/create-order', async (req, res) => {
  try {
    const { amount, programName } = req.body;
    const razorpayKey = process.env.RAZORPAY_KEY_ID;
    const razorpaySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKey || !razorpaySecret) {
      return res.status(200).json({
        success: false,
        fallbackMode: true,
        message: 'Razorpay keys not configured in .env yet',
        keyId: razorpayKey || ''
      });
    }

    const Razorpay = require('razorpay');
    const instance = new Razorpay({
      key_id: razorpayKey,
      key_secret: razorpaySecret,
    });

    const options = {
      amount: (amount || 9999) * 100, // Amount in paise
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: { programName: programName || 'Internship Program' }
    };

    const order = await instance.orders.create(options);
    return res.status(200).json({ success: true, order, keyId: razorpayKey });
  } catch (error) {
    console.error('Razorpay Create Order Error:', error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
