const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  match: { type: mongoose.Schema.Types.ObjectId, ref: 'Match' },
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  text: String,
  attachments: [{ url: String, public_id: String }],
  createdAt: { type: Date, default: Date.now },
  readAt: Date
});
MessageSchema.index({ match: 1, createdAt: -1 });

module.exports = mongoose.model('Message', MessageSchema);
