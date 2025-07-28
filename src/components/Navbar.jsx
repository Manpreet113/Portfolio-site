import DarkModeToggle from './DarkModeToggle.jsx';

const navLinks = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          
          // Only update if scroll position changed significantly
          if (Math.abs(scrollY - lastScrollY) > 5) {
            setIsScrolled(scrollY > 50);
            lastScrollY = scrollY;
            
            // Throttle active section detection for better performance
            const sections = navLinks.map(link => link.href.substring(1));
            const currentSection = sections.find(section => {
              const element = document.getElementById(section);
              if (element) {
                const rect = element.getBoundingClientRect();
                return rect.top <= 150 && rect.bottom >= 150;
              }
              return false;
            });
            
            if (currentSection && currentSection !== activeSection) {
              setActiveSection(currentSection);
            }
          }
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive event listener for better performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-out ${
      isScrolled 
        ? 'w-[95%] max-w-4xl' 
        : 'w-[90%] max-w-5xl'
    }`}>
      <div className={`relative glassmorphism-nav rounded-4xl transition-all duration-500 premium-hover ${
        isScrolled 
          ? 'glassmorphism-nav-scrolled shadow-2xl' 
          : 'shadow-md'
      }`}>
        {/* Enhanced animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-accent/8 to-secondary/8 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-gradient" />
        
        <div className="relative flex items-center justify-between px-6 py-4">
          {/* Logo with animation */}
          <a 
            href="#hero" 
            className="group relative font-bold text-xl tracking-tight text-foreground hover:text-primary transition-colors duration-300"
          >
            <span className="relative z-10">Manpreet Gill</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent rounded-lg opacity-0 group-hover:opacity-10 transition-opacity duration-300 -m-2" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className={`group relative px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105 ${
                    isActive 
                      ? 'text-primary bg-primary/10 shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  <span className="relative z-10">{link.name}</span>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg animate-pulse" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </a>
              );
            })}
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-2">
            <DarkModeToggle />
            
            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-muted/50 transition-colors duration-200"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <div className="relative w-6 h-6">
                <span className={`absolute top-1 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 top-2.5' : ''
                }`} />
                <span className={`absolute top-2.5 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`} />
                <span className={`absolute top-4 left-0 w-6 h-0.5 bg-foreground transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 top-2.5' : ''
                }`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="px-6 pb-4 pt-2 border-t border-border/30">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-primary bg-primary/10 shadow-sm' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                    style={{
                      animationDelay: `${index * 50}ms`,
                      transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-20px)',
                      opacity: isMobileMenuOpen ? 1 : 0,
                      transition: `all 0.3s ease-out ${index * 50}ms`
                    }}
                  >
                    <span className="relative z-10">{link.name}</span>
                    {isActive && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
