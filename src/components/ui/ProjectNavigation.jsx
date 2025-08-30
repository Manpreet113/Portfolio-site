import { useState, useEffect } from 'react';
import * as TablerIcons from '@tabler/icons-react';

const { IconChevronUp, IconChevronDown, IconDots } = TablerIcons;

export const ProjectNavigation = ({ projects }) => {
  const [currentProject, setCurrentProject] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const projectsSection = document.getElementById('projects');
      if (projectsSection) {
        const rect = projectsSection.getBoundingClientRect();
        setIsVisible(rect.top < window.innerHeight && rect.bottom > 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToProject = (index) => {
    const project = document.getElementById(`project-${projects[index].id}`);
    if (project) {
      project.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
      setCurrentProject(index);
    }
  };

  const nextProject = () => {
    if (currentProject < projects.length - 1) {
      scrollToProject(currentProject + 1);
    }
  };

  const prevProject = () => {
    if (currentProject > 0) {
      scrollToProject(currentProject - 1);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 space-y-4">
      {/* Navigation Dots */}
      <div className="glassmorphism rounded-2xl p-4 border border-primary/20">
        <div className="space-y-3">
          {projects.map((project, index) => (
            <button
              key={project.id}
              onClick={() => scrollToProject(index)}
              className={`w-3 h-3 rounded-full transition-all hover:scale-125 ${
                index === currentProject 
                  ? 'bg-primary shadow-lg' 
                  : 'bg-muted-foreground/40 hover:bg-muted-foreground/60'
              }`}
              title={project.title}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="glassmorphism rounded-2xl p-2 border border-primary/20">
        <div className="flex flex-col space-y-2">
          <button
            onClick={prevProject}
            disabled={currentProject === 0}
            className={`p-2 rounded-xl transition-all hover:scale-110 ${
              currentProject === 0
                ? 'text-muted-foreground/40 cursor-not-allowed'
                : 'text-primary hover:bg-primary/10'
            }`}
            title="Previous Project"
          >
            <IconChevronUp className="w-5 h-5" />
          </button>
          <button
            onClick={nextProject}
            disabled={currentProject === projects.length - 1}
            className={`p-2 rounded-xl transition-all hover:scale-110 ${
              currentProject === projects.length - 1
                ? 'text-muted-foreground/40 cursor-not-allowed'
                : 'text-primary hover:bg-primary/10'
            }`}
            title="Next Project"
          >
            <IconChevronDown className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
