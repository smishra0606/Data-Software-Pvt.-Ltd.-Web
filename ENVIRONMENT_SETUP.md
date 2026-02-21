# Deployment Configuration Guide

This document explains how to prepare environment variables for deployment across different platforms.

## Environment Variable Structure

The project uses environment-specific configuration:

- **Development**: `.env` (for local development, includes default values)
- **Production**: `.env.production` (for production builds)
- **Local Overrides**: `.env.local` or `.env.production.local` (NOT committed to Git)

## Frontend (Client) Environment Variables

### Development (`.env`)
Used locally during development and accessible in all builds.

```env
VITE_GOOGLE_CLIENT_ID=1058460127761-30quv1uo0b0or70thtrakuja2uft4ufn.apps.googleusercontent.com
VITE_API_URL=http://localhost:8000/api
```

### Production (`.env.production`)
Automatically used when running `npm run build` or via Vercel deployment.

```env
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
VITE_API_URL=https://api.yourdomain.com/api
```

### Local Production Override (`.env.production.local`)
Use this for local testing of production build:

```env
VITE_GOOGLE_CLIENT_ID=your_production_google_client_id
VITE_API_URL=https://api.yourdomain.com/api
```

**Note:** Never commit `.env.production.local` to Git (already in .gitignore)

## Backend (Server) Environment Variables

### Development (`.env`)
Used locally with `npm run dev`.

```env
NODE_ENV=development
PORT=8000
MONGO_URI=mongodb://localhost:27017/learning-platform
JWT_SECRET=dev-secret-32-chars-minimum-for-testing
CLOUDINARY_CLOUD_NAME=your_dev_cloud_name
CL_API_KEY=your_dev_api_key
CLOUDINARY_API_SECRET=your_dev_api_secret
CLIENT_URL=http://localhost:3000
```

### Production (`.env.production`)
Used in production environment.

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/learning-platform
JWT_SECRET=generated_secure_production_secret
CLOUDINARY_CLOUD_NAME=your_prod_cloud_name
CL_API_KEY=your_prod_api_key
CLOUDINARY_API_SECRET=your_prod_api_secret
CLIENT_URL=https://yourdomain.com
```

### Local Production Override (`.env.production.local`)
For local testing before deployment:

```env
NODE_ENV=production
PORT=8000
MONGO_URI=mongodb+srv://user:pass@cluster.mongodb.net/learning-platform
JWT_SECRET=your_test_production_secret
```

## Platform-Specific Deployment

### Vercel (Frontend)

1. **Connect GitHub Repository**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Select root directory: `client`

2. **Set Environment Variables**
   ```
   Settings > Environment Variables
   ```
   
   Add these for production:
   - `VITE_GOOGLE_CLIENT_ID` = your production client ID
   - `VITE_API_URL` = https://your-backend-domain.com/api

3. **Automatic Deployment**
   - Every push to `main` automatically deploys
   - Preview deployments for pull requests

### Heroku (Backend)

1. **Create Heroku App**
   ```bash
   heroku create your-app-name
   ```

2. **Set Environment Variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set MONGO_URI=mongodb+srv://...
   heroku config:set JWT_SECRET=your_secure_secret
   heroku config:set CLOUDINARY_CLOUD_NAME=...
   heroku config:set CL_API_KEY=...
   heroku config:set CLOUDINARY_API_SECRET=...
   heroku config:set CLIENT_URL=https://yourdomain.com
   ```

3. **Deploy**
   ```bash
   git push heroku main
   ```

### Railway

1. **Create New Service**
   - Connect GitHub repository
   - Auto-detects Node.js project

2. **Set Environment Variables**
   - Dashboard > Variables
   - Add all required `.env` variables

3. **Deploy Automatically**
   - Deploys on every push to main

### Docker Deployment

1. **Build Image**
   ```bash
   docker build -t learning-platform-server -f server/Dockerfile .
   ```

2. **Set Environment Variables via Docker**
   ```bash
   docker run \
     -e NODE_ENV=production \
     -e MONGO_URI=mongodb+srv://... \
     -e JWT_SECRET=your_secret \
     -p 8000:8000 \
     learning-platform-server
   ```

   Or use `.env` file:
   ```bash
   docker run --env-file server/.env.production -p 8000:8000 learning-platform-server
   ```

## Generating Secure Secrets

### Generate JWT_SECRET
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -base64 32
```

### Generate Google OAuth Credentials
1. Visit https://console.cloud.google.com
2. Create OAuth 2.0 credentials
3. Set Authorized redirect URIs for production domain
4. Copy Client ID and Secret

## Verifying Environment Setup

### Frontend
```bash
# Check if environment variables are loaded
cd client
npm run build -- --mode production

# Verify by checking the built files
grep "VITE_API_URL" dist/index.html
```

### Backend
```bash
# Start server and verify connection
cd server
npm run dev

# Should see: ✅ Connected to MongoDB
#           ✅ Server running on port 8000
```

## Security Best Practices

1. ✅ Never commit `.env` files to Git
2. ✅ Use `.env.example` for documentation
3. ✅ Generate unique secrets for each environment
4. ✅ Rotate secrets regularly
5. ✅ Use platform-specific secret management:
   - Vercel: Environment Variables (encrypted)
   - Heroku: Config Vars (encrypted)
   - Railway: Variables (encrypted)
6. ✅ Disable console logging in production
7. ✅ Use HTTPS only in production
8. ✅ Implement rate limiting
9. ✅ Sanitize all inputs
10. ✅ Keep dependencies updated

## Troubleshooting

### "API is not responding"
- Check `VITE_API_URL` matches backend domain
- Verify backend is deployed and running
- Check CORS configuration

### "Database connection failed"
- Verify `MONGO_URI` is correct
- Check IP whitelist in MongoDB Atlas
- Ensure production database is accessible

### "Build fails in Vercel"
- Check all environment variables are set
- Verify build command: `npm run build`
- Check source maps are disabled in production

### "Secrets not working"
- Ensure variables are prefixed correctly (VITE_ for frontend)
- Check platform-specific variable naming
- Redeploy after changing environment variables

## References

- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Node.js Environment Variables](https://nodejs.org/en/knowledge/file-system/how-to-use-the-fs-module/)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Heroku Config Vars](https://devcenter.heroku.com/articles/config-vars)

---

Last Updated: February 2026
