import * as TablerIcons from '@tabler/icons-react';

const {
  IconBrandLinux,
  IconTerminal2,
  IconRocket,
  IconNotes,
  IconEdit,
  IconBot,
  IconBrandDiscord,
  IconCode,
  IconBrandReact,
  IconBrandJavascript,
  IconBrandNodejs,
  IconDatabase,
  IconDeviceMobile,
  IconSettings,
  IconBrandGit,
  IconMusic,
  IconShield,
  IconTicket,
  IconCpu,
  IconDownload
} = TablerIcons;

export const ProjectIcon = ({ project, type = "main", className = "w-8 h-8" }) => {
  const projectIcons = {
    hyprl: {
      main: IconBrandLinux,
      secondary: IconTerminal2,
      accent: IconDownload
    },
    notehole: {
      main: IconNotes,
      secondary: IconDeviceMobile,
      accent: IconDatabase
    },
    notbot: {
      main: IconBot,
      secondary: IconBrandDiscord,
      accent: IconSettings
    }
  };

  const techIcons = {
    'Shell Scripting (Bash)': IconTerminal2,
    'React': IconBrandReact,
    'Node.js': IconBrandNodejs,
    'Discord.js': IconBrandDiscord,
    'PWA': IconDeviceMobile,
    'Linux': IconBrandLinux,
    'Supabase': IconDatabase,
    'JavaScript': IconBrandJavascript,
    'Git': IconBrandGit,
    'Music': IconMusic,
    'Moderation': IconShield,
    'Tickets': IconTicket,
    'AI': IconCpu
  };

  // If it's a tech icon request
  if (type === 'tech') {
    const IconComponent = techIcons[project] || IconCode;
    return <IconComponent className={className} />;
  }

  // For project icons
  const projectIconSet = projectIcons[project?.toLowerCase()];
  if (!projectIconSet) return <IconCode className={className} />;

  const IconComponent = projectIconSet[type] || projectIconSet.main;
  return <IconComponent className={className} />;
};
