import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { CyberSidebar } from "@/components/CyberSidebar";
import { Github, Download, Mail, Phone, MapPin, ExternalLink, Calendar, Building, GraduationCap, Award, Shield, Code, Brain, Lock, Unlock, Menu } from "lucide-react";
import cyberBg from "@/assets/cyber-bg.jpg";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [typedText, setTypedText] = useState("");
  const fullText = "ABHIRAM LANKA";
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 150);

    return () => clearInterval(timer);
  }, []);

  const keySkills = ["Python", "Java", "Cybersecurity", "Penetration Testing", "OWASP", "Kali Linux", "JavaScript", "SQL", "REMAC+"];
  const tools = ["Wireshark", "Nmap", "Maltego", "MySQL", "PostgreSQL", "MongoDB", "Git", "VS Code", "Bash Scripting", "Jupyter"];
  const additionalSkills = ["Vulnerability Assessment", "Network Security", "Unit Testing", "Test Case Design", "HTML/CSS", "SQLite"];

  const experiences = [
    {
      company: "OpenHire",
      position: "Business Development Associate (Internship)",
      period: "Feb 2026 - Present",
      highlight: "Managing high-impact client acquisition and partnership growth for OpenHire, a premier recruitment firm specialized in high-growth startups and large-scale businesses. Building high-performance sales and ops engines for EdTech & SaaS clients."
    },
    {
      company: "Caarya",
      position: "Business Development Associate",
      period: "Jan 2025 - Dec 2025",
      highlight: "35% conversion rate in startup prospecting"
    },
    {
      company: "IIT Bhubaneswar", 
      position: "Software Testing Intern",
      period: "May 2024 - July 2024",
      highlight: "Validated academic software systems"
    },
    {
      company: "Techno Hacks",
      position: "Cybersecurity Intern", 
      period: "July 2024 - Aug 2024",
      highlight: "Advanced penetration testing & network analysis"
    }
  ];

  const featuredProjects = [
    {
      title: "Cybersweep",
      description: "Advanced cybersecurity reconnaissance tool for comprehensive network analysis, vulnerability detection, and threat assessment with automated reporting capabilities",
      impact: "CRITICAL",
      tech: "Python • Nmap • Security Analytics • Automation",
      github: "https://github.com/Abhiram-ops/Cybersweep"
    },
    {
      title: "Network Security Assessment Tool",
      description: "Automated vulnerability scanning and penetration testing framework with real-time threat detection and comprehensive security analysis",
      impact: "CRITICAL",
      tech: "Python • Nessus • OpenVAS • Custom Scripts"
    },
    {
      title: "Web Vulnerability Scanner",
      description: "Advanced OWASP Top 10 detection tool with automated reporting and secure code analysis",
      impact: "HIGH",
      tech: "Python • OWASP • Burp Suite • Web Security"
    },
    {
      title: "LeadFinder Tool",
      description: "Automated lead generation with advanced scraping techniques and data analytics for business intelligence", 
      impact: "HIGH",
      tech: "Python • Web Scraping • Data Analytics • Automation"
    }
  ];

  const handleDownloadResume = () => {
    // Direct download link from Google Drive
    const downloadUrl = 'https://drive.google.com/uc?export=download&id=1-C3LB0xbaFQYC0yxsQj-1s_fOldE74Z0';
    window.open(downloadUrl, '_blank');
  };

  const handleUnlock = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsAnimating(false);
    }, 2000);
  };

  const sections = ["hero", "skills", "experience", "projects", "assessment", "contact"];
  
  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setShowSidebar(false);
  };

  const handleNextSection = () => {
    const currentIndex = sections.indexOf(activeSection);
    const nextIndex = (currentIndex + 1) % sections.length;
    setActiveSection(sections[nextIndex]);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const { scrollTop, scrollHeight, clientHeight } = element;
    
    // Check if scrolled to bottom (with small threshold)
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      const currentIndex = sections.indexOf(activeSection);
      if (currentIndex < sections.length - 1) {
        setTimeout(() => {
          handleNextSection();
        }, 800);
      }
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="text-center max-w-4xl mx-auto animate-fade-in w-full">
              <div className="mb-6 sm:mb-8">
                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 glitch-text font-mono break-words">
                  {typedText}
                  <span className="animate-blink">|</span>
                </h1>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-terminal-green-bright mb-4 px-2">
                  TECH-SAVVY COMPUTER SCIENCE STUDENT
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-terminal-green/80 mb-2 px-2">
                  Specialized in <span className="text-terminal-green-bright">CYBERSECURITY</span> & <span className="text-terminal-green-bright">PENETRATION TESTING</span>
                </p>
                <p className="text-xs sm:text-sm md:text-base text-terminal-green/80 mb-6 sm:mb-8 px-2">
                  Ethical hacker | Security researcher | Code architect
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <MapPin className="w-4 h-4 flex-shrink-0" />
                    <span className="break-words">Visakhapatnam, Andhra Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <a 
                      href="mailto:lankaabhiram16@gmail.com" 
                      className="hover:text-terminal-green-bright transition-colors cursor-pointer break-all"
                    >
                      lankaabhiram16@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mb-8">
                <Button 
                  variant="terminal" 
                  size="lg" 
                  className="animate-terminal-glow w-full sm:w-auto text-sm sm:text-base"
                  onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}
                >
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                  GITHUB ACCESS
                </Button>
              </div>
              
              {/* Add padding at bottom to trigger scroll */}
              <div className="h-64 sm:h-96"></div>
            </div>
          </section>
        );

      case "skills":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="CORE_EXPERTISE.SYS" className="mb-8 sm:mb-12">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-terminal-green-bright flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      [SECURITY_ARSENAL]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keySkills.map((skill) => (
                        <SkillTag key={skill} skill={skill} />
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-bold mb-4 text-terminal-green-bright flex items-center gap-2">
                      <Code className="w-5 h-5" />
                      [HACKING_TOOLS]
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tools.map((tool) => (
                        <SkillTag key={tool} skill={tool} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="text-lg font-bold mb-4 text-terminal-green-bright flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    [ADDITIONAL_SKILLS]
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {additionalSkills.map((skill) => (
                      <SkillTag key={skill} skill={skill} />
                    ))}
                  </div>
                </div>
                
                <div className="mt-8 p-4 border border-terminal-green/30 rounded bg-terminal-bg/50">
                  <p className="text-sm text-terminal-green/80 italic">
                    "Specialized in offensive security, vulnerability research, and secure code development. 
                    Multiple internships in cybersecurity and software testing."
                  </p>
                </div>
              </TerminalWindow>
              
              {/* Add padding at bottom to trigger scroll */}
              <div className="h-64 sm:h-96"></div>
            </div>
          </section>
        );

      case "experience":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="RECENT_MISSIONS.LOG" className="mb-8 sm:mb-12">
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 sm:p-4 border border-terminal-green/20 rounded gap-2">
                      <div className="flex-1">
                        <h3 className="font-bold text-terminal-green-bright text-sm sm:text-base">{exp.company}</h3>
                        <p className="text-xs sm:text-sm text-terminal-green/80">{exp.position}</p>
                      </div>
                      <div className="sm:text-right">
                        <p className="text-xs text-terminal-green/60">{exp.period}</p>
                        <p className="text-xs sm:text-sm text-terminal-green">{exp.highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-terminal-green/60 px-2">+ Detailed achievements & impact metrics in resume</p>
                </div>
              </TerminalWindow>
              
              {/* Add padding at bottom to trigger scroll */}
              <div className="h-64 sm:h-96"></div>
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="FEATURED_EXPLOITS.DIR" className="mb-8 sm:mb-12">
                <div className="space-y-4">
                  {featuredProjects.map((project, index) => (
                    <div key={index} className="border border-terminal-green/30 p-3 sm:p-4 rounded hover:border-terminal-green/50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-2 gap-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <h3 className="text-base sm:text-lg font-bold text-terminal-green-bright">{project.title}</h3>
                            {project.github && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => window.open(project.github, '_blank')}
                                className="h-6 w-6 p-0 text-terminal-green hover:text-terminal-green-bright flex-shrink-0"
                              >
                                <Github className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                          {project.tech && (
                            <p className="text-xs text-terminal-green/60 mb-2 font-mono break-words">{project.tech}</p>
                          )}
                        </div>
                        <span className="text-xs text-terminal-green/60 bg-terminal-bg-light px-2 py-1 rounded self-start flex-shrink-0">
                          {project.impact}
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-terminal-green/90">{project.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-xs sm:text-sm text-terminal-green/60 px-2">+ Additional projects & technical details in full resume</p>
                </div>
              </TerminalWindow>
              
              {/* Add padding at bottom to trigger scroll */}
              <div className="h-64 sm:h-96"></div>
            </div>
          </section>
        );

      case "assessment":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="THREAT_ASSESSMENT.FINAL" className="mb-8 sm:mb-12">
                <div className="text-center space-y-4 sm:space-y-6 px-2">
                  <div className="flex justify-center items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-green-bright" />
                    <Brain className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-green-bright" />
                    <Code className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-green-bright" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-terminal-green-bright mb-4 font-sans">
                    WHY CHOOSE ME?
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 border border-terminal-green/30 rounded">
                      <h4 className="font-bold text-terminal-green-bright mb-2 text-sm sm:text-base">SECURITY FIRST</h4>
                      <p className="text-xs sm:text-sm text-terminal-green/80">
                        Hands-on experience with penetration testing, vulnerability assessment, and OWASP methodologies
                      </p>
                    </div>
                    
                    <div className="p-3 sm:p-4 border border-terminal-green/30 rounded">
                      <h4 className="font-bold text-terminal-green-bright mb-2 text-sm sm:text-base">PROVEN RESULTS</h4>
                      <p className="text-xs sm:text-sm text-terminal-green/80">
                        35% conversion rates, leadership roles, and recognition across cybersecurity & business domains
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-terminal-bg-light p-4 sm:p-6 rounded border border-terminal-green">
                    <p className="text-base sm:text-lg text-terminal-green-bright mb-3 sm:mb-4">
                      🎯 <strong>Ready to secure your next project?</strong>
                    </p>
                    <p className="text-xs sm:text-sm text-terminal-green/90 mb-4 sm:mb-6">
                      This portfolio shows just a glimpse. My full resume contains detailed project breakdowns, 
                      technical achievements, certifications, and quantified impact metrics that demonstrate 
                      my value as a cybersecurity professional.
                    </p>
                    
                    <Button 
                      variant="terminal" 
                      size="lg" 
                      onClick={handleDownloadResume}
                      className="animate-terminal-glow w-full sm:w-auto text-xs sm:text-sm"
                    >
                      <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="truncate">ACCESS FULL INTEL - DOWNLOAD RESUME</span>
                    </Button>
                  </div>
                </div>
              </TerminalWindow>
              
                {/* Add padding at bottom to trigger scroll */}
                <div className="h-64 sm:h-96"></div>
              </div>
            </section>
          );

      case "contact":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="SECURE_CHANNEL.COMM" className="mb-8 sm:mb-12">
                <div className="text-center space-y-4 sm:space-y-6 px-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-terminal-green-bright mb-4 sm:mb-6">
                    ESTABLISH SECURE CONNECTION
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                    <div className="p-4 sm:p-6 border border-terminal-green/30 rounded bg-terminal-bg/50">
                      <Github className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-green-bright mx-auto mb-3 sm:mb-4" />
                      <h4 className="font-bold text-terminal-green-bright mb-2 text-sm sm:text-base">CODE REPOSITORY</h4>
                      <p className="text-xs sm:text-sm text-terminal-green/80 mb-3 sm:mb-4">
                        Access my secure development environment and project archives
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 w-full sm:w-auto text-xs sm:text-sm"
                      >
                        GITHUB ACCESS
                      </Button>
                    </div>
                    
                    <div className="p-4 sm:p-6 border border-terminal-green/30 rounded bg-terminal-bg/50">
                      <Download className="w-6 h-6 sm:w-8 sm:h-8 text-terminal-green-bright mx-auto mb-3 sm:mb-4" />
                      <h4 className="font-bold text-terminal-green-bright mb-2 text-sm sm:text-base">INTELLIGENCE REPORT</h4>
                      <p className="text-xs sm:text-sm text-terminal-green/80 mb-3 sm:mb-4">
                        Download comprehensive analysis of capabilities and achievements
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDownloadResume}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 w-full sm:w-auto text-xs sm:text-sm"
                      >
                        DOWNLOAD RESUME
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 border border-terminal-green/30 rounded bg-terminal-bg-light">
                    <p className="text-xs sm:text-sm text-terminal-green/90 break-words">
                      <strong>DIRECT COMMUNICATION CHANNELS:</strong><br />
                      📧 <a href="mailto:lankaabhiram16@gmail.com" className="hover:text-terminal-green-bright transition-colors break-all">lankaabhiram16@gmail.com</a><br className="sm:hidden" /> | 📞 <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a><br className="sm:hidden" /> | 📍 Visakhapatnam, AP
                    </p>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </section>
        );

      default:
        return (
          <section className="min-h-screen flex items-center justify-center px-4 relative z-10">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4 text-terminal-green-bright">
                SELECT A SECTION
              </h1>
              <p className="text-terminal-green/80">Choose a security module from the sidebar to proceed.</p>
            </div>
          </section>
        );
    }
  };

  // Lock Screen Component
  if (!isUnlocked && !isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center">
        <MatrixBackground />
        
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          {/* Letter/Envelope UI */}
          <div className="bg-terminal-bg-light border-2 border-terminal-green rounded-lg p-6 md:p-8 shadow-2xl">
            <div className="mb-6">
              {/* Envelope/Letter Icon */}
              <div className="w-24 h-16 mx-auto mb-4 border-2 border-terminal-green rounded relative">
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-terminal-green/50 rounded"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-terminal-green-bright animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-xl md:text-2xl font-bold text-terminal-green-bright mb-2 glitch-text">
                CLASSIFIED ACCESS
              </h1>
              <p className="text-terminal-green/80 text-sm mb-4 md:mb-6">
                Security credentials required
              </p>
            </div>
            
            <div className="text-center mb-6">
              <p className="text-terminal-green-bright font-bold mb-4">
                UNLOCK TO PROCEED
              </p>
              <p className="text-xs text-terminal-green/60 mb-6">
                Click the lock to access ABHIRAM's portfolio
              </p>
            </div>
            
            <Button
              onClick={handleUnlock}
              variant="terminal"
              size="lg"
              className="w-full animate-terminal-glow"
            >
              <Unlock className="w-5 h-5 mr-2" />
              GRANT ACCESS
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // High-End Cybersecurity Animation Screen
  if (isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center overflow-hidden">
        <MatrixBackground />
        
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-terminal-green/10 to-transparent animate-pulse"></div>
          <div className="grid grid-cols-12 gap-1 h-full opacity-30">
            {Array.from({length: 144}).map((_, i) => (
              <div 
                key={i} 
                className="border border-terminal-green/20 animate-pulse"
                style={{animationDelay: `${i * 0.05}s`}}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="relative z-10 text-center max-w-2xl px-4">
          {/* Central Scanning Interface */}
          <div className="relative mb-8">
            {/* Outer Scanning Ring */}
            <div className="w-64 h-64 mx-auto relative">
              <div className="absolute inset-0 border-2 border-terminal-green/30 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border border-terminal-green/50 rounded-full animate-spin" style={{animationDirection: 'reverse', animationDuration: '3s'}}></div>
              <div className="absolute inset-8 border border-terminal-green/70 rounded-full animate-spin" style={{animationDuration: '2s'}}></div>
              
              {/* Central Shield Icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative">
                  <Shield className="w-20 h-20 text-terminal-green-bright animate-pulse" />
                  <div className="absolute inset-0 w-20 h-20 border-2 border-terminal-green-bright rounded-lg animate-ping"></div>
                </div>
              </div>
              
              {/* Scanning Lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-1 h-32 bg-gradient-to-t from-transparent via-terminal-green-bright to-transparent rotate-45 animate-spin origin-bottom" style={{animationDuration: '1.5s'}}></div>
              </div>
            </div>
          </div>
          
          {/* Status Display */}
          <div className="space-y-4 mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-terminal-green-bright glitch-text">
              QUANTUM DECRYPTION IN PROGRESS
            </h2>
            <div className="space-y-2">
              <p className="text-terminal-green-bright font-mono">
                » Bypassing quantum encryption barriers...
              </p>
              <p className="text-terminal-green font-mono">
                » Authenticating biometric signatures...
              </p>
              <p className="text-terminal-green/80 font-mono">
                » Establishing secure neural link...
              </p>
            </div>
          </div>
          
          {/* Progress Indicators */}
          <div className="space-y-4">
            <div className="flex justify-center space-x-2">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i}
                  className="w-3 h-3 border border-terminal-green-bright rounded-full"
                  style={{
                    backgroundColor: i < 6 ? 'hsl(var(--terminal-green-bright))' : 'transparent',
                    animationDelay: `${i * 0.2}s`
                  }}
                ></div>
              ))}
            </div>
            
            {/* Scrolling Code Effect */}
            <div className="h-32 overflow-hidden font-mono text-xs text-terminal-green/60">
              <div className="animate-scroll-up space-y-1">
                <p>0x7FF3A2B1: AUTHENTICATION_PROTOCOL_INITIALIZED</p>
                <p>0x7FF3A2B2: QUANTUM_KEY_EXCHANGE_ACTIVE</p>
                <p>0x7FF3A2B3: NEURAL_HANDSHAKE_ESTABLISHED</p>
                <p>0x7FF3A2B4: BIOMETRIC_VERIFICATION_COMPLETE</p>
                <p>0x7FF3A2B5: ENCRYPTION_LAYER_1_BYPASSED</p>
                <p>0x7FF3A2B6: ENCRYPTION_LAYER_2_BYPASSED</p>
                <p>0x7FF3A2B7: FIREWALL_NEGOTIATION_SUCCESS</p>
                <p>0x7FF3A2B8: ACCESS_GRANTED_PORTFOLIO_UNLOCKED</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Portfolio Content with Sidebar
  return (
    <SidebarProvider defaultOpen={showSidebar}>
      <div className="min-h-screen flex w-full bg-terminal-bg">
        <MatrixBackground />
        
        {showSidebar && (
          <CyberSidebar 
            activeSection={activeSection} 
            onSectionChange={handleSectionChange} 
          />
        )}
        
        <main className="flex-1 relative">
          {/* Back to sidebar button when section is active */}
          {activeSection && !showSidebar && (
            <button
              onClick={() => {
                setShowSidebar(true);
                setActiveSection("");
              }}
              className="fixed top-4 left-4 z-50 bg-terminal-bg border border-terminal-green/30 
                       rounded p-2 text-terminal-green-bright hover:bg-terminal-green/10 
                       transition-all duration-300 shadow-lg"
              aria-label="Back to menu"
            >
              <Menu className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          )}
          
          {/* Matrix Rain Overlay with 50% opacity */}
          <div className="fixed inset-0 z-5" style={{ opacity: 0.5 }}>
            <MatrixBackground />
          </div>
          
          {renderActiveSection()}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
