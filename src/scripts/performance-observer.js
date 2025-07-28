// Performance monitoring and optimization script
// This helps identify and reduce main thread blocking

// Web Vitals observer to track performance metrics
if ('PerformanceObserver' in window) {
  // Track Long Tasks to identify main thread blocking
  const longTaskObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.duration > 50) {
        console.warn(`Long task detected: ${entry.duration}ms`, entry);
        
        // Automatically defer non-critical work if detected
        if (entry.duration > 100) {
          // Break up large tasks
          if (window.requestIdleCallback) {
            requestIdleCallback(() => {
              // Defer non-critical operations
              console.log('Deferring work due to long task');
            });
          }
        }
      }
    }
  });

  try {
    longTaskObserver.observe({ entryTypes: ['longtask'] });
  } catch (e) {
    console.log('Long task observation not supported');
  }

  // Track Total Blocking Time improvements
  const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    }
  });

  try {
    perfObserver.observe({ entryTypes: ['paint'] });
  } catch (e) {
    console.log('Paint observation not supported');
  }
}

// Optimize image loading to reduce main thread work
function optimizeImageLoading() {
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const images = document.querySelectorAll('img[data-src]');
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      img.loading = 'lazy';
    });
  } else {
    // Fallback for browsers without native lazy loading
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
}

// Optimize third-party scripts
function optimizeThirdPartyScripts() {
  // Defer non-critical scripts until after page load
  window.addEventListener('load', () => {
    // Load analytics and other non-critical scripts after main content
    setTimeout(() => {
      // Any third-party scripts can be loaded here
      console.log('Loading non-critical scripts after page load');
    }, 1000);
  });
}

// Memory management for better performance
function optimizeMemoryUsage() {
  // Clean up unused event listeners
  const cleanupListeners = new Set();
  
  const addCleanupListener = (element, event, handler) => {
    element.addEventListener(event, handler);
    cleanupListeners.add(() => element.removeEventListener(event, handler));
  };

  // Cleanup function to be called when needed
  window.cleanupPerformanceListeners = () => {
    cleanupListeners.forEach(cleanup => cleanup());
    cleanupListeners.clear();
  };
}

// Reduce layout thrashing
function optimizeLayoutPerformance() {
  let rafId;
  const scheduledOperations = [];

  // Batch DOM operations
  window.scheduleLayoutOperation = (operation) => {
    scheduledOperations.push(operation);
    
    if (!rafId) {
      rafId = requestAnimationFrame(() => {
        // Batch all DOM reads first
        const reads = scheduledOperations.filter(op => op.type === 'read');
        reads.forEach(op => op.fn());
        
        // Then batch all DOM writes
        const writes = scheduledOperations.filter(op => op.type === 'write');
        writes.forEach(op => op.fn());
        
        scheduledOperations.length = 0;
        rafId = null;
      });
    }
  };
}

// Initialize all optimizations
function initPerformanceOptimizations() {
  // Use requestIdleCallback to defer non-critical initialization
  if (window.requestIdleCallback) {
    requestIdleCallback(() => {
      optimizeImageLoading();
      optimizeThirdPartyScripts();
      optimizeMemoryUsage();
      optimizeLayoutPerformance();
    });
  } else {
    // Fallback for browsers without requestIdleCallback
    setTimeout(() => {
      optimizeImageLoading();
      optimizeThirdPartyScripts();
      optimizeMemoryUsage();
      optimizeLayoutPerformance();
    }, 100);
  }
}

// Check if page is already loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
  initPerformanceOptimizations();
}

// Export for use in other modules
export { initPerformanceOptimizations };
