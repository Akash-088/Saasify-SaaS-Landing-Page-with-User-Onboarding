# SaaSify - Complete SaaS Landing Page with User Onboarding

## 🚀 Overview
A modern, full-featured SaaS landing page with complete user authentication system. Built with HTML, Tailwind CSS, Node.js (Express), MongoDB, and Nodemailer. Features signup, login, email notifications, and a personalized dashboard.

## ✨ Features

### 🔐 Authentication System
- **User Registration**: Sign up with username, email, and password
- **User Login**: Secure login with email and password validation
- **Session Management**: Local storage-based user sessions
- **Logout Functionality**: Secure logout with session cleanup

### 📧 Email Integration
- **Welcome Emails**: Automatic email notifications on signup
- **Gmail SMTP**: Configured with Gmail for reliable email delivery
- **Email Templates**: Professional HTML email templates

### 🎨 User Interface
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI**: Clean, professional SaaS-style interface
- **Interactive Elements**: Flash cards, form validation, success/error messages
- **Dashboard**: Personalized user dashboard with welcome message

### 🗄️ Database
- **MongoDB Integration**: Secure user data storage
- **Password Hashing**: bcrypt encryption for security
- **User Model**: Structured data with username, email, password, and verification status

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| **Frontend** | HTML5, Tailwind CSS, Vanilla JavaScript |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Mongoose ODM) |
| **Email** | Nodemailer with Gmail SMTP |
| **Security** | bcryptjs for password hashing |
| **Styling** | Tailwind CSS (CDN) |

## 📁 Project Structure

```
saas/
├── frontend/                 # Static frontend files
│   ├── index.html           # Landing page with signup/login buttons
│   ├── signup.html          # User registration form
│   ├── login.html           # User login form
│   ├── dashboard.html       # User dashboard with logout
│   ├── thankyou.html        # Email verification success page
│   ├── sorry.html           # Email verification error page
│   ├── error.html           # General error page
│   └── signup-test.html     # Test signup page
├── backend/                  # Node.js backend
│   ├── server.js            # Main Express server
│   ├── models/
│   │   └── User.js          # MongoDB user model
│   ├── utils/
│   │   └── email.js         # Email sending utilities
│   ├── package.json         # Backend dependencies
│   └── .env                 # Environment variables
├── package.json             # Root package configuration
└── README.md               # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- Gmail account with App Password

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd saas
   ```

2. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file in `backend/` with:
   ```env
   MONGODB_URI=mongodb://localhost:27017/saas-landing
   EMAIL_USER=your-gmail@gmail.com
   EMAIL_PASS=your-gmail-app-password
   ```

4. **Start the server:**
   ```bash
   npm start
   ```

5. **Access the application:**
   - Open `http://localhost:3000` in your browser
   - The server serves both frontend and backend

## 🔧 Configuration

### MongoDB Setup
- **Local MongoDB**: Use `mongodb://localhost:27017/saas-landing`
- **MongoDB Atlas**: Use your Atlas connection string
- **Database Name**: `saas-landing` (customizable)

### Gmail Configuration
1. Enable 2-Factor Authentication on your Gmail account
2. Generate an App Password at https://myaccount.google.com/apppasswords
3. Use the App Password in your `.env` file

## 📱 User Flow

### 1. Landing Page (`/`)
- Modern SaaS landing page
- Sign Up and Login buttons
- Features and testimonials sections

### 2. Sign Up (`/signup.html`)
- Username, email, and password fields
- Client-side validation
- Stores user in MongoDB
- Sends welcome email

### 3. Login (`/login.html`)
- Email and password authentication
- Validates against MongoDB
- Stores user session in localStorage
- Redirects to dashboard

### 4. Dashboard (`/dashboard.html`)
- Personalized welcome message
- Closeable flash card
- Logout functionality
- Dashboard content (stats, actions, activity)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/signup` | User registration with email notification |
| `POST` | `/api/login` | User authentication |
| `GET` | `/api/verify` | Email verification (optional) |

## 🛡️ Security Features

- **Password Hashing**: bcryptjs with salt rounds
- **Input Validation**: Client and server-side validation
- **Email Verification**: Optional email verification system
- **Session Management**: Secure localStorage handling
- **CORS Protection**: Configured for development

## 🎨 UI Components

### Landing Page
- Hero section with call-to-action buttons
- Features grid with icons
- Testimonials section
- Professional footer

### Forms
- Clean, modern form design
- Real-time validation
- Success/error message display
- Responsive layout

### Dashboard
- Header with user info and logout
- Flash card with close functionality
- Grid layout for content cards
- Professional styling

## 🚀 Deployment

### Local Development
- Backend runs on `http://localhost:3000`
- Frontend served by Express
- MongoDB local instance

### Production Considerations
- Use environment variables for sensitive data
- Set up proper MongoDB Atlas cluster
- Configure production email service
- Add HTTPS and security headers
- Set up proper logging and monitoring

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support

For issues and questions:
- Check the console logs for debugging
- Verify MongoDB connection
- Ensure Gmail credentials are correct
- Check browser console for frontend errors

---
