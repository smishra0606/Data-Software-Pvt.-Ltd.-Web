#!/bin/bash

# Pre-deployment verification script
# Run this before deploying to ensure all required configurations are in place

echo "🔍 Starting pre-deployment verification..."
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    exit 1
fi
echo "✅ Node.js version: $(node --version)"

# Check npm
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed"
    exit 1
fi
echo "✅ npm version: $(npm --version)"

# Check required environment files
echo ""
echo "📝 Checking environment files..."

if [ ! -f "server/.env" ]; then
    echo "⚠️  Warning: server/.env file not found. Copy from .env.example"
else
    echo "✅ server/.env exists"
fi

if [ ! -f "client/.env" ]; then
    echo "⚠️  Warning: client/.env file not found. Copy from .env.example"
else
    echo "✅ client/.env exists"
fi

# Check critical environment variables
echo ""
echo "🔐 Checking critical environment variables..."

if grep -q "MONGO_URI" server/.env 2>/dev/null; then
    echo "✅ MONGO_URI configured in server/.env"
else
    echo "⚠️  MONGO_URI not found in server/.env"
fi

if grep -q "JWT_SECRET" server/.env 2>/dev/null; then
    echo "✅ JWT_SECRET configured in server/.env"
else
    echo "⚠️  JWT_SECRET not found in server/.env"
fi

if grep -q "VITE_API_URL" client/.env 2>/dev/null; then
    echo "✅ VITE_API_URL configured in client/.env"
else
    echo "⚠️  VITE_API_URL not found in client/.env"
fi

# Check package.json files
echo ""
echo "📦 Checking package.json files..."

if [ -f "package.json" ]; then
    echo "✅ Root package.json exists"
else
    echo "❌ Root package.json not found"
    exit 1
fi

if [ -f "server/package.json" ]; then
    echo "✅ Server package.json exists"
else
    echo "❌ Server package.json not found"
    exit 1
fi

if [ -f "client/package.json" ]; then
    echo "✅ Client package.json exists"
else
    echo "❌ Client package.json not found"
    exit 1
fi

# Check if node_modules exist
echo ""
echo "📚 Checking dependencies..."

if [ -d "node_modules" ]; then
    echo "✅ Root node_modules exists"
else
    echo "⚠️  Root node_modules not found. Run: npm install"
fi

if [ -d "server/node_modules" ]; then
    echo "✅ Server node_modules exists"
else
    echo "⚠️  Server node_modules not found. Run: cd server && npm install"
fi

if [ -d "client/node_modules" ]; then
    echo "✅ Client node_modules exists"
else
    echo "⚠️  Client node_modules not found. Run: cd client && npm install"
fi

# Build test
echo ""
echo "🔨 Testing build process..."

cd client
if npm run build > /dev/null 2>&1; then
    echo "✅ Frontend build successful"
else
    echo "❌ Frontend build failed"
    exit 1
fi
cd ..

echo ""
echo "✨ Pre-deployment verification complete!"
echo ""
echo "Next steps:"
echo "1. Verify all environment variables are correctly set"
echo "2. Test the application locally: npm run dev"
echo "3. Deploy to your hosting platform"
