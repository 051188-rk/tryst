const express = require('express');
const User = require('../models/user');
const Swipe = require('../models/swipe');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const u = await User.findById(req.userId).select('-passwordHash');
  res.json(u);
});

router.post('/me', auth, async (req, res) => {
  const body = req.body;
  const u = await User.findById(req.userId);
  if (!u) return res.status(404).json({ error: 'Not found' });
  ['name', 'bio', 'dob', 'gender', 'interestedIn', 'photos'].forEach(k => {
    if (typeof body[k] !== 'undefined') u[k] = body[k];
  });
  if (body.location && body.location.lat && body.location.lng) {
    u.location = { type: 'Point', coordinates: [parseFloat(body.location.lng), parseFloat(body.location.lat)] };
  }
  await u.save();
  res.json(u);
});

// Get potential matches (users not yet swiped on)
router.get('/', auth, async (req, res) => {
  try {
    const swipedUserIds = await Swipe.find({ from: req.userId }).distinct('to');
    const users = await User.find({
      _id: { $ne: req.userId, $nin: swipedUserIds },
      isActive: true
    })
      .select('-passwordHash')
      .limit(20);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Get specific user profile
router.get('/:id', auth, async (req, res) => {
  try {
    const u = await User.findById(req.params.id).select('-passwordHash');
    if (!u) return res.status(404).json({ error: 'User not found' });
    res.json(u);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

module.exports = router;
