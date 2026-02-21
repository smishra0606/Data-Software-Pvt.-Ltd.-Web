# Deployment Readiness Documentation

## 🚀 Project Deployment Guide

This document provides a comprehensive guide to deploy your full-stack learning platform application.

---

## Prerequisites

Before deploying, ensure you have:

1. **MongoDB Atlas Account**
   - Create a cluster at https://www.mongodb.com/cloud/atlas
   - Get connection string with credentials

2. **Cloudinary Account**
   - Sign up at https://cloudinary.com
   - Get Cloud Name, API Key, and API Secret

3. **Gmail Account** (for email notifications)
   - Enable "Less secure app access" or use App Passwords
   - Get SMTP credentials

4. **Google OAuth Setup**
   - Create OAuth credentials at https://console.cloud.google.com
   - Get Client ID and Client Secret

5. **Node.js & npm**
   - Install Node.js 18+ from https://nodejs.org

---

## Environment Setup

### Server Environment Variables (server/.env)

Required variables for production:

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/learning-platform
JWT_SECRET=<generate-secure-random-32-char-string>
CLOUDINARY_CLOUD_NAME=your_cloud_name
CL_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=https://yourdomain.com
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
ADMIN_EMAIL=admin@yourdomain.com
```

**Generate JWT_SECRET securely:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Client Environment Variables (client/.env.production)

```env
NODE_ENV=production
VITE_GOOGLE_CLIENT_ID=your_production_client_id
VITE_API_URL=https://api.yourdomain.com/api
```

---

## Deployment Options

### Option 1: Deploy Frontend to Vercel (Recommended)

1. **Push code to GitHub**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit https://vercel.com
   - Click "Import Project"
   - Select your GitHub repository
   - Configuration:
     - **Root Directory:** `client`
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Set Environment Variables**
   - In Vercel Project Settings > Environment Variables, add:
     - `VITE_GOOGLE_CLIENT_ID`
     - `VITE_API_URL` (your backend API URL)

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically deploy on every push to main

---

### Option 2: Deploy Backend to Heroku (or Railway/Render)

#### Using Heroku:

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   heroku login
   ```

2. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

3. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=your_mongodb_uri
   heroku config:set JWT_SECRET=your_secure_jwt
   heroku config:set CLOUDINARY_CLOUD_NAME=your_cloud_name
   # ... set other required variables
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

#### Using Railway:

1. Visit https://railway.app
2. Click "New Project"
3. Select "Deploy from GitHub"
4. Choose your repository
5. Set environment variables in Railway dashboard
6. Deploy

#### Using Render:

1. Visit https://render.com
2. Click "New Web Service"
3. Connect GitHub repository
4. Configuration:
   - **Build Command:** `npm install`
   - **Start Command:** `node server/index.js`
5. Set environment variables
6. Deploy

---

### Option 3: Docker Deployment

1. **Create Dockerfile in root (optional)**
   ```dockerfile
   FROM node:18-alpine
   WORKDIR /app
   COPY package*.json ./
   RUN npm install
   COPY . .
   EXPOSE 8000
   CMD ["npm", "start"]
   ```

2. **Create docker-compose for local testing**
   ```bash
   docker-compose up
   ```

3. **Deploy to Docker Hub, AWS ECS, or similar**

---

## Pre-Deployment Checklist

- [ ] All environment variables set correctly
- [ ] MongoDB Atlas cluster created and connection string obtained
- [ ] Cloudinary account set up with credentials
- [ ] Gmail SMTP configured
- [ ] Google OAuth credentials created
- [ ] CORS origins configured correctly
- [ ] Frontend build tested locally: `npm run build`
- [ ] Backend tested locally: `npm run dev`
- [ ] All dependencies installed: `npm install`
- [ ] Git repository is up to date
- [ ] No hardcoded sensitive data in codebase
- [ ] Error logging configured
- [ ] Backup of database configured
- [ ] SSL/HTTPS enabled (automatic on Vercel/Heroku)
- [ ] Database indexes created for performance
- [ ] Rate limiting configured appropriately
- [ ] CORS headers configured for production domain

---

## Post-Deployment Verification

1. **Test Health Endpoint**
   ```bash
   curl https://your-api.com/health
   ```

2. **Test Authentication**
   - Try logging in with Google OAuth
   - Verify JWT token generation

3. **Test API Endpoints**
   - Verify course endpoints
   - Test upload functionality
   - Check contact form

4. **Monitor Logs**
   - Check application logs for errors
   - Monitor database performance
   - Watch API response times

5. **Test User Workflows**
   - Sign up and login
   - Upload files
   - Complete courses
   - Submit contact form

---

## Monitoring & Maintenance

### Recommended Monitoring Tools

- **PM2** (for local/VPS): Process monitoring
- **New Relic**: Application performance monitoring
- **Sentry**: Error tracking
- **Datadog**: Infrastructure monitoring
- **LogRocket**: Frontend monitoring

### Database Backups

```bash
# MongoDB Atlas automatic backups (enable in dashboard)
# Or use mongodump for manual backups
mongodump --uri "mongodb+srv://user:pass@cluster.mongodb.net/database"
```

### Security Updates

- Regularly update dependencies:
  ```bash
  npm update
  npm audit
  npm audit fix
  ```

- Keep Node.js updated
- Monitor security advisories

---

## Troubleshooting

### Database Connection Issues

```bash
# Test MongoDB connection
node -e "const mongoose = require('mongoose'); mongoose.connect(process.env.MONGO_URI)"
```

### CORS Errors

- Verify `CLIENT_URL` environment variable matches frontend domain
- Check browser console for exact error
- Ensure credentials: true in CORS config (if using cookies)

### Build Failures

```bash
# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Rate Limiting Issues

- Check IP addresses being blocked
- Adjust rate limit config if needed
- Use trusted proxy settings

---

## Performance Optimization

1. **Frontend**
   - Code splitting enabled in vite.config.ts
   - Terser minification configured
   - Source maps disabled in production
   - Image optimization recommended

2. **Backend**
   - Database indexes on frequently queried fields
   - Connection pooling enabled
   - Rate limiting active
   - Gzip compression enabled

3. **General**
   - CDN for static assets
   - Database query optimization
   - Caching strategies
   - Load balancing for scalability

---

## Support & Resources

- **Documentation**: See README.md files in each directory
- **Issue Tracking**: GitHub Issues
- **Community Help**: Stack Overflow, GitHub Discussions

---

## Quick Start Commands

```bash
# Install all dependencies
npm run install:all

# Development
npm run dev

# Build frontend
npm run build

# Start production server
npm start

# Verify environment
npm run verify-env
```

---

Last Updated: February 2026
