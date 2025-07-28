import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

export default function LenisInit() {
  const rafIdRef = useRef();
  const lenisRef = useRef();
  
  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      return; // Don't initialize smooth scrolling if user prefers reduced motion
    }
    
    // Delay initialization to avoid blocking main thread during initial page load
    const timeoutId = setTimeout(() => {
      // Initialize Lenis with optimized settings for better performance
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lerp: 0.07, // Reduced for less CPU usage
        wheelMultiplier: 0.8, // Reduced for less aggressive scrolling
        touchMultiplier: 1.8,
        normalizeWheel: true,
        smoothWheel: true,
        smoothTouch: false, // Disable on touch for better performance on mobile
        syncTouch: false // Better mobile performance
      });

      // Optimized animation frame loop with throttling
      let lastTime = 0;
      const targetFPS = 60;
      const frameInterval = 1000 / targetFPS;
      
      function raf(time) {
        if (!lenisRef.current) return;
        
        // Throttle to target FPS to reduce CPU usage
        if (time - lastTime >= frameInterval) {
          lenisRef.current.raf(time);
          lastTime = time;
        }
        
        rafIdRef.current = requestAnimationFrame(raf);
      }
      
      rafIdRef.current = requestAnimationFrame(raf);
    }, 100); // Delay initialization by 100ms

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
}
