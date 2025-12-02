const express = require('express');
const auth = require('../middleware/auth');
const Match = require('../models/match');
const Message = require('../models/message');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const matches = await Match.find({ users: req.userId }).populate('users', 'name username photos');

    // Get unread message counts for each match
    const matchesWithUnread = await Promise.all(matches.map(async (match) => {
      const unreadCount = await Message.countDocuments({
        match: match._id,
        sender: { $ne: req.userId },
        readBy: { $ne: req.userId }
      });

      // Get last message
      const lastMessage = await Message.findOne({ match: match._id })
        .sort({ createdAt: -1 })
        .select('text createdAt sender');

      return {
        ...match.toObject(),
        unreadCount,
        lastMessage
      };
    }));

    res.json(matchesWithUnread);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch matches' });
  }
});

router.get('/:id/messages', auth, async (req, res) => {
  const matchId = req.params.id;
  const messages = await Message.find({ match: matchId }).sort({ createdAt: 1 });

  // Mark messages as read by current user
  await Message.updateMany(
    {
      match: matchId,
      sender: { $ne: req.userId },
      readBy: { $ne: req.userId }
    },
    {
      $addToSet: { readBy: req.userId },
      $set: { readAt: new Date() }
    }
  );

  res.json(messages);
});

module.exports = router;
