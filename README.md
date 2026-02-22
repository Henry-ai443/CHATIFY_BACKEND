# Chatify Backend API

A Node.js/Express backend for the Chatify real-time chat application. Provides RESTful APIs for authentication, messaging, and user management with WebSocket support for real-time communication.

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- PostgreSQL database
- Resend email service (for email notifications)
- Cloudinary account (for image uploads)
- Arcjet service (for DDoS protection)

## 🚀 Quick Start

### 1. Installation

```bash
cd Chatify-App-Backend
npm install
```

### 2. Environment Setup

Create a `.env` file in the root directory:

```env
# Server
PORT=3000
NODE_ENV=development

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/chatify

# Email Service (Resend)
RESEND_API_KEY=your_resend_api_key

# Image Upload (Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Security (Arcjet)
ARCJET_KEY=your_arcjet_key

# Authentication
JWT_SECRET=your_jwt_secret_key
```

### 3. Database Setup

```bash
# Create database
createdb chatify

# Run migrations (if using Prisma)
npx prisma migrate dev
```

### 4. Start Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Server will run on `http://localhost:3000`

## 📁 Project Structure

```
src/
├── controllers/        # Request handlers
│   ├── auth.controller.js
│   └── message.controller.js
├── middleware/         # Express middleware
│   ├── archjet.middleware.js    # DDoS protection
│   └── auth.middleware.js       # JWT authentication
├── models/            # Database models
│   ├── User.js
│   └── Message.js
├── routes/            # API endpoints
│   ├── auth.route.js
│   └── message.route.js
├── lib/               # Utilities
│   ├── db.js          # Database connection
│   ├── env.js         # Environment variables
│   ├── arcjet.js      # Arcjet config
│   ├── cloudinary.js  # Image upload service
│   ├── resend.js      # Email service
│   └── utils.js       # Helper functions
├── emails/            # Email templates
│   ├── emailHandlers.js
│   └── emailTemplates.js
└── server.js          # Main entry point
```

## 🔌 API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/check` | Verify session |
| PUT | `/api/auth/update-profile` | Update profile picture |
| POST | `/api/auth/logout` | Logout user |

### Messaging

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/messages/contacts/` | Get all contacts |
| GET | `/api/messages/chats` | Get chat partners |
| GET | `/api/messages/:id` | Get conversation history |
| POST | `/api/messages/send/:id` | Send message |

## 🔄 WebSocket Events

### Client → Server

- `user_online` - User comes online
- `send_message` - Send a message
- `user_typing` - User is typing
- `user_stopped_typing` - User stopped typing

### Server → Client

- `user_status_changed` - User online/offline status
- `receive_message` - Message received notification
- `new_message` - New message from contact
- `user_typing` - Contact is typing
- `user_stopped_typing` - Contact stopped typing

## 🛡️ Security Features

- **JWT Authentication** - Token-based user authentication
- **Arcjet DDoS Protection** - Rate limiting and DDoS defense
- **Password Hashing** - Bcrypt for secure password storage
- **Input Validation** - Request body validation
- **CORS** - Cross-origin resource sharing configured
- **SQL Injection Protection** - Parameterized queries (Prisma/ORM)

## 📧 Email Templates

### Available Emails

- Welcome email on signup
- Password reset confirmation
- New message notifications
- Email verification

Emails are sent via **Resend** service.

## 🖼️ Image Uploads

Profile pictures and message images are uploaded to **Cloudinary**:

- Max file size: 5MB
- Supported formats: JPG, PNG, WebP
- Auto-optimization enabled

## 🗄️ Database Schema

### Users Table

```typescript
{
  _id: ObjectId,
  fullName: string,
  email: string,
  profilePic: string,
  password: string,
  createdAt: Date,
  updatedAt: Date
}
```

### Messages Table

```typescript
{
  _id: ObjectId,
  sender: ObjectId (ref: User),
  receiver: ObjectId (ref: User),
  text: string,
  image: string,
  createdAt: Date,
  updatedAt: Date
}
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm run test:coverage
```

## 📊 Monitoring & Logging

- Request logging via middleware
- Error tracking with Arcjet
- Database query logging (development)
- WebSocket connection monitoring

## 🚨 Error Handling

Standard error response format:

```json
{
  "message": "Error description",
  "code": "ERROR_CODE",
  "status": 400
}
```

## 🔧 Available Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server (auto-reload)
npm test           # Run test suite
npm run lint       # Lint code
npm run format     # Format code with Prettier
```

## 🚀 Deployment

### Heroku

```bash
heroku create chatify-backend
heroku config:set DATABASE_URL=your_db_url
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Docker

```bash
docker build -t chatify-backend .
docker run -p 3000:3000 chatify-backend
```

## 📝 Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| PORT | Server port | No (default: 3000) |
| NODE_ENV | Environment type | No (default: development) |
| DATABASE_URL | PostgreSQL connection string | Yes |
| JWT_SECRET | JWT signing secret | Yes |
| RESEND_API_KEY | Resend email API key | Yes |
| CLOUDINARY_CLOUD_NAME | Cloudinary cloud name | Yes |
| CLOUDINARY_API_KEY | Cloudinary API key | Yes |
| CLOUDINARY_API_SECRET | Cloudinary API secret | Yes |
| ARCJET_KEY | Arcjet security key | Yes |

## 🤝 Contributing

1. Create a feature branch (`git checkout -b feature/AmazingFeature`)
2. Commit changes (`git commit -m 'Add AmazingFeature'`)
3. Push to branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

For issues and questions:
- Check existing GitHub issues
- Create a new issue with detailed description
- Contact the development team

## 📞 Contact

Email: support@chatify.com  
Discord: [Join our community](https://discord.gg/chatify)

---

**Last Updated**: February 2024  
**Version**: 1.0.0  
**Status**: Active Development
