# Deployment Checklist

## Pre-Deployment Setup ✓

### Environment Configuration
- [ ] Create `server/.env` with all required variables
  - [ ] MONGO_URI (MongoDB Atlas connection string)
  - [ ] JWT_SECRET (32+ characters, generated with crypto)
  - [ ] CLOUDINARY_CLOUD_NAME, CL_API_KEY, CLOUDINARY_API_SECRET
  - [ ] CLIENT_URL (frontend domain)
  - [ ] EMAIL_USER, EMAIL_PASS (SMTP credentials)
  - [ ] ADMIN_EMAIL
  
- [ ] Create `client/.env.production` with:
  - [ ] VITE_GOOGLE_CLIENT_ID (production credentials)
  - [ ] VITE_API_URL (production backend URL)

### Security Checks
- [ ] JWT_SECRET is at least 32 characters
- [ ] Google OAuth credentials are production versions
- [ ] CORS origins are configured for production domain
- [ ] No hardcoded secrets in source code
- [ ] Environment variables use secure values
- [ ] HTTPS enabled on production domain

### Code Quality
- [ ] Run linter: `npm run lint`
- [ ] Fix any lint warnings
- [ ] Test build locally: `npm run build`
- [ ] Database queries are optimized
- [ ] No console.log() statements in production code
- [ ] Error handling is comprehensive

### Testing
- [ ] Frontend builds without errors
- [ ] Backend starts without errors
- [ ] Health endpoint responds: `/health`
- [ ] Authentication routes work
- [ ] File upload works
- [ ] Database queries work
- [ ] Contact form submissions work
- [ ] API rate limiting works

### Deployment Platform Setup
- [ ] MongoDB Atlas cluster created
- [ ] Database backups configured
- [ ] Cloudinary account set up
- [ ] Email service configured
- [ ] Google OAuth configured for production
- [ ] Domain DNS configured
- [ ] SSL/HTTPS certificate ready

## Deployment Steps ✓

### For Vercel (Frontend)
- [ ] Push code to GitHub
- [ ] Connect repository to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Verify build succeeds
- [ ] Test deployed frontend
- [ ] Configure custom domain

### For Heroku/Railway/Render (Backend)
- [ ] Create account and new application
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Configure health check endpoint
- [ ] Deploy and verify logs
- [ ] Test API endpoints
- [ ] Configure custom domain

### For Docker Deployment
- [ ] Build Docker image: `docker build -t app-name .`
- [ ] Test locally: `docker-compose up`
- [ ] Push to registry (Docker Hub, ECR, etc.)
- [ ] Deploy to container orchestration (K8s, ECS, etc.)

## Post-Deployment Verification ✓

### Health Checks
- [ ] Frontend is accessible
- [ ] Backend health endpoint responds
- [ ] Database is connected
- [ ] Can login via Google OAuth
- [ ] File uploads work
- [ ] Contact form submissions arrive

### Performance
- [ ] Frontend loads within acceptable time
- [ ] API responses are fast (<1s)
- [ ] No 500 errors in logs
- [ ] Database queries are optimized
- [ ] Rate limiting is working

### Security
- [ ] HTTPS is enforced
- [ ] CORS headers are correct
- [ ] No sensitive data in logs
- [ ] JWT tokens are working
- [ ] Authentication is required for protected routes

### Monitoring
- [ ] Logging is set up (Sentry, DataDog, etc.)
- [ ] Error tracking is enabled
- [ ] Performance monitoring is enabled
- [ ] Database backups are automated
- [ ] Uptime monitoring is configured

## Ongoing Maintenance ✓

- [ ] Set up automated backups (daily)
- [ ] Configure error notifications
- [ ] Monitor resource usage
- [ ] Update dependencies monthly
- [ ] Run security audits
- [ ] Review logs weekly
- [ ] Update SSL certificate before expiration
- [ ] Document any manual configurations

## Troubleshooting Guide

### Common Issues & Solutions

**Issue: CORS errors**
- Solution: Verify CLIENT_URL matches frontend domain
- Check: Server CORS configuration in index.js

**Issue: Database connection fails**
- Solution: Verify MONGO_URI is correct
- Check: MongoDB Atlas IP whitelist includes server IP

**Issue: File uploads fail**
- Solution: Verify Cloudinary credentials
- Check: File size limits (10MB max)

**Issue: Authentication fails**
- Solution: Verify JWT_SECRET is correct
- Check: Google OAuth credentials are production versions

**Issue: Build fails**
- Solution: Clear node_modules and reinstall
- Command: `rm -rf node_modules package-lock.json && npm install`

**Issue: High memory usage**
- Solution: Check for memory leaks
- Command: Use Node.js profiler or PM2 monitoring

---

## Rollback Procedure

If deployment has issues:

1. Check logs for specific errors
2. Revert to previous version:
   - GitHub: `git revert <commit-hash>`
   - Vercel: Use deployment history
   - Heroku: `heroku releases:rollback`

3. Verify rollback successful
4. Investigate root cause
5. Fix issue and redeploy

---

## Contact Information

**Support Resources:**
- GitHub Issues: Report bugs
- Stack Overflow: Get community help
- Documentation: See README files

---

**Last Updated:** February 2026
**Deployment Status:** Ready for production
