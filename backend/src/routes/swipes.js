const express = require('express');
const auth = require('../middleware/auth');
const Swipe = require('../models/swipe');
const Match = require('../models/match');

const router = express.Router();

router.post('/', auth, async (req,res) => {
  const { to, type } = req.body;
  if(!to) return res.status(400).json({ error: 'Missing "to" user id' });
  const existing = await Swipe.findOne({ from: req.userId, to });
  if(existing) return res.status(400).json({ error: 'Already swiped' });

  const s = await Swipe.create({ from: req.userId, to, type: type || 'like' });

  if(s.type === 'like'){
    const reciprocal = await Swipe.findOne({ from: to, to: req.userId, type: 'like' });
    if(reciprocal){
      let m = await Match.findOne({ users: { $all: [req.userId, to] } });
      if(!m){
        m = await Match.create({ users: [req.userId, to] });
      }
      return res.json({ ok: true, match: m });
    }
  }

  res.json({ ok: true, swipe: s });
});

module.exports = router;
