const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

router.post('/signup', async (req,res) => {
  try{
    const { email, password, name, username } = req.body;
    const u = new User({ email, name, username });
    await u.setPassword(password);
    await u.save();
    const token = jwt.sign({ sub: u._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
    return res.json({ token, user: { id: u._id, name: u.name, username: u.username } });
  } catch(err){
    console.error(err);
    return res.status(400).json({ error: 'Failed to signup', details: err.message });
  }
});

router.post('/login', async (req,res) => {
  try{
    const { email, password } = req.body;
    const u = await User.findOne({ email });
    if(!u) return res.status(400).json({ error: 'Invalid credentials' });
    const ok = await u.comparePassword(password);
    if(!ok) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ sub: u._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '15m' });
    return res.json({ token, user: { id: u._id, name: u.name, username: u.username } });
  } catch(err){
    console.error(err);
    return res.status(500).json({ error: 'Login failed' });
  }
});

module.exports = router;
