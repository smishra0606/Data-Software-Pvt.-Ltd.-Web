#!/bin/bash

# Frontend Performance Test Script
# This script builds the project and analyzes bundle size

echo "🚀 Starting Frontend Performance Test..."
echo "========================================"
echo ""

# Navigate to client directory
cd "$(dirname "$0")/../client" || exit

echo "📦 Installing dependencies (if needed)..."
npm install --silent

echo ""
echo "🏗️  Building production bundle..."
echo "========================================"
npm run build

echo ""
echo "📊 Bundle Analysis:"
echo "========================================"

# Check if dist directory exists
if [ -d "dist" ]; then
    echo "✅ Build successful!"
    echo ""
    
    # Calculate total bundle size
    total_size=$(du -sh dist | cut -f1)
    echo "📦 Total bundle size: $total_size"
    echo ""
    
    # List largest files
    echo "📊 Largest files:"
    du -h dist/**/*.js 2>/dev/null | sort -rh | head -n 10
    echo ""
    
    # Count number of chunks
    js_files=$(find dist -name "*.js" | wc -l)
    css_files=$(find dist -name "*.css" | wc -l)
    echo "📄 JavaScript files: $js_files"
    echo "🎨 CSS files: $css_files"
    echo ""
    
    # Check for source maps (should be disabled in production)
    sourcemaps=$(find dist -name "*.map" | wc -l)
    if [ "$sourcemaps" -eq 0 ]; then
        echo "✅ Source maps disabled (good for production)"
    else
        echo "⚠️  Source maps found: $sourcemaps files (consider disabling)"
    fi
    echo ""
    
    echo "✅ Performance test complete!"
    echo ""
    echo "Next steps:"
    echo "1. Test the build locally: npm run preview"
    echo "2. Run Lighthouse audit in Chrome DevTools"
    echo "3. Check bundle size - should be < 1MB"
    echo "4. Verify lazy loading is working"
    
else
    echo "❌ Build failed! Check errors above."
    exit 1
fi
