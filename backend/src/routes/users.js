const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/me', auth, async (req,res) => {
  const u = await User.findById(req.userId).select('-passwordHash');
  res.json(u);
});

router.post('/me', auth, async (req,res) => {
  const body = req.body;
  const u = await User.findById(req.userId);
  if(!u) return res.status(404).json({error:'Not found'});
  ['name','bio','dob','gender','interestedIn'].forEach(k => {
    if(typeof body[k] !== 'undefined') u[k] = body[k];
  });
  if(body.location && body.location.lat && body.location.lng){
    u.location = { type: 'Point', coordinates: [parseFloat(body.location.lng), parseFloat(body.location.lat)] };
  }
  await u.save();
  res.json(u);
});

module.exports = router;
