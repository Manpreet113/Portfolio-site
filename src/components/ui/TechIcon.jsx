import * as TablerIcons from '@tabler/icons-react';

const {
  IconBrandReact,
  IconBrandAstro,
  IconPalette,
  IconBrandNodejs,
  IconDatabase,
  IconBrandUbuntu,
  IconTerminal,
  IconBrandGit,
  IconBrandVercel,
  IconRobot
} = TablerIcons;

export const TechIcon = ({ tech, className = "w-6 h-6" }) => {
  const icons = {
    react: IconBrandReact,
    astro: IconBrandAstro,
    tailwind: IconPalette,
    nodejs: IconBrandNodejs,
    supabase: IconDatabase,
    linux: IconBrandUbuntu,
    bash: IconTerminal,
    git: IconBrandGit,
    vercel: IconBrandVercel,
    discord: IconRobot
  };

  const IconComponent = icons[tech?.toLowerCase()];
  
  if (!IconComponent) return null;
  
  return <IconComponent className={className} />;
};
