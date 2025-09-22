const mongoose = require('mongoose');

const SwipeSchema = new mongoose.Schema({
  from: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  to: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['like','dislike','superlike'], default: 'like' },
  createdAt: { type: Date, default: Date.now }
});
SwipeSchema.index({ from: 1 });
SwipeSchema.index({ to: 1 });

module.exports = mongoose.model('Swipe', SwipeSchema);
