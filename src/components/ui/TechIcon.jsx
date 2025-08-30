import * as TablerIcons from '@tabler/icons-react';

const {
  IconBrandReact,
  IconRocket,
  IconPalette,
  IconBrandNodejs,
  IconDatabase,
  IconBrandLinux,
  IconTerminal,
  IconBrandGit,
  IconBrandVercel,
  IconRobot
} = TablerIcons;

export const TechIcon = ({ tech, className = "w-6 h-6" }) => {
  const icons = {
    react: IconBrandReact,
    astro: IconRocket,
    tailwind: IconPalette,
    nodejs: IconBrandNodejs,
    supabase: IconDatabase,
    linux: IconBrandLinux,
    bash: IconTerminal,
    git: IconBrandGit,
    vercel: IconBrandVercel,
    discord: IconRobot
  };

  const IconComponent = icons[tech?.toLowerCase()];
  
  if (!IconComponent) return null;
  
  return <IconComponent className={className} />;
};
