export default function ProjectCard({ title, description, tech, links, featured = false }) {
  return (
    <div className={`group glassmorphism rounded-3xl shadow-xl border border-primary/10 p-8 flex flex-col transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl hover:border-primary/30 animate-fade-in text-card-foreground premium-hover card-hover magnetic glassmorphism-hover ${
      featured ? 'md:col-span-2 lg:col-span-1' : ''
    }`}>
      {/* Project Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="relative">
            <div class="absolute -inset-2 bg-gradient-to-r from-primary to-accent rounded-xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 animate-breathe" style="filter: blur(var(--shadow-blur))"></div>
            <div className="relative w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-xl flex items-center justify-center text-white text-xl font-bold group-hover:scale-110 transition-transform duration-300">
              {title.includes('HyprL') ? '🐧' : title.includes('NoteHole') ? '📝' : '🤖'}
            </div>
          </div>
          {featured && (
            <span className="px-3 py-1 bg-gradient-to-r from-accent to-primary text-white text-xs font-bold rounded-full animate-pulse">✨ Featured</span>
          )}
        </div>
        <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-accent transition-colors duration-300 leading-tight">{title}</h3>
        <p className="text-card-foreground leading-relaxed text-sm">{description}</p>
      </div>
      
      {/* Tech Stack */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">Tech Stack</h4>
        <div className="flex flex-wrap gap-2">
          {tech.map((t, index) => (
            <span 
              key={t} 
              className="bg-gradient-to-r from-muted to-muted/80 text-primary px-3 py-1 rounded-full text-xs font-medium hover:from-primary hover:to-accent hover:text-white transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>
      
      {/* Action Buttons */}
      <div className="mt-auto">
        <div className="flex flex-wrap gap-3">
          {links.github && (
            <a 
              href={links.github} 
              target="_blank" 
              rel="noopener" 
              className="group/btn inline-flex items-center px-4 py-2 bg-foreground text-background rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300 font-semibold shadow-md hover:shadow-lg text-sm morph-button magnetic"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:rotate-12 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              GitHub
            </a>
          )}
          {links.docs && (
            <a 
              href={links.docs} 
              target="_blank" 
              rel="noopener" 
              className="group/btn inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary to-accent text-white rounded-full hover:shadow-lg transition-all duration-300 font-semibold shadow-md text-sm morph-button magnetic"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Docs
            </a>
          )}
          {links.live && (
            <a 
              href={links.live} 
              target="_blank" 
              rel="noopener" 
              className="group/btn inline-flex items-center px-4 py-2 bg-gradient-to-r from-accent to-secondary text-white rounded-full hover:shadow-lg transition-all duration-300 font-semibold shadow-md text-sm morph-button magnetic"
            >
              <svg className="w-4 h-4 mr-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
