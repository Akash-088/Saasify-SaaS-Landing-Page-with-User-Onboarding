import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Email utility - EMAIL_USER:', process.env.EMAIL_USER);
console.log('Email utility - EMAIL_PASS:', process.env.EMAIL_PASS ? '***' : undefined);

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendVerificationEmail(to, token) {
  try {
    const verifyUrl = `http://localhost:3000/api/verify?token=${token}`;
    console.log('Sending email to:', to);
    console.log('Verification URL:', verifyUrl);
    
    const result = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: 'Verify your email',
      html: `<h2>Welcome!</h2><p>Please verify your email by clicking <a href="${verifyUrl}">here</a>.</p>`
    });
    
    console.log('Email sent successfully:', result.messageId);
    return result;
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
} 