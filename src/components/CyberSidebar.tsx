import { useState } from "react";
import { Shield, Code, Brain, Target, Download, Github, Terminal, Lock, Eye, FileText, Award, MapPin } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface CyberSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const securitySections = [
  { 
    id: "hero", 
    title: "IDENTITY_SCAN", 
    icon: Eye, 
    description: "Personal Profile",
    status: "ACCESSIBLE"
  },
  { 
    id: "skills", 
    title: "SKILL_MATRIX", 
    icon: Code, 
    description: "Technical Arsenal",
    status: "SCANNING"
  },
  { 
    id: "experience", 
    title: "MISSION_LOG", 
    icon: Target, 
    description: "Combat History",
    status: "CLASSIFIED"
  },
  { 
    id: "projects", 
    title: "EXPLOIT_VAULT", 
    icon: Shield, 
    description: "Project Database",
    status: "ENCRYPTED"
  },
  { 
    id: "assessment", 
    title: "THREAT_REPORT", 
    icon: FileText, 
    description: "Final Analysis",
    status: "CRITICAL"
  },
  { 
    id: "contact", 
    title: "SECURE_CHANNEL", 
    icon: Terminal, 
    description: "Communication Hub",
    status: "ACTIVE"
  }
];

export function CyberSidebar({ activeSection, onSectionChange }: CyberSidebarProps) {
  const { state, toggleSidebar } = useSidebar();
  const collapsed = state === "collapsed";
  const [isHovered, setIsHovered] = useState(false);
  const [accessLevel] = useState("ADMIN");

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCESSIBLE": return "text-green-400";
      case "SCANNING": return "text-yellow-400";
      case "CLASSIFIED": return "text-orange-400";
      case "ENCRYPTED": return "text-blue-400";
      case "CRITICAL": return "text-red-400";
      case "ACTIVE": return "text-green-400";
      default: return "text-terminal-green";
    }
  };

  return (
    <div className="relative">
      <Sidebar
        className={`
          ${collapsed && !isHovered ? "w-16" : "w-72"} 
          bg-terminal-bg border-r border-terminal-green/30 transition-all duration-300
          ${collapsed ? "hover:w-72" : ""}
        `}
        collapsible="icon"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Expand/Collapse trigger on the right edge */}
        <button
          onClick={toggleSidebar}
          className="absolute right-0 top-1/2 transform translate-x-full -translate-y-1/2 z-50
                     bg-terminal-bg border border-terminal-green/30 rounded-r-lg p-2
                     text-terminal-green-bright hover:bg-terminal-green/10 transition-all duration-300
                     border-l-0"
          style={{ 
            borderTopLeftRadius: 0, 
            borderBottomLeftRadius: 0,
            width: '32px',
            height: '48px'
          }}
        >
          <span className={`transform transition-transform duration-300 ${collapsed ? 'rotate-180' : ''}`}>
            &lt;
          </span>
        </button>
      <SidebarContent className="bg-terminal-bg text-terminal-green">
        {/* Header */}
        <div className="p-4 border-b border-terminal-green/30">
          <div className="flex items-center gap-2 mb-2">
            <Lock className="w-5 h-5 text-terminal-green-bright" />
            {(!collapsed || isHovered) && (
              <div>
                <h2 className="font-bold text-terminal-green-bright text-sm">SECURITY PORTAL</h2>
                <p className="text-xs text-terminal-green/60">Access Level: {accessLevel}</p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Sections */}
        <SidebarGroup className="px-2">
          <SidebarGroupLabel className="text-terminal-green-bright text-xs font-bold">
            {(collapsed && !isHovered) ? "NAV" : "NAVIGATION MODULES"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              {securitySections.map((section) => {
                const isActive = activeSection === section.id;
                
                return (
                  <SidebarMenuItem key={section.id}>
                    <SidebarMenuButton 
                      asChild
                      className={`
                        group relative overflow-hidden transition-all duration-300
                        ${isActive 
                          ? "bg-terminal-green/20 border border-terminal-green text-terminal-green-bright" 
                          : "hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30"
                        }
                        ${(collapsed && !isHovered) ? "justify-center p-2" : "p-3"}
                      `}
                    >
                      <button onClick={() => handleSectionClick(section.id)}>
                        <section.icon className={`${(collapsed && !isHovered) ? "w-5 h-5" : "w-4 h-4 mr-3"} shrink-0`} />
                        
                        {(!collapsed || isHovered) && (
                          <div className="flex-1 text-left">
                            <div className="flex items-center justify-between mb-1">
                              <span className="font-bold text-xs">{section.title}</span>
                              <span className={`text-xs ${getStatusColor(section.status)}`}>
                                ●
                              </span>
                            </div>
                            <div className="text-xs text-terminal-green/70">
                              {section.description}
                            </div>
                          </div>
                        )}
                        
                        {/* Active indicator */}
                        {isActive && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-terminal-green-bright animate-pulse" />
                        )}
                        
                        {/* Hover glow effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-terminal-green transition-opacity duration-300" />
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Quick Actions */}
        <SidebarGroup className="px-2 mt-auto">
          <SidebarGroupLabel className="text-terminal-green-bright text-xs font-bold">
            {(collapsed && !isHovered) ? "ACT" : "QUICK ACTIONS"}
          </SidebarGroupLabel>
          
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30"
                >
                  <a href="https://github.com/Abhiram-ops" target="_blank" rel="noopener noreferrer">
                    <Github className={`${(collapsed && !isHovered) ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                    {(!collapsed || isHovered) && <span className="text-xs">GITHUB ACCESS</span>}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              
              <SidebarMenuItem>
                <SidebarMenuButton 
                  asChild
                  className="hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30"
                >
                  <button onClick={() => {
                    const downloadUrl = 'https://drive.google.com/uc?export=download&id=1-C3LB0xbaFQYC0yxsQj-1s_fOldE74Z0';
                    window.open(downloadUrl, '_blank');
                  }}>
                    <Download className={`${(collapsed && !isHovered) ? "w-5 h-5" : "w-4 h-4 mr-3"}`} />
                    {(!collapsed || isHovered) && <span className="text-xs">DOWNLOAD INTEL</span>}
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Status */}
        {(!collapsed || isHovered) && (
          <div className="p-4 border-t border-terminal-green/30 mt-auto">
            <div className="text-xs">
              <div className="flex justify-between mb-1">
                <span className="text-terminal-green/60">System Status:</span>
                <span className="text-green-400">ONLINE</span>
              </div>
              <div className="flex justify-between mb-1">
                <span className="text-terminal-green/60">Security Level:</span>
                <span className="text-yellow-400">HIGH</span>
              </div>
              <div className="flex justify-between">
                <span className="text-terminal-green/60">Access Time:</span>
                <span className="text-terminal-green">{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        )}
      </SidebarContent>
    </Sidebar>
    </div>
  );
}