import { useState, useEffect } from 'react';
import { TechIcon } from './TechIcon.jsx';

export const FloatingElements = ({ className = "" }) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const techStack = [
    { tech: 'react', x: 15, y: 20 },
    { tech: 'astro', x: 80, y: 15 },
    { tech: 'nodejs', x: 10, y: 60 },
    { tech: 'tailwind', x: 85, y: 70 },
    { tech: 'linux', x: 20, y: 85 },
    { tech: 'git', x: 75, y: 45 },
    { tech: 'supabase', x: 50, y: 10 },
    { tech: 'vercel', x: 90, y: 90 }
  ];

  const calculateTransform = (x, y, index) => {
    if (typeof window === 'undefined') {
      return 'translate(0px, 0px)';
    }
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distanceX = (mousePosition.x - centerX) * 0.02 * (index % 2 === 0 ? 1 : -1);
    const distanceY = (mousePosition.y - centerY) * 0.02 * (index % 2 === 0 ? 1 : -1);
    
    return `translate(${distanceX}px, ${distanceY}px)`;
  };

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {/* Animated geometric shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 border border-primary/20 rounded-lg animate-spin-slow"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-accent/10 to-primary/10 rounded-full animate-float"></div>
      <div className="absolute bottom-32 left-20 w-12 h-12 border-2 border-secondary/30 rounded-full animate-bounce-slow"></div>
      
      {/* Floating tech icons */}
      {techStack.map((item, index) => (
        <div
          key={item.tech}
          className="absolute opacity-60 dark:opacity-20 hover:opacity-30 transition-all duration-300"
          style={{
            left: `${item.x}%`,
            top: `${item.y}%`,
            transform: calculateTransform(item.x, item.y, index),
            animationDelay: `${index * 0.5}s`
          }}
        >
          <div className="animate-float-delayed">
            <TechIcon 
              tech={item.tech} 
              className="w-8 h-8 text-primary/40" 
            />
          </div>
        </div>
      ))}

      {/* Gradient orbs */}
      <div 
        className="absolute w-96 h-96 bg-gradient-to-r from-primary/5 to-accent/5 rounded-full blur-3xl"
        style={{
          top: '20%',
          left: '10%',
          transform: `translate(${mousePosition.x * 0.01}px, ${mousePosition.y * 0.01}px)`
        }}
      ></div>
      <div 
        className="absolute w-80 h-80 bg-gradient-to-r from-secondary/5 to-primary/5 rounded-full blur-3xl"
        style={{
          bottom: '20%',
          right: '10%',
          transform: `translate(${mousePosition.x * -0.01}px, ${mousePosition.y * -0.01}px)`
        }}
      ></div>
    </div>
  );
};
