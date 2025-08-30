import { useState, useEffect } from 'react';

export function CursorFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over interactive element
      const target = e.target;
      const isInteractive = target.matches('a, button, [role="button"], input, textarea, select, .magnetic, .morph-button, .glassmorphism-button');
      setIsPointer(isInteractive);
    };

    const handleMouseEnter = () => setIsHidden(false);
    const handleMouseLeave = () => setIsHidden(true);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Main cursor dot */}
      <div
        className={`fixed pointer-events-none z-50 w-2 h-2 bg-primary rounded-full transition-opacity duration-200 ${
          isHidden ? 'opacity-0' : 'opacity-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor ring */}
      <div
        className={`fixed pointer-events-none z-40 w-8 h-8 border-2 border-primary/30 rounded-full transition-all duration-300 ease-out ${
          isHidden ? 'opacity-0 scale-0' : 'opacity-100'
        } ${
          isPointer ? 'scale-150 border-accent/50' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor trail effect */}
      <div
        className={`fixed pointer-events-none z-30 w-6 h-6 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full transition-all duration-500 ease-out ${
          isHidden ? 'opacity-0 scale-0' : 'opacity-60'
        } ${
          isPointer ? 'scale-200' : 'scale-100'
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  );
}
