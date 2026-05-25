import { useState, useEffect } from "react";
import { Shield, Code, Target, Download, Github, Terminal, Lock, Eye, FileText, X, ChevronRight } from "lucide-react";

interface CyberSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

const securitySections = [
  { id: "hero", title: "IDENTITY_SCAN", icon: Eye, description: "Personal Profile", status: "ACCESSIBLE" },
  { id: "skills", title: "SKILL_MATRIX", icon: Code, description: "Technical Arsenal", status: "SCANNING" },
  { id: "experience", title: "MISSION_LOG", icon: Target, description: "Combat History", status: "CLASSIFIED" },
  { id: "projects", title: "EXPLOIT_VAULT", icon: Shield, description: "Project Database", status: "ENCRYPTED" },
  { id: "assessment", title: "THREAT_REPORT", icon: FileText, description: "Final Analysis", status: "CRITICAL" },
  { id: "contact", title: "SECURE_CHANNEL", icon: Terminal, description: "Communication Hub", status: "ACTIVE" }
];

export function CyberSidebar({ activeSection, onSectionChange, isOpen, onOpenChange }: CyberSidebarProps) {
  const [accessLevel] = useState("ADMIN");
  const [hovering, setHovering] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [visitedSections, setVisitedSections] = useState<Set<string>>(new Set([activeSection]));

  const shouldShow = isOpen || hovering;

  // Live ticking clock
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Track visited sections
  useEffect(() => {
    setVisitedSections(prev => new Set([...prev, activeSection]));
  }, [activeSection]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ACCESSIBLE": return "text-green-400";
      case "SCANNING":   return "text-yellow-400";
      case "CLASSIFIED": return "text-orange-400";
      case "ENCRYPTED":  return "text-blue-400";
      case "CRITICAL":   return "text-red-400";
      case "ACTIVE":     return "text-green-400";
      default:           return "text-terminal-green";
    }
  };

  const handleClose = () => { onOpenChange(false); setHovering(false); };

  const handleSectionClick = (sectionId: string) => {
    onSectionChange(sectionId);
    handleClose();
  };

  const visitedCount = visitedSections.size;
  const totalSections = securitySections.length;

  return (
    <>
      {/* Hover trigger strip */}
      <div
        className="fixed left-0 top-0 h-full w-3 z-40 cursor-pointer"
        style={{ background: "linear-gradient(to right, rgba(0,255,65,0.18), transparent)" }}
        onMouseEnter={() => setHovering(true)}
      />

      {/* Chevron tab when closed */}
      {!shouldShow && (
        <div
          className="fixed left-0 top-1/2 -translate-y-1/2 z-40 cursor-pointer"
          onMouseEnter={() => setHovering(true)}
        >
          <div className="bg-terminal-bg border-r border-t border-b border-terminal-green/40 rounded-r-md px-1 py-3 hover:bg-terminal-green/10 transition-colors">
            <ChevronRight className="w-3 h-3 text-terminal-green-bright" />
          </div>
        </div>
      )}

      {/* Backdrop */}
      {shouldShow && (
        <div className="fixed inset-0 z-40 bg-black/20" onClick={handleClose} />
      )}

      {/* Sidebar panel */}
      <div
        className={`fixed left-0 top-0 h-full w-72 z-50 bg-terminal-bg border-r border-terminal-green/30 flex flex-col
          transition-transform duration-300 ease-in-out
          ${shouldShow ? "translate-x-0" : "-translate-x-full"}`}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Header */}
        <div className="p-4 border-b border-terminal-green/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-terminal-green-bright" />
            <div>
              <h2 className="font-bold text-terminal-green-bright text-sm">SECURITY PORTAL</h2>
              <p className="text-xs text-terminal-green/60">Access Level: {accessLevel}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-terminal-green/40 hover:text-terminal-green-bright transition-colors p-1 rounded hover:bg-terminal-green/10"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Exploration progress */}
        <div className="px-4 py-2 border-b border-terminal-green/20 shrink-0">
          <div className="flex justify-between text-xs font-mono mb-1">
            <span className="text-terminal-green/50">MODULES EXPLORED</span>
            <span className="text-terminal-green-bright">{visitedCount}/{totalSections}</span>
          </div>
          <div className="w-full h-1.5 bg-terminal-green/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal-green-bright rounded-full transition-all duration-500"
              style={{ width: `${(visitedCount / totalSections) * 100}%` }}
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-2 py-2" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <p className="text-terminal-green-bright text-xs font-bold px-2 py-2 tracking-widest">NAVIGATION MODULES</p>
          <div className="space-y-1">
            {securitySections.map((section) => {
              const isActive = activeSection === section.id;
              const isVisited = visitedSections.has(section.id);
              return (
                <button
                  key={section.id}
                  onClick={() => handleSectionClick(section.id)}
                  className={`
                    group relative overflow-hidden transition-all duration-300 p-3 w-full flex items-center rounded-md text-sm
                    ${isActive
                      ? "bg-terminal-green/20 border border-terminal-green text-terminal-green-bright"
                      : "hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30 text-terminal-green"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-terminal-green-bright animate-pulse" />
                  )}
                  <section.icon className="w-4 h-4 mr-3 shrink-0" />
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-bold text-xs">{section.title}</span>
                      <span className={`text-xs ${getStatusColor(section.status)}`}>●</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-terminal-green/60">{section.description}</div>
                      {isVisited && !isActive && (
                        <span className="text-xs text-terminal-green/30 font-mono">✓</span>
                      )}
                    </div>
                  </div>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 bg-terminal-green rounded-md transition-opacity duration-200" style={{ pointerEvents: "none" }} />
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="px-2 py-2 border-t border-terminal-green/20 shrink-0">
          <p className="text-terminal-green-bright text-xs font-bold px-2 py-2 tracking-widest">QUICK ACTIONS</p>
          <div className="space-y-1">
            <a
              href="https://github.com/Abhiram-ops"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 rounded-md hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30 text-terminal-green transition-all duration-300 w-full"
            >
              <Github className="w-4 h-4 mr-3" />
              <span className="text-xs font-mono">GITHUB ACCESS</span>
            </a>
            <button
              onClick={() => { const a = document.createElement('a'); a.href = '/abhiramportfolio/Abhiram_Lanka_Resume.docx'; a.download = 'Abhiram_Lanka_Resume.docx'; a.click(); }}
              className="flex items-center p-3 rounded-md hover:bg-terminal-green/10 border border-transparent hover:border-terminal-green/30 text-terminal-green transition-all duration-300 w-full text-left"
            >
              <Download className="w-4 h-4 mr-3" />
              <span className="text-xs font-mono">DOWNLOAD INTEL</span>
            </button>
          </div>
        </div>

        {/* System Status with live clock */}
        <div className="p-4 border-t border-terminal-green/30 shrink-0">
          <div className="text-xs font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-terminal-green/50">System Status:</span>
              <span className="text-green-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block"></span>
                ONLINE
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green/50">Security Level:</span>
              <span className="text-yellow-400">HIGH</span>
            </div>
            <div className="flex justify-between">
              <span className="text-terminal-green/50">Session Time:</span>
              <span className="text-terminal-green tabular-nums">{currentTime}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
