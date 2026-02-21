# Production Deployment Quick Reference

## 🚀 One-Line Deployment Guide

### Frontend (Vercel)
```bash
# Platform: Vercel.com
# Time: ~2 minutes
# Cost: Free tier available
# Step: Push to GitHub → Import to Vercel → Done
```

### Backend (Heroku)
```bash
# Platform: Heroku.com
# Time: ~5 minutes
# Cost: Free tier removed, starting from $7/month
# Step: heroku create → set env vars → git push heroku main
```

### Backend (Railway)
```bash
# Platform: Railway.app
# Time: ~3 minutes
# Cost: Pay-as-you-go, $5 free monthly credit
# Step: Connect GitHub → Set env vars → Deploy
```

## 📋 Pre-Deployment Checklist (5 minutes)

```bash
# 1. Verify setup
npm run verify-env

# 2. Build frontend
npm run build:prod

# 3. Test backend locally
cd server && npm run dev

# 4. Test health endpoint
curl http://localhost:8000/health
```

## 🔑 Required Credentials (Get these first)

- [ ] MongoDB Atlas URI
- [ ] Cloudinary credentials (3 values)
- [ ] Google OAuth Client ID & Secret
- [ ] Email credentials (optional)

## 📦 Environment Variables

### Backend (server/.env)
```env
MONGO_URI=mongodb+srv://...
JWT_SECRET=<generate-new-32-char-string>
CLOUDINARY_CLOUD_NAME=...
CL_API_KEY=...
CLOUDINARY_API_SECRET=...
CLIENT_URL=https://your-frontend-domain.com
PORT=8000
NODE_ENV=production
```

### Frontend (client/.env.production)
```env
VITE_GOOGLE_CLIENT_ID=...
VITE_API_URL=https://your-backend-domain.com/api
```

## 🌐 Domain Setup (After Deploying)

| Component | Domain Pattern | Provider |
|-----------|----------------|----------|
| Frontend | `yourdomain.com` | Vercel (auto) |
| Backend API | `api.yourdomain.com` | Heroku/Railway/Custom |
| Database | `cluster.mongodb.net` | MongoDB Atlas |

## ⚡ Deploy in 3 Steps

### Step 1: Frontend (2 min)
```bash
# Go to https://vercel.com
# Click "Import Project" 
# Select your GitHub repo
# Set VITE_GOOGLE_CLIENT_ID and VITE_API_URL
# Deploy
```

### Step 2: Backend (3 min)
```bash
# Option A: Heroku
heroku login
heroku create your-app-name
heroku config:set MONGO_URI=... JWT_SECRET=... (etc)
git push heroku main

# Option B: Railway
# Visit railway.app → New Project → GitHub → Set env vars → Deploy
```

### Step 3: Verify (1 min)
```bash
# Test frontend
curl https://your-frontend-domain.com

# Test backend
curl https://your-backend-domain.com/health

# Should return: {"status":"OK","database":"connected"}
```

## 🛠️ Common Commands

```bash
# Install everything
npm run install:all

# Local development
npm run dev

# Build for production
npm run build:prod

# Verify setup
npm run verify-env

# Backend only
cd server && npm run dev

# Frontend only
cd client && npm run dev

# Production server
npm run start:prod
```

## 🔧 Troubleshooting (2 min fixes)

| Problem | Solution |
|---------|----------|
| Build fails | Clear cache: `rm -rf node_modules && npm install` |
| API not responding | Check VITE_API_URL matches backend domain |
| 404 errors | Verify routes exist, check CORS config |
| Database fails | Test MongoDB URI in command line |
| Deployment fails | Check all env vars are set in platform |

## 📞 Getting Help

1. **Check Docs**: `DEPLOYMENT_GUIDE.md`
2. **Check Checklist**: `DEPLOYMENT_CHECKLIST.md`
3. **Check API Docs**: `API_DOCUMENTATION.md`
4. **Run Verification**: `scripts/verify-deployment.ps1`

## 💾 Database Backup

```bash
# MongoDB Atlas automatic backups
# Dashboard → Cluster → Backup
# Or manual: mongodump --uri "mongodb+srv://..."
```

## 📊 Monitoring

Set up free monitoring:
- **Uptime**: UptimeRobot.com
- **Errors**: Sentry.io
- **Logs**: Check platform dashboard
- **Performance**: New Relic (free tier)

## 🔐 Security

- ✅ HTTPS forced on Vercel
- ✅ Secrets encrypted in platform
- ✅ Rate limiting enabled
- ✅ CORS configured
- ✅ JWT tokens secure

## 📱 Test API Endpoints

```bash
# Health check
curl https://api.yourdomain.com/health

# Login
curl -X POST https://api.yourdomain.com/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"pass"}'

# Get courses
curl https://api.yourdomain.com/api/courses

# Upload file (requires auth)
curl -X POST https://api.yourdomain.com/api/upload \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "file=@myfile.png"
```

## 🚀 Performance Tips

1. Enable CDN: Vercel (automatic)
2. Optimize images: Already done in Vite config
3. Database indexes: Create on frequently queried fields
4. Caching: Configure in backend
5. Monitoring: Set up New Relic

## ✅ Post-Deployment Checklist (5 min)

- [ ] Frontend loads in browser
- [ ] Backend health endpoint responds
- [ ] Can login with Google OAuth
- [ ] Can upload files
- [ ] Contact form sends emails
- [ ] Database is connected
- [ ] No errors in logs
- [ ] Response times < 1 second

---

## Everything You Need Files

All documentation is in the root directory:
- `DEPLOYMENT_GUIDE.md` ← **Start here**
- `DEPLOYMENT_CHECKLIST.md`
- `ENVIRONMENT_SETUP.md`
- `API_DOCUMENTATION.md`
- `DEPLOYMENT_READY.md`

---

**Total Deployment Time: ~10 minutes** ⏱️
**Difficulty Level: Easy** 😊

---

Created: February 2026
