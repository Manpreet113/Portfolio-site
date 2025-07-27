import Lenis from 'lenis';

export default function initializeLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => 1 - Math.pow(1 - t, 3),
    smooth: true,
    lerp: 0.15,
    touchMultiplier: 1.2,
    wheelMultiplier: 1.0,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Expose globally if needed
  window.lenis = lenis;
}

