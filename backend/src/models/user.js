const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  passwordHash: String,
  name: String,
  username: { type: String, unique: true, sparse: true },
  dob: Date,
  gender: String,
  interestedIn: [String],
  bio: String,
  photos: [{ url: String, public_id: String, verified: {type:Boolean, default:false} }],
  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], default: [0,0] }
  },
  lastSeen: Date,
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
});

UserSchema.index({ location: '2dsphere' });

UserSchema.methods.setPassword = async function(password){
  this.passwordHash = await bcrypt.hash(password, 12);
};

UserSchema.methods.comparePassword = async function(password){
  if(!this.passwordHash) return false;
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', UserSchema);
