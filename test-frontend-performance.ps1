# Frontend Performance Test Script (PowerShell)
# This script builds the project and analyzes bundle size

Write-Host "🚀 Starting Frontend Performance Test..." -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Navigate to client directory
Set-Location "$PSScriptRoot\client"

Write-Host "📦 Installing dependencies (if needed)..." -ForegroundColor Yellow
npm install --silent

Write-Host ""
Write-Host "🏗️  Building production bundle..." -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Yellow
npm run build

Write-Host ""
Write-Host "📊 Bundle Analysis:" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green

# Check if dist directory exists
if (Test-Path "dist") {
    Write-Host "✅ Build successful!" -ForegroundColor Green
    Write-Host ""
    
    # Calculate total bundle size
    $distSize = (Get-ChildItem -Path "dist" -Recurse | Measure-Object -Property Length -Sum).Sum
    $distSizeMB = [math]::Round($distSize / 1MB, 2)
    Write-Host "📦 Total bundle size: $distSizeMB MB" -ForegroundColor Cyan
    Write-Host ""
    
    # List largest JS files
    Write-Host "📊 Largest JavaScript files:" -ForegroundColor Cyan
    Get-ChildItem -Path "dist" -Recurse -Filter "*.js" | 
        Sort-Object Length -Descending | 
        Select-Object -First 10 | 
        ForEach-Object {
            $sizeKB = [math]::Round($_.Length / 1KB, 2)
            Write-Host "   $($_.Name): $sizeKB KB"
        }
    Write-Host ""
    
    # Count files
    $jsFiles = (Get-ChildItem -Path "dist" -Recurse -Filter "*.js").Count
    $cssFiles = (Get-ChildItem -Path "dist" -Recurse -Filter "*.css").Count
    Write-Host "📄 JavaScript files: $jsFiles" -ForegroundColor Cyan
    Write-Host "🎨 CSS files: $cssFiles" -ForegroundColor Cyan
    Write-Host ""
    
    # Check for source maps
    $sourcemaps = (Get-ChildItem -Path "dist" -Recurse -Filter "*.map").Count
    if ($sourcemaps -eq 0) {
        Write-Host "✅ Source maps disabled (good for production)" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Source maps found: $sourcemaps files (consider disabling)" -ForegroundColor Yellow
    }
    Write-Host ""
    
    # Performance recommendations
    Write-Host "📈 Performance Status:" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Green
    
    if ($distSizeMB -lt 1) {
        Write-Host "✅ Bundle size: Excellent (< 1MB)" -ForegroundColor Green
    } elseif ($distSizeMB -lt 2) {
        Write-Host "⚠️  Bundle size: Good (< 2MB)" -ForegroundColor Yellow
    } else {
        Write-Host "❌ Bundle size: Too large (> 2MB)" -ForegroundColor Red
    }
    Write-Host ""
    
    Write-Host "✅ Performance test complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Cyan
    Write-Host "1. Test the build locally: npm run preview"
    Write-Host "2. Run Lighthouse audit in Chrome DevTools"
    Write-Host "3. Load the website and open browser console"
    Write-Host "4. Check for lazy loading and scroll performance"
    Write-Host ""
    Write-Host "To test in browser:" -ForegroundColor Yellow
    Write-Host "npm run preview" -ForegroundColor White
    
} else {
    Write-Host "❌ Build failed! Check errors above." -ForegroundColor Red
    exit 1
}
