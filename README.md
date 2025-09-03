# AyurSutra Backend API

Backend API for the AyurSutra Panchakarma Patient Management System.

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- MongoDB (local or Atlas)

### Setup
1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment**
   ```bash
   cp .env.example .env
   # Edit .env with your MongoDB URI and secrets
   ```

3. **Start Server**
   ```bash
   npm run dev
   ```

4. **Access**
   - API: http://localhost:8000

## 🔧 Environment Variables

Create `.env` file with:
```env
MONGODB_URI=mongodb://localhost:27017/ayursutra
JWT_SECRET=your_32_character_secret_here
SESSION_SECRET=your_32_character_secret_here
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## 📱 API Features
- User authentication (JWT + Google OAuth)
- Patient management
- Practitioner management
- Booking system
- Notification system
- Admin dashboard

## 🛠 Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Auth**: JWT, bcrypt, Passport.js
- **Security**: Helmet, CORS, XSS protection

## 📚 API Documentation
See `API_DOCUMENTATION.md` for detailed endpoint documentation.

## 🚀 Deployment
- **Vercel**: Configured with `vercel.json`
- **Railway**: Compatible
- **Heroku**: Compatible