const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  lastMessageAt: Date,
  isActive: { type: Boolean, default: true }
});
MatchSchema.index({ users: 1 });

module.exports = mongoose.model('Match', MatchSchema);
