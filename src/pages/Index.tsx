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
  const [activeSection, setActiveSection] = useState("hero");
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
      company: "Caarya",
      position: "Business Development Associate",
      period: "Feb 2025 - Present",
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
      title: "Web Vulnerability Scanner",
      description: "Advanced OWASP Top 10 detection tool with automated reporting",
      impact: "Security Testing"
    },
    {
      title: "LeadFinder Tool",
      description: "Automated lead generation with advanced scraping techniques", 
      impact: "35% efficiency boost"
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

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
  };

  // Lock Screen Component
  if (!isUnlocked && !isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center">
        <MatrixBackground />
        
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          {/* Letter/Envelope UI */}
          <div className="bg-terminal-bg-light border-2 border-terminal-green rounded-lg p-8 shadow-2xl">
            <div className="mb-6">
              {/* Envelope/Letter Icon */}
              <div className="w-24 h-16 mx-auto mb-4 border-2 border-terminal-green rounded relative">
                <div className="absolute top-2 left-2 right-2 bottom-2 border border-terminal-green/50 rounded"></div>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                  <Lock className="w-8 h-8 text-terminal-green-bright animate-pulse" />
                </div>
              </div>
              
              <h1 className="text-2xl font-bold text-terminal-green-bright mb-2 glitch-text">
                CLASSIFIED ACCESS
              </h1>
              <p className="text-terminal-green/80 text-sm mb-6">
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

  // Animation Screen
  if (isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center">
        <MatrixBackground />
        
        <div className="relative z-10 text-center">
          <div className="animate-pulse">
            <Shield className="w-24 h-24 mx-auto text-terminal-green-bright mb-4 animate-spin" />
            <h2 className="text-2xl font-bold text-terminal-green-bright mb-2 glitch-text">
              INITIALIZING SECURE CONNECTION...
            </h2>
            <p className="text-terminal-green/80">
              Decrypting portfolio data...
            </p>
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-terminal-green-bright rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-terminal-green-bright rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-terminal-green-bright rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Portfolio Content with Sidebar
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-terminal-bg text-terminal-green">
        {/* Cybersecurity Sidebar */}
        <CyberSidebar activeSection={activeSection} onSectionChange={handleSectionChange} />
        
        {/* Main Content */}
        <main className="flex-1 relative">
          {/* Header with Sidebar Trigger */}
          <header className="sticky top-0 z-20 h-12 flex items-center bg-terminal-bg/95 backdrop-blur border-b border-terminal-green/30">
            <SidebarTrigger className="ml-4 text-terminal-green-bright hover:text-terminal-green" />
            <div className="flex-1 text-center">
              <span className="text-xs font-mono text-terminal-green-bright">
                SECURE SESSION ACTIVE • ACCESS LEVEL: ADMIN
              </span>
            </div>
            <div className="mr-4">
              <span className="text-xs text-terminal-green/60">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
          </header>

          {/* Professional Cybersecurity Background */}
          <div 
            className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30"
            style={{
              backgroundImage: `url(${cyberBg})`,
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Matrix Rain Overlay */}
          <MatrixBackground />
          
          {/* Hero Section */}
          <section id="hero" className="relative z-10 min-h-screen flex items-center justify-center px-4">
            <div className="text-center max-w-4xl mx-auto animate-fade-in">
              <div className="mb-8">
                <h1 className="text-6xl md:text-8xl font-bold mb-4 glitch-text font-mono">
                  {typedText}
                  <span className="animate-blink">|</span>
                </h1>
                <h2 className="text-xl md:text-2xl font-bold text-terminal-green-bright mb-4">
                  TECH-SAVVY COMPUTER SCIENCE STUDENT
                </h2>
                <p className="text-sm md:text-base text-terminal-green/80 mb-2">
                  Specialized in <span className="text-terminal-green-bright">CYBERSECURITY</span> & <span className="text-terminal-green-bright">PENETRATION TESTING</span>
                </p>
                <p className="text-sm md:text-base text-terminal-green/80 mb-8">
                  Ethical hacker | Security researcher | Code architect
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Visakhapatnam, Andhra Pradesh</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4" />
                    <span>9556925563</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4" />
                    <a 
                      href="mailto:lankaabhiram16@gmail.com" 
                      className="hover:text-terminal-green-bright transition-colors cursor-pointer"
                    >
                      lankaabhiram16@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  variant="terminal" 
                  size="lg" 
                  className="animate-terminal-glow"
                  onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}
                >
                  <Github className="w-5 h-5" />
                  GITHUB ACCESS
                </Button>
              </div>
            </div>
          </section>

          {/* Core Skills Section */}
          <section id="skills" className="relative z-10 px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <TerminalWindow title="CORE_EXPERTISE.SYS" className="mb-12">
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
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="relative z-10 px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <TerminalWindow title="RECENT_MISSIONS.LOG" className="mb-12">
                <div className="space-y-4">
                  {experiences.map((exp, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border border-terminal-green/20 rounded">
                      <div>
                        <h3 className="font-bold text-terminal-green-bright">{exp.company}</h3>
                        <p className="text-sm text-terminal-green/80">{exp.position}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-terminal-green/60">{exp.period}</p>
                        <p className="text-sm text-terminal-green">{exp.highlight}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-terminal-green/60">+ Detailed achievements & impact metrics in resume</p>
                </div>
              </TerminalWindow>
            </div>
          </section>

          {/* Projects Section */}
          <section id="projects" className="relative z-10 px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <TerminalWindow title="FEATURED_EXPLOITS.DIR" className="mb-12">
                <div className="space-y-4">
                  {featuredProjects.map((project, index) => (
                    <div key={index} className="border border-terminal-green/30 p-4 rounded">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-bold text-terminal-green-bright">{project.title}</h3>
                        <span className="text-xs text-terminal-green/60 bg-terminal-bg-light px-2 py-1 rounded">
                          {project.impact}
                        </span>
                      </div>
                      <p className="text-sm text-terminal-green/90">{project.description}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-terminal-green/60">+ Additional projects & technical details in full resume</p>
                </div>
              </TerminalWindow>
            </div>
          </section>

          {/* Assessment Section */}
          <section id="assessment" className="relative z-10 px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <TerminalWindow title="THREAT_ASSESSMENT.FINAL" className="mb-12">
                <div className="text-center space-y-6">
                  <div className="flex justify-center items-center gap-4 mb-6">
                    <Shield className="w-8 h-8 text-terminal-green-bright" />
                    <Brain className="w-8 h-8 text-terminal-green-bright" />
                    <Code className="w-8 h-8 text-terminal-green-bright" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-terminal-green-bright mb-4 font-sans">
                    WHY CHOOSE ME?
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="p-4 border border-terminal-green/30 rounded">
                      <h4 className="font-bold text-terminal-green-bright mb-2">SECURITY FIRST</h4>
                      <p className="text-sm text-terminal-green/80">
                        Hands-on experience with penetration testing, vulnerability assessment, and OWASP methodologies
                      </p>
                    </div>
                    
                    <div className="p-4 border border-terminal-green/30 rounded">
                      <h4 className="font-bold text-terminal-green-bright mb-2">PROVEN RESULTS</h4>
                      <p className="text-sm text-terminal-green/80">
                        35% conversion rates, leadership roles, and recognition across cybersecurity & business domains
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-terminal-bg-light p-6 rounded border border-terminal-green">
                    <p className="text-lg text-terminal-green-bright mb-4">
                      🎯 <strong>Ready to secure your next project?</strong>
                    </p>
                    <p className="text-sm text-terminal-green/90 mb-6">
                      This portfolio shows just a glimpse. My full resume contains detailed project breakdowns, 
                      technical achievements, certifications, and quantified impact metrics that demonstrate 
                      my value as a cybersecurity professional.
                    </p>
                    
                    <Button 
                      variant="terminal" 
                      size="lg" 
                      onClick={handleDownloadResume}
                      className="animate-terminal-glow"
                    >
                      <Download className="w-5 h-5" />
                      ACCESS FULL INTEL - DOWNLOAD RESUME
                    </Button>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="relative z-10 px-4 py-20">
            <div className="max-w-6xl mx-auto">
              <TerminalWindow title="SECURE_CHANNEL.COMM" className="mb-12">
                <div className="text-center space-y-6">
                  <h3 className="text-2xl font-bold text-terminal-green-bright mb-6">
                    ESTABLISH SECURE CONNECTION
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="p-6 border border-terminal-green/30 rounded bg-terminal-bg/50">
                      <Github className="w-8 h-8 text-terminal-green-bright mx-auto mb-4" />
                      <h4 className="font-bold text-terminal-green-bright mb-2">CODE REPOSITORY</h4>
                      <p className="text-sm text-terminal-green/80 mb-4">
                        Access my secure development environment and project archives
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                      >
                        GITHUB ACCESS
                      </Button>
                    </div>
                    
                    <div className="p-6 border border-terminal-green/30 rounded bg-terminal-bg/50">
                      <Download className="w-8 h-8 text-terminal-green-bright mx-auto mb-4" />
                      <h4 className="font-bold text-terminal-green-bright mb-2">INTELLIGENCE REPORT</h4>
                      <p className="text-sm text-terminal-green/80 mb-4">
                        Download comprehensive analysis of capabilities and achievements
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={handleDownloadResume}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10"
                      >
                        DOWNLOAD RESUME
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mt-8 p-4 border border-terminal-green/30 rounded bg-terminal-bg-light">
                    <p className="text-sm text-terminal-green/90">
                      <strong>DIRECT COMMUNICATION CHANNELS:</strong><br />
                      📧 lankaabhiram16@gmail.com | 📞 9556925563 | 📍 Visakhapatnam, AP
                    </p>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </section>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
