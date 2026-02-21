// Performance Testing Script
// Run this in the browser console to measure performance

console.log('🚀 Performance Metrics Dashboard\n');

// Function to measure page load metrics
const measurePageLoad = () => {
  const perfData = performance.getEntriesByType('navigation')[0];
  
  console.log('📊 Page Load Metrics:');
  console.log('─'.repeat(50));
  console.log(`DOM Content Loaded: ${perfData.domContentLoadedEventEnd.toFixed(0)}ms`);
  console.log(`Full Page Load: ${perfData.loadEventEnd.toFixed(0)}ms`);
  console.log(`First Paint: ${performance.getEntriesByType('paint')[0]?.startTime.toFixed(0) || 'N/A'}ms`);
  console.log(`First Contentful Paint: ${performance.getEntriesByType('paint')[1]?.startTime.toFixed(0) || 'N/A'}ms`);
  console.log('');
};

// Function to measure scroll performance
const measureScrollPerformance = () => {
  let frameCount = 0;
  let lastTime = performance.now();
  let fpsValues = [];
  
  const measureFPS = () => {
    const currentTime = performance.now();
    const delta = currentTime - lastTime;
    const fps = Math.round(1000 / delta);
    
    fpsValues.push(fps);
    frameCount++;
    lastTime = currentTime;
    
    if (frameCount < 60) {
      requestAnimationFrame(measureFPS);
    } else {
      const avgFPS = fpsValues.reduce((a, b) => a + b, 0) / fpsValues.length;
      const minFPS = Math.min(...fpsValues);
      const maxFPS = Math.max(...fpsValues);
      
      console.log('📈 Scroll Performance (60 frames):');
      console.log('─'.repeat(50));
      console.log(`Average FPS: ${avgFPS.toFixed(1)} fps`);
      console.log(`Min FPS: ${minFPS} fps`);
      console.log(`Max FPS: ${maxFPS} fps`);
      console.log(`Status: ${avgFPS >= 55 ? '✅ Excellent' : avgFPS >= 40 ? '⚠️ Good' : '❌ Poor'}`);
      console.log('');
    }
  };
  
  console.log('🔄 Measuring scroll performance... (scroll now!)');
  requestAnimationFrame(measureFPS);
};

// Function to measure resource loading
const measureResources = () => {
  const resources = performance.getEntriesByType('resource');
  
  const images = resources.filter(r => r.initiatorType === 'img');
  const scripts = resources.filter(r => r.initiatorType === 'script');
  const styles = resources.filter(r => r.initiatorType === 'css' || r.initiatorType === 'link');
  
  console.log('📦 Resource Loading:');
  console.log('─'.repeat(50));
  console.log(`Images loaded: ${images.length} (${(images.reduce((sum, img) => sum + img.transferSize, 0) / 1024).toFixed(2)} KB)`);
  console.log(`Scripts loaded: ${scripts.length} (${(scripts.reduce((sum, s) => sum + s.transferSize, 0) / 1024).toFixed(2)} KB)`);
  console.log(`Stylesheets loaded: ${styles.length} (${(styles.reduce((sum, s) => sum + s.transferSize, 0) / 1024).toFixed(2)} KB)`);
  console.log(`Total resources: ${resources.length}`);
  console.log('');
};

// Function to measure bundle size
const measureBundleSize = () => {
  const scripts = performance.getEntriesByType('resource').filter(r => r.initiatorType === 'script');
  const totalSize = scripts.reduce((sum, s) => sum + s.transferSize, 0);
  
  console.log('📦 JavaScript Bundle Size:');
  console.log('─'.repeat(50));
  console.log(`Total JS: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Status: ${totalSize < 1024 * 1024 ? '✅ Excellent (<1MB)' : totalSize < 2 * 1024 * 1024 ? '⚠️ Good (<2MB)' : '❌ Too Large'}`);
  console.log('');
  
  // List largest bundles
  const sortedScripts = scripts.sort((a, b) => b.transferSize - a.transferSize).slice(0, 5);
  console.log('Top 5 largest scripts:');
  sortedScripts.forEach((script, i) => {
    const name = script.name.split('/').pop();
    console.log(`${i + 1}. ${name}: ${(script.transferSize / 1024).toFixed(2)} KB`);
  });
  console.log('');
};

// Function to measure memory usage
const measureMemory = () => {
  if (performance.memory) {
    console.log('💾 Memory Usage:');
    console.log('─'.repeat(50));
    console.log(`Used: ${(performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Total: ${(performance.memory.totalJSHeapSize / 1024 / 1024).toFixed(2)} MB`);
    console.log(`Limit: ${(performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2)} MB`);
    console.log('');
  }
};

// Function to get core web vitals
const getCoreWebVitals = () => {
  console.log('🎯 Core Web Vitals:');
  console.log('─'.repeat(50));
  
  // LCP - Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log(`LCP: ${lastEntry.renderTime.toFixed(0)}ms ${lastEntry.renderTime < 2500 ? '✅' : lastEntry.renderTime < 4000 ? '⚠️' : '❌'}`);
  }).observe({ entryTypes: ['largest-contentful-paint'] });
  
  // FID - First Input Delay
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    entries.forEach(entry => {
      console.log(`FID: ${entry.processingStart - entry.startTime.toFixed(0)}ms ${entry.processingStart - entry.startTime < 100 ? '✅' : entry.processingStart - entry.startTime < 300 ? '⚠️' : '❌'}`);
    });
  }).observe({ entryTypes: ['first-input'] });
  
  // CLS - Cumulative Layout Shift
  let clsScore = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!entry.hadRecentInput) {
        clsScore += entry.value;
      }
    }
    console.log(`CLS: ${clsScore.toFixed(3)} ${clsScore < 0.1 ? '✅' : clsScore < 0.25 ? '⚠️' : '❌'}`);
  }).observe({ entryTypes: ['layout-shift'] });
  
  console.log('');
};

// Run all measurements
const runAllTests = () => {
  console.clear();
  console.log('═'.repeat(50));
  console.log('🚀 PERFORMANCE AUDIT DASHBOARD');
  console.log('═'.repeat(50));
  console.log('');
  
  measurePageLoad();
  measureResources();
  measureBundleSize();
  measureMemory();
  getCoreWebVitals();
  
  console.log('');
  console.log('To measure scroll performance, run:');
  console.log('measureScrollPerformance()');
};

// Export functions to window
window.measurePageLoad = measurePageLoad;
window.measureScrollPerformance = measureScrollPerformance;
window.measureResources = measureResources;
window.measureBundleSize = measureBundleSize;
window.measureMemory = measureMemory;
window.getCoreWebVitals = getCoreWebVitals;
window.runAllTests = runAllTests;

// Auto-run on load
if (document.readyState === 'complete') {
  runAllTests();
} else {
  window.addEventListener('load', runAllTests);
}
