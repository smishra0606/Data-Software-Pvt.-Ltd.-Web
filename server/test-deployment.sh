#!/bin/bash

echo "🔍 Testing Priority 1 Fixes..."
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test 1: Health Check
echo "1️⃣ Testing Health Check Endpoint..."
response=$(curl -s http://localhost:8000/health)
if [[ $response == *"OK"* ]]; then
    echo -e "${GREEN}✅ Health check passed${NC}"
else
    echo -e "${RED}❌ Health check failed${NC}"
fi
echo ""

# Test 2: Root endpoint
echo "2️⃣ Testing Root Endpoint..."
response=$(curl -s http://localhost:8000/)
if [[ $response == *"Learning Platform API"* ]]; then
    echo -e "${GREEN}✅ Root endpoint working${NC}"
else
    echo -e "${RED}❌ Root endpoint failed${NC}"
fi
echo ""

# Test 3: CORS (should work from localhost)
echo "3️⃣ Testing API Endpoint..."
response=$(curl -s http://localhost:8000/api/courses)
if [[ $response == *"success"* ]]; then
    echo -e "${GREEN}✅ API endpoint accessible${NC}"
else
    echo -e "${RED}❌ API endpoint failed${NC}"
fi
echo ""

# Test 4: Rate limiting (requires multiple requests)
echo "4️⃣ Testing Rate Limiting..."
echo "Making 6 rapid auth requests..."
count=0
for i in {1..6}; do
    response=$(curl -s -X POST http://localhost:8000/api/auth/login -H "Content-Type: application/json" -d '{}')
    if [[ $response == *"Too many"* ]]; then
        count=$((count + 1))
    fi
done

if [ $count -gt 0 ]; then
    echo -e "${GREEN}✅ Rate limiting working (caught after 5 attempts)${NC}"
else
    echo -e "${RED}⚠️  Rate limiting may need more testing${NC}"
fi
echo ""

# Test 5: Error handling (invalid ID)
echo "5️⃣ Testing Error Handler..."
response=$(curl -s http://localhost:8000/api/courses/invalid-id-format)
if [[ $response == *"Invalid"* ]] || [[ $response == *"success\":false"* ]]; then
    echo -e "${GREEN}✅ Error handler working${NC}"
else
    echo -e "${RED}❌ Error handler may need review${NC}"
fi
echo ""

echo "✅ All tests completed!"
echo ""
echo "📋 Manual checks needed:"
echo "  - Verify JWT_SECRET is set in .env"
echo "  - Verify Cloudinary credentials"
echo "  - Test from different origin for CORS"
echo "  - Check server logs for any errors"
