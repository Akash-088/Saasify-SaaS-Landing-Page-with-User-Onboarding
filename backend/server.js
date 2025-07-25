import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import crypto from 'crypto';
import { sendVerificationEmail } from './utils/email.js';
import fs from 'fs';

// Load env variables
dotenv.config();
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : undefined);
console.log('Nodemailer user:', process.env.EMAIL_USER);
console.log('Nodemailer pass:', process.env.EMAIL_PASS ? '***' : undefined);

const app = express();
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontendPath = path.join(__dirname, '../frontend');
console.log('Current directory:', __dirname);
console.log('Frontend path:', frontendPath);
console.log('Frontend exists:', fs.existsSync(frontendPath));

// Add debugging middleware first
app.use((req, res, next) => {
  console.log('Request:', req.method, req.path);
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// Add specific route for signup.html for debugging
app.get('/signup.html', (req, res) => {
  console.log('Serving signup.html from:', path.join(frontendPath, 'signup.html'));
  res.sendFile(path.join(frontendPath, 'signup.html'));
});

// Add route for /signup that redirects to /signup.html
app.get('/signup', (req, res) => {
  console.log('Redirecting /signup to /signup.html');
  res.redirect('/signup.html');
});

// Add route for login.html
app.get('/login.html', (req, res) => {
  console.log('Serving login.html from:', path.join(frontendPath, 'login.html'));
  res.sendFile(path.join(frontendPath, 'login.html'));
});

// Add route for /login that redirects to /login.html
app.get('/login', (req, res) => {
  console.log('Redirecting /login to /login.html');
  res.redirect('/login.html');
});

// Add route for dashboard.html
app.get('/dashboard.html', (req, res) => {
  console.log('Serving dashboard.html from:', path.join(frontendPath, 'dashboard.html'));
  res.sendFile(path.join(frontendPath, 'dashboard.html'));
});

// Add route for /dashboard that redirects to /dashboard.html
app.get('/dashboard', (req, res) => {
  console.log('Redirecting /dashboard to /dashboard.html');
  res.redirect('/dashboard.html');
});

app.use(express.static(frontendPath));

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/saas';
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected:', mongoUri);
}).catch((err) => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

app.post('/api/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered.' });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = new User({ username, email, password: hashedPassword, verificationToken, isVerified: false });
    await user.save();
    console.log('User saved successfully:', user.email);
    
    // Send verification email
    try {
      await sendVerificationEmail(email, verificationToken);
      console.log('Verification email sent successfully to:', email);
      return res.status(201).json({ message: 'Sign up successful! Please check your email to verify your account.' });
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // User is saved but email failed - you might want to handle this differently
      return res.status(500).json({ error: 'Account created but verification email failed to send. Please contact support.' });
    }
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

app.get('/api/verify', async (req, res) => {
  try {
    const { token } = req.query;
    if (!token) {
      return res.redirect('/sorry.html');
    }
    const user = await User.findOne({ verificationToken: token });
    if (!user) {
      return res.redirect('/sorry.html');
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return res.redirect('/thankyou.html');
  } catch (err) {
    console.error(err);
    return res.redirect('/sorry.html');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }
    
    // Find user by email
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'User not found. Please sign up first.' });
    }
    
    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password.' });
    }
    
    // Login successful
    console.log('Login successful for:', email);
    return res.status(200).json({ 
      message: 'Login successful!',
      user: { username: user.username, email: user.email }
    });
    
  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ error: 'Server error.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 