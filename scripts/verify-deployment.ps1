# PowerShell pre-deployment verification script
# Run this before deploying to ensure all required configurations are in place

Write-Host "🔍 Starting pre-deployment verification..." -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
if (!(Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Host "❌ Node.js is not installed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Node.js version: $(node --version)" -ForegroundColor Green

# Check npm
if (!(Get-Command npm -ErrorAction SilentlyContinue)) {
    Write-Host "❌ npm is not installed" -ForegroundColor Red
    exit 1
}
Write-Host "✅ npm version: $(npm --version)" -ForegroundColor Green

# Check required environment files
Write-Host ""
Write-Host "📝 Checking environment files..." -ForegroundColor Cyan

if (!(Test-Path "server\.env")) {
    Write-Host "⚠️  Warning: server\.env file not found. Copy from .env.example" -ForegroundColor Yellow
} else {
    Write-Host "✅ server\.env exists" -ForegroundColor Green
}

if (!(Test-Path "client\.env")) {
    Write-Host "⚠️  Warning: client\.env file not found. Copy from .env.example" -ForegroundColor Yellow
} else {
    Write-Host "✅ client\.env exists" -ForegroundColor Green
}

# Check critical environment variables
Write-Host ""
Write-Host "🔐 Checking critical environment variables..." -ForegroundColor Cyan

if (Test-Path "server\.env") {
    $envContent = Get-Content "server\.env"
    if ($envContent -match "MONGO_URI") {
        Write-Host "✅ MONGO_URI configured in server\.env" -ForegroundColor Green
    } else {
        Write-Host "⚠️  MONGO_URI not found in server\.env" -ForegroundColor Yellow
    }
    
    if ($envContent -match "JWT_SECRET") {
        Write-Host "✅ JWT_SECRET configured in server\.env" -ForegroundColor Green
    } else {
        Write-Host "⚠️  JWT_SECRET not found in server\.env" -ForegroundColor Yellow
    }
}

if (Test-Path "client\.env") {
    $clientEnvContent = Get-Content "client\.env"
    if ($clientEnvContent -match "VITE_API_URL") {
        Write-Host "✅ VITE_API_URL configured in client\.env" -ForegroundColor Green
    } else {
        Write-Host "⚠️  VITE_API_URL not found in client\.env" -ForegroundColor Yellow
    }
}

# Check package.json files
Write-Host ""
Write-Host "📦 Checking package.json files..." -ForegroundColor Cyan

if (Test-Path "package.json") {
    Write-Host "✅ Root package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ Root package.json not found" -ForegroundColor Red
    exit 1
}

if (Test-Path "server\package.json") {
    Write-Host "✅ Server package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ Server package.json not found" -ForegroundColor Red
    exit 1
}

if (Test-Path "client\package.json") {
    Write-Host "✅ Client package.json exists" -ForegroundColor Green
} else {
    Write-Host "❌ Client package.json not found" -ForegroundColor Red
    exit 1
}

# Check if node_modules exist
Write-Host ""
Write-Host "📚 Checking dependencies..." -ForegroundColor Cyan

if (Test-Path "node_modules") {
    Write-Host "✅ Root node_modules exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Root node_modules not found. Run: npm install" -ForegroundColor Yellow
}

if (Test-Path "server\node_modules") {
    Write-Host "✅ Server node_modules exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Server node_modules not found. Run: cd server && npm install" -ForegroundColor Yellow
}

if (Test-Path "client\node_modules") {
    Write-Host "✅ Client node_modules exists" -ForegroundColor Green
} else {
    Write-Host "⚠️  Client node_modules not found. Run: cd client && npm install" -ForegroundColor Yellow
}

# Build test
Write-Host ""
Write-Host "🔨 Testing build process..." -ForegroundColor Cyan

Push-Location .\client
$buildOutput = npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Frontend build successful" -ForegroundColor Green
} else {
    Write-Host "❌ Frontend build failed" -ForegroundColor Red
    Write-Host $buildOutput
    Pop-Location
    exit 1
}
Pop-Location

Write-Host ""
Write-Host "✨ Pre-deployment verification complete!" -ForegroundColor Green
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Verify all environment variables are correctly set"
Write-Host "2. Test the application locally: npm run dev"
Write-Host "3. Deploy to your hosting platform"
