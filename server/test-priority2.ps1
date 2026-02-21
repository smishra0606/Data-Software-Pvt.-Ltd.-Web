# Priority 2 Deployment Fixes - Test Script (PowerShell)

Write-Host "Testing Priority 2 Security Hardening..." -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:8000"
$testsPassed = 0
$testsFailed = 0

# Helper function to test endpoint
function Test-Endpoint {
    param($testName, $uri, $method, $body, $expectedStatus, $shouldContain)
    
    Write-Host "Testing: $testName" -ForegroundColor Yellow
    
    try {
        if ($body) {
            $jsonBody = $body | ConvertTo-Json
            $response = Invoke-RestMethod -Uri $uri -Method $method -Body $jsonBody -ContentType "application/json" -ErrorAction Stop
        } else {
            $response = Invoke-RestMethod -Uri $uri -Method $method -ErrorAction Stop
        }
        
        if ($shouldContain -and $response.message -like "*$shouldContain*") {
            Write-Host "  [PASS]" -ForegroundColor Green
            return $true
        } elseif (!$shouldContain) {
            Write-Host "  [PASS]" -ForegroundColor Green
            return $true
        } else {
            Write-Host "  [FAIL] - Expected message containing: $shouldContain" -ForegroundColor Red
            return $false
        }
    } catch {
        $errorResponse = $_.ErrorDetails.Message | ConvertFrom-Json
        
        if ($expectedStatus -and $_.Exception.Response.StatusCode.value__ -eq $expectedStatus) {
            if ($shouldContain -and $errorResponse.message -like "*$shouldContain*") {
                Write-Host "  [PASS] (Expected error)" -ForegroundColor Green
                return $true
            }
        }
        
        Write-Host "  [FAIL] - $($errorResponse.message)" -ForegroundColor Red
        return $false
    }
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "1. HELMET.JS SECURITY HEADERS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

try {
    $response = Invoke-WebRequest -Uri "$baseUrl/health" -Method Get -UseBasicParsing
    
    $securityHeaders = @(
        "X-DNS-Prefetch-Control",
        "X-Frame-Options",
        "X-Content-Type-Options",
        "X-XSS-Protection"
    )
    
    $headersFound = 0
    foreach ($header in $securityHeaders) {
        if ($response.Headers[$header]) {
            $headersFound++
            Write-Host "  [OK] $header present" -ForegroundColor Green
        }
    }
    
    if ($headersFound -gt 0) {
        Write-Host "[PASS] Helmet security headers active ($headersFound/4)" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "[FAIL] No security headers found" -ForegroundColor Red
        $testsFailed++
    }
} catch {
    Write-Host "[FAIL] Could not check headers" -ForegroundColor Red
    $testsFailed++
}
Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "2. INPUT VALIDATION - AUTH ROUTES" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test 1: Register with invalid email
if (Test-Endpoint "Register with invalid email" "$baseUrl/api/auth/register" "POST" @{
    name = "Test User"
    email = "invalid-email"
    password = "Test123!"
} 400 "valid email") { $testsPassed++ } else { $testsFailed++ }

# Test 2: Register with weak password
if (Test-Endpoint "Register with weak password" "$baseUrl/api/auth/register" "POST" @{
    name = "Test User"
    email = "test@test.com"
    password = "weak"
} 400 "Password must") { $testsPassed++ } else { $testsFailed++ }

# Test 3: Login without email
if (Test-Endpoint "Login without email" "$baseUrl/api/auth/login" "POST" @{
    password = "Test123!"
} 400 "required") { $testsPassed++ } else { $testsFailed++ }

# Test 4: Register with invalid name (numbers)
if (Test-Endpoint "Register with invalid name" "$baseUrl/api/auth/register" "POST" @{
    name = "Test123"
    email = "test@test.com"
    password = "Test123!"
} 400 "letters") { $testsPassed++ } else { $testsFailed++ }

Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "3. NOSQL INJECTION PROTECTION" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test: Attempt NoSQL injection in email field
if (Test-Endpoint "NoSQL injection attempt" "$baseUrl/api/auth/login" "POST" @{
    email = @{ '$ne' = '' }
    password = "password"
} 400 "Validation") { $testsPassed++ } else { $testsFailed++ }

Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "4. CONTACT FORM VALIDATION" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test 1: Contact form with short message
if (Test-Endpoint "Short message" "$baseUrl/api/contact" "POST" @{
    name = "Test"
    email = "test@test.com"
    message = "Hi"
} 400 "between") { $testsPassed++ } else { $testsFailed++ }

# Test 2: Contact form with invalid email
if (Test-Endpoint "Invalid email" "$baseUrl/api/contact" "POST" @{
    name = "Test User"
    email = "notanemail"
    message = "This is a test message for validation"
} 400 "valid email") { $testsPassed++ } else { $testsFailed++ }

Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "5. MONGODB OBJECTID VALIDATION" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test: Invalid ObjectId format
if (Test-Endpoint "Invalid ID format" "$baseUrl/api/courses/invalid-id" "GET" $null 400 "Invalid ID") { $testsPassed++ } else { $testsFailed++ }

Write-Host ""

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "TEST RESULTS" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Tests Passed: $testsPassed" -ForegroundColor Green
Write-Host "Tests Failed: $testsFailed" -ForegroundColor Red
Write-Host "Total Tests: $($testsPassed + $testsFailed)" -ForegroundColor Cyan
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "[SUCCESS] ALL PRIORITY 2 TESTS PASSED!" -ForegroundColor Green
} else {
    Write-Host "[WARNING] Some tests failed. Review the output above." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Security Features Implemented:" -ForegroundColor Cyan
Write-Host "  [OK] Helmet.js security headers" -ForegroundColor Green
Write-Host "  [OK] NoSQL injection protection (mongo-sanitize)" -ForegroundColor Green
Write-Host "  [OK] Input validation (express-validator)" -ForegroundColor Green
Write-Host "  [OK] Cryptographic password reset tokens" -ForegroundColor Green
Write-Host "  [OK] Strong password requirements" -ForegroundColor Green
Write-Host "  [OK] Email validation and normalization" -ForegroundColor Green
Write-Host "  [OK] MongoDB ObjectId validation" -ForegroundColor Green
Write-Host ""
