import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  verificationToken: { type: String },
  isVerified: { type: Boolean, default: false }
});

const User = mongoose.model('User', userSchema);
export default User; 