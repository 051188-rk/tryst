const express = require('express');
const auth = require('../middleware/auth');
const Match = require('../models/match');
const Message = require('../models/message');

const router = express.Router();

router.get('/', auth, async (req,res) => {
  const matches = await Match.find({ users: req.userId }).populate('users', 'name username photos');
  res.json(matches);
});

router.get('/:id/messages', auth, async (req,res) => {
  const matchId = req.params.id;
  const messages = await Message.find({ match: matchId }).sort({ createdAt: 1 });
  res.json(messages);
});

module.exports = router;
