const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { 
    type: String, 
    required: function() { return !this.googleId; },
    select: false 
  },
  googleId: {
    type: String,
    sparse: true
  },
  role: { type: String, enum: ['patient', 'practitioner', 'admin'], required: true },
  phone: String,
  address: String,
  dateOfBirth: Date,
  profileImage: String,
  specialization: String, // for practitioners
  experience: Number, // for practitioners
  qualification: String, // for practitioners
  consultationFee: Number, // for practitioners
  earnings: {
    totalEarnings: { type: Number, default: 0 },
    monthlyEarnings: { type: Number, default: 0 },
    lastUpdated: { type: Date, default: Date.now }
  },
  availability: {
    days: [{ type: String, enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'] }],
    timeSlots: [String]
  },
  isActive: { type: Boolean, default: true },
  lastLogin: Date,
  createdAt: { type: Date, default: Date.now }
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function(password) {
  if (!this.password) return false;
  return bcrypt.compare(password, this.password);
};

userSchema.methods.getPublicProfile = function() {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

module.exports = mongoose.model('User', userSchema);