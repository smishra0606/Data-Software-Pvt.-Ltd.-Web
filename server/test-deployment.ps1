# Priority 1 Deployment Fixes - Test Script (PowerShell)

Write-Host "🔍 Testing Priority 1 Fixes..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000"

# Test 1: Health Check
Write-Host "1️⃣ Testing Health Check Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get -ErrorAction Stop
    if ($response.status -eq "OK") {
        Write-Host "✅ Health check passed" -ForegroundColor Green
        Write-Host "   Database: $($response.database)" -ForegroundColor Gray
    } else {
        Write-Host "❌ Health check failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Cannot connect to server. Is it running?" -ForegroundColor Red
}
Write-Host ""

# Test 2: Root Endpoint
Write-Host "2️⃣ Testing Root Endpoint..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/" -Method Get -ErrorAction Stop
    if ($response.message -eq "Learning Platform API") {
        Write-Host "✅ Root endpoint working" -ForegroundColor Green
    } else {
        Write-Host "❌ Root endpoint failed" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ Root endpoint error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 3: API Endpoint
Write-Host "3️⃣ Testing API Endpoint (Courses)..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/courses" -Method Get -ErrorAction Stop
    if ($response.success) {
        Write-Host "✅ API endpoint accessible" -ForegroundColor Green
        Write-Host "   Found $($response.count) courses" -ForegroundColor Gray
    } else {
        Write-Host "⚠️  API returned non-success response" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌ API endpoint error: $($_.Exception.Message)" -ForegroundColor Red
}
Write-Host ""

# Test 4: Rate Limiting
Write-Host "4️⃣ Testing Rate Limiting..." -ForegroundColor Yellow
Write-Host "   Making 6 rapid auth requests..." -ForegroundColor Gray
$rateLimitCaught = $false
$body = @{ email = "test@test.com"; password = "test" } | ConvertTo-Json

for ($i = 1; $i -le 6; $i++) {
    try {
        $response = Invoke-RestMethod -Uri "$baseUrl/api/auth/login" -Method Post -Body $body -ContentType "application/json" -ErrorAction Stop
    } catch {
        $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
        if ($errorResponse.message -like "*Too many*") {
            $rateLimitCaught = $true
            Write-Host "   ⏸️  Rate limit triggered on attempt $i" -ForegroundColor Gray
            break
        }
    }
    Start-Sleep -Milliseconds 100
}

if ($rateLimitCaught) {
    Write-Host "✅ Rate limiting working (caught after 5 attempts)" -ForegroundColor Green
} else {
    Write-Host "⚠️  Rate limiting may need more testing" -ForegroundColor Yellow
}
Write-Host ""

# Test 5: Error Handler
Write-Host "5️⃣ Testing Error Handler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/courses/invalid-id-format" -Method Get -ErrorAction Stop
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    if ($errorResponse.success -eq $false -and $errorResponse.message -like "*Invalid*") {
        Write-Host "✅ Error handler working correctly" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Error handler returned: $($errorResponse.message)" -ForegroundColor Yellow
    }
}
Write-Host ""

# Test 6: 404 Handler
Write-Host "6️⃣ Testing 404 Handler..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$baseUrl/api/nonexistent-route" -Method Get -ErrorAction Stop
} catch {
    $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
    if ($errorResponse.message -like "*not found*") {
        Write-Host "✅ 404 handler working" -ForegroundColor Green
    } else {
        Write-Host "⚠️  404 handler may need review" -ForegroundColor Yellow
    }
}
Write-Host ""

Write-Host "✅ All automated tests completed!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Manual Verification Checklist:" -ForegroundColor Cyan
Write-Host "  ☑ Verify JWT_SECRET is set in .env (min 32 chars)"
Write-Host "  ☑ Verify MONGO_URI is configured"
Write-Host "  ☑ Verify Cloudinary credentials"
Write-Host "  ☑ Test CORS from different origin"
Write-Host "  ☑ Check server logs for startup errors"
Write-Host "  ☑ Test file uploads with size limits"
Write-Host ""
Write-Host "🚀 To start the server: npm run dev" -ForegroundColor Yellow
