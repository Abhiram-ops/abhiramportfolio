import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { CyberSidebar } from "@/components/CyberSidebar";
import { Github, Download, Mail, Phone, MapPin, Shield, Code, Brain, Lock, Unlock, Award, Briefcase, Linkedin, FileText, ChevronDown, ChevronUp, ExternalLink, Zap } from "lucide-react";

const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetProgress, setGreetProgress] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [heroSubIdx, setHeroSubIdx] = useState(0);
  const [heroSubTyped, setHeroSubTyped] = useState("");
  const fullText = "ABHIRAM LANKA";

  const heroSubtitles = [
    "Ethical Hacker. Security Researcher.",
    "Business Development Builder.",
    "Research Author — CityBus Live.",
    "Final Year CSE · Andhra University.",
  ];

  // Type name on mount
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

  // Cycle hero subtitles with typewriter effect
  useEffect(() => {
    const target = heroSubtitles[heroSubIdx];
    let i = 0;
    setHeroSubTyped("");
    const typeInterval = setInterval(() => {
      if (i <= target.length) {
        setHeroSubTyped(target.slice(0, i));
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, 55);
    const holdTimeout = setTimeout(() => {
      setHeroSubIdx(prev => (prev + 1) % heroSubtitles.length);
    }, target.length * 55 + 2800);
    return () => { clearInterval(typeInterval); clearTimeout(holdTimeout); };
  }, [heroSubIdx]);

  // Greeting progress bar auto-advance
  useEffect(() => {
    if (!showGreeting) return;
    setGreetProgress(0);
    const start = Date.now();
    const duration = 10000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setGreetProgress(Math.round(pct));
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setShowGreeting(false);
          setActiveSection("hero");
          setShowSidebar(true);
        }, 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [showGreeting]);

  // Animate skill bars when skills section becomes active
  useEffect(() => {
    if (activeSection === "skills") {
      setSkillsAnimated(false);
      const t = setTimeout(() => setSkillsAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  // Reset expanded project on section change
  useEffect(() => { setExpandedProject(null); }, [activeSection]);

  const skillLevels = [
    { name: "Cybersecurity & Pen Testing", level: 88, color: "#00ff41", cat: "sec" },
    { name: "Python", level: 85, color: "#00ff41", cat: "sec" },
    { name: "Web App Security (OWASP)", level: 84, color: "#f87171", cat: "sec" },
    { name: "Network Security & OSINT", level: 82, color: "#00ff41", cat: "sec" },
    { name: "B2B Sales & Lead Generation", level: 90, color: "#facc15", cat: "bd" },
    { name: "Client Acquisition / CRM", level: 85, color: "#facc15", cat: "bd" },
    { name: "JavaScript / React", level: 74, color: "#60a5fa", cat: "dev" },
    { name: "SQL & Databases", level: 78, color: "#60a5fa", cat: "dev" },
  ];

  const keySkills = ["Python", "Java", "Cybersecurity", "Penetration Testing", "OWASP", "Kali Linux", "JavaScript", "SQL", "Node.js"];
  const tools = ["Wireshark", "Nmap", "Maltego", "MySQL", "PostgreSQL", "MongoDB", "Git", "Bash Scripting", "Cloudflare WAF"];
  const additionalSkills = ["Vulnerability Assessment", "Network Security", "Unit Testing", "HTML/CSS", "SQLite", "React", "Flask"];
  const bdSkills = ["Lead Generation", "Client Acquisition", "B2B Sales", "CRM Management", "Market Research", "Partnership Development", "EdTech Sales", "SaaS Operations", "Talent Acquisition", "Business Analytics", "Cold Outreach", "Startup Ecosystem"];

  const experiences = [
    {
      company: "OpenHire",
      position: "Business Development Associate (Internship)",
      period: "Feb 2026 – Present",
      highlight: "Managing high-impact client acquisition and partnership growth for a premier recruitment firm. Building high-performance sales & ops engines for EdTech & SaaS clients.",
      tag: "ACTIVE"
    },
    {
      company: "codeiam.club — Andhra University",
      position: "Community Relations Lead",
      period: "Apr 2025 – Present",
      highlight: "Spearheading inter-club collaboration initiatives and fostering community engagement within codeiam.club.",
      tag: "ACTIVE"
    },
    {
      company: "Caarya",
      position: "Business Development Manager (Internship)",
      period: "Jan 2025 – Dec 2025",
      highlight: "Drove strategic partnerships connecting startups with top talent. Achieved 35% conversion rate & 50% increase in startup onboarding.",
      tag: "COMPLETED"
    },
    {
      company: "codeiam.club — Andhra University",
      position: "Cybersecurity Chapter Lead",
      period: "Apr 2024 – Mar 2025",
      highlight: "Led the Cybersecurity chapter, organised student summits and collaborated on the Codeiam Spark Nation Hackathon.",
      tag: "COMPLETED"
    },
    {
      company: "IIT Bhubaneswar",
      position: "Software Testing Intern",
      period: "May 2024 – July 2024",
      highlight: "Evaluated and validated academic software systems; designed test cases and supported automation documentation.",
      tag: "COMPLETED"
    },
    {
      company: "Techno Hacks",
      position: "Cybersecurity Intern",
      period: "July 2024 – Aug 2024",
      highlight: "Performed network sniffing (Wireshark), scanning (Nmap), and OSINT gathering (Maltego).",
      tag: "COMPLETED"
    }
  ];

  const featuredProjects = [
    {
      title: "CityBus Live — Real-Time Urban Bus Tracking",
      description: "Most city bus routes in India have no live tracking — not because the tech doesn't exist, but because dedicated GPS hardware costs ₹15,000 per vehicle. CityBus Live eliminates this by repurposing the driver's own smartphone as the tracker, delivering real-time ETAs to commuters via a PWA at zero hardware cost. Deployed live on 4 Visakhapatnam routes: 287ms avg latency, 500+ concurrent sessions, 99.8% traffic reduction vs HTTP polling. Research paper submitted to ASIANCON 2026 & ICST 2026.",
      impact: "CRITICAL",
      tech: "Flask-SocketIO • WebSocket • Azure App Service • PostgreSQL • Leaflet.js • HTML5 GPS • PWA",
      tag: "Research Paper",
      metrics: ["287ms avg latency", "500+ concurrent users", "4 live routes", "99.8% traffic reduction"]
    },
    {
      title: "Cybersweep",
      description: "A Python-powered recon toolkit that automates the early stages of a pentest — scans ports, fingerprints services, and assembles a structured threat report in a single run. Point it at a target and it does the boring parts so you can focus on the interesting ones.",
      impact: "CRITICAL",
      tech: "Python • Nmap • Security Analytics • Automation",
      github: "https://github.com/Abhiram-ops/Cybersweep",
      metrics: ["Automated recon pipeline", "Multi-vector scanning", "Structured threat reports"]
    },
    {
      title: "Web Application Vulnerability Scanner",
      description: "Point it at a target and it systematically checks for the most common web vulnerabilities across the OWASP Top 10, then generates a detailed remediation report — no manual probing needed. Console-based tool detecting SQLi, XSS, and CSRF vulnerabilities.",
      impact: "HIGH",
      tech: "Python • Requests • BeautifulSoup • OWASP Top 10",
      metrics: ["OWASP Top 10 coverage", "SQLi / XSS / CSRF detection", "Auto-remediation reports"]
    },
    {
      title: "LeadFinder – Smart Lead Scraping Tool",
      description: "A sales automation tool packaged as a standalone .exe that scrapes job boards and company pages to extract validated leads — built to cut manual prospecting time to near zero. Leverages SerpAPI, BeautifulSoup, and Regex for precise extraction.",
      impact: "HIGH",
      tech: "Python • SerpAPI • Web Scraping • Automation",
      metrics: ["Standalone .exe", "Multi-source scraping", "Validated contact extraction"]
    },
    {
      title: "E-Attendance using QR & OTP",
      description: "Built to close the proxy attendance loophole: students must scan a time-limited QR code and verify a one-time PIN before attendance is logged, making impersonation practically impossible. Dual-factor system with QR generation and OTP verification.",
      impact: "MEDIUM",
      tech: "Flask • MySQL • QR Code • OTP • Python",
      metrics: ["Time-limited QR codes", "OTP dual-factor", "Zero proxy loophole"]
    }
  ];

  const certifications = [
    { name: "Google Cybersecurity Certificate", issuer: "Google · Coursera", year: "In Progress", status: "ACTIVE" },
    { name: "REMAC+", issuer: "Udemy", year: "2026", status: "COMPLETED" },
    { name: "Business Ethics", issuer: "NPTEL · IIT", year: "2026", status: "COMPLETED" }
  ];

  const researchPapers = [
    {
      title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework Using Browser-Based GPS and WebSocket Communication",
      venue: "ASIANCON 2026",
      full: "Asia Conference on Innovation in Emerging Technologies",
      id: "Paper ID: 1595",
      status: "UNDER REVIEW"
    },
    {
      title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework Using Browser-Based GPS and WebSocket Communication",
      venue: "ICST 2026",
      full: "International Conference on Intelligent Computing & Sustainable Technologies",
      id: "Paper ID: 232",
      status: "UNDER REVIEW"
    }
  ];

  const handleDownloadResume = () => {
    const downloadUrl = '/abhiramportfolio/Abhiram_Lanka_Resume.docx';
    const a = document.createElement('a');
    a.href = downloadUrl;
    a.download = 'Abhiram_Lanka_Resume.docx';
    a.click();
  };

  const handleUnlock = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsUnlocked(true);
      setIsAnimating(false);
      setShowGreeting(true);
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
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      const currentIndex = sections.indexOf(activeSection);
      if (currentIndex < sections.length - 1) {
        setTimeout(() => { handleNextSection(); }, 800);
      }
    }
  };

  const tagColor = (tag: string) => tag === "ACTIVE"
    ? "text-terminal-green-bright bg-terminal-green/10 border-terminal-green-bright"
    : "text-terminal-green/50 bg-transparent border-terminal-green/20";

  const impactColor = (impact: string) => {
    if (impact === "CRITICAL") return "text-red-400 border-red-400/40 bg-red-400/10";
    if (impact === "HIGH") return "text-yellow-400 border-yellow-400/40 bg-yellow-400/10";
    return "text-terminal-green/60 border-terminal-green/20 bg-transparent";
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="text-center max-w-4xl mx-auto animate-fade-in w-full">
              <div className="mb-6 sm:mb-8">
                {/* Status badge */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green-bright opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-terminal-green-bright"></span>
                  </span>
                  <span className="text-xs font-mono text-terminal-green/60 tracking-widest">SYSTEM ONLINE · CLEARANCE: ADMIN</span>
                </div>

                <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-4 glitch-text font-mono break-words">
                  {typedText}<span className="animate-blink">|</span>
                </h1>

                {/* Cycling subtitle typewriter */}
                <div className="h-7 flex items-center justify-center mb-2">
                  <h2 className="text-base sm:text-lg md:text-xl font-bold text-terminal-green-bright px-2 tracking-widest font-mono">
                    {heroSubTyped}<span className="animate-blink opacity-70">_</span>
                  </h2>
                </div>

                <p className="text-xs sm:text-sm text-terminal-green/60 mb-4 tracking-wider">
                  B.Tech CSE · Andhra University · 2022–2026
                </p>
                <p className="text-xs sm:text-sm md:text-base text-terminal-green/80 mb-2 px-2">
                  Specialized in <span className="text-terminal-green-bright font-semibold">CYBERSECURITY</span> &amp; <span className="text-terminal-green-bright font-semibold">BUSINESS DEVELOPMENT</span>
                </p>

                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-terminal-green/80">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span>Visakhapatnam, AP</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-terminal-green/80">
                    <Phone className="w-3 h-3 flex-shrink-0" />
                    <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm text-terminal-green/80">
                    <Mail className="w-3 h-3 flex-shrink-0" />
                    <a href="mailto:lankaabhiram16@gmail.com" className="hover:text-terminal-green-bright transition-colors break-all">
                      lankaabhiram16@gmail.com
                    </a>
                  </div>
                </div>

                {/* Quick stat chips */}
                <div className="flex flex-wrap gap-2 justify-center mb-6">
                  {[
                    { icon: "🛡️", label: "Pen Tester" },
                    { icon: "📄", label: "2 Research Papers" },
                    { icon: "🚌", label: "CityBus Live" },
                    { icon: "📈", label: "35% Conv. Rate" },
                  ].map((chip, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 text-xs border border-terminal-green/30 rounded-full text-terminal-green/80 bg-terminal-green/5 hover:border-terminal-green/60 hover:text-terminal-green-bright transition-all duration-200 cursor-default font-mono">
                      <span>{chip.icon}</span>{chip.label}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 sm:gap-4 justify-center items-center mb-6 sm:mb-8 px-2">
                  <Button variant="terminal" size="lg" className="animate-terminal-glow"
                    onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}>
                    <Github className="w-4 h-4" /> GITHUB
                  </Button>
                  <Button variant="outline" size="lg"
                    className="border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10"
                    onClick={() => window.open('https://www.linkedin.com/in/abhiram-lanka-1696a5306/', '_blank')}>
                    <Linkedin className="w-4 h-4" /> LINKEDIN
                  </Button>
                  <Button variant="outline" size="lg"
                    className="border-terminal-green/50 text-terminal-green hover:bg-terminal-green/10"
                    onClick={handleDownloadResume}>
                    <Download className="w-4 h-4" /> RESUME
                  </Button>
                </div>
              </div>
              <div className="h-32"></div>
            </div>
          </section>
        );

      case "skills":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-6xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="SKILL_MATRIX.SYS" className="mb-6">

                {/* Animated skill bars */}
                <div className="mb-6">
                  <h3 className="text-xs font-bold text-terminal-green-bright uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap className="w-4 h-4" /> Proficiency Levels
                  </h3>
                  <div className="space-y-3">
                    {skillLevels.map((skill, i) => (
                      <div key={skill.name}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-mono text-terminal-green/80">{skill.name}</span>
                          <span className="text-xs font-mono font-bold" style={{ color: skill.color }}>
                            {skillsAnimated ? `${skill.level}%` : "0%"}
                          </span>
                        </div>
                        <div className="relative h-2 bg-terminal-green/10 rounded-full overflow-hidden border border-terminal-green/20">
                          <div
                            className="absolute left-0 top-0 h-full rounded-full transition-all ease-out"
                            style={{
                              width: skillsAnimated ? `${skill.level}%` : "0%",
                              backgroundColor: skill.color,
                              boxShadow: skillsAnimated ? `0 0 8px ${skill.color}80` : "none",
                              transitionDuration: "1200ms",
                              transitionDelay: `${i * 100}ms`,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-terminal-green/20 pt-5 grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="text-sm font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                      <Shield className="w-4 h-4" /> Security Arsenal
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {keySkills.map(s => <SkillTag key={s} skill={s} />)}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                      <Code className="w-4 h-4" /> Tools &amp; Stack
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {tools.map(s => <SkillTag key={s} skill={s} />)}
                    </div>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                    <Briefcase className="w-4 h-4" /> Business Development
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {bdSkills.map(s => (
                      <span key={s} className="px-2 py-1 text-xs border border-yellow-400/30 text-yellow-400/80 rounded font-mono hover:border-yellow-400/60 hover:bg-yellow-400/5 transition-all duration-200 cursor-default">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                    <Brain className="w-4 h-4" /> Additional Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {additionalSkills.map(s => <SkillTag key={s} skill={s} />)}
                  </div>
                </div>
              </TerminalWindow>
              <div className="h-32"></div>
            </div>
          </section>
        );

      case "experience":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-4xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="MISSION_LOG.EXP" className="mb-6">
                <div className="space-y-3">
                  {experiences.map((exp, i) => (
                    <div key={i} className="p-3 sm:p-4 border border-terminal-green/20 rounded hover:border-terminal-green/50 hover:bg-terminal-green/3 transition-all duration-200 group">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-bold text-terminal-green-bright text-sm sm:text-base group-hover:text-white transition-colors">{exp.company}</h3>
                            <span className={`text-xs border px-2 py-0.5 rounded font-mono ${tagColor(exp.tag)}`}>{exp.tag}</span>
                          </div>
                          <p className="text-xs sm:text-sm text-terminal-green/70 font-mono">{exp.position}</p>
                        </div>
                        <p className="text-xs text-terminal-green/50 font-mono whitespace-nowrap">{exp.period}</p>
                      </div>
                      <p className="text-xs text-terminal-green/80 mt-1 leading-relaxed">{exp.highlight}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-terminal-green/40 text-center mt-4 font-mono">+ Full impact metrics in resume</p>
              </TerminalWindow>
              <div className="h-32"></div>
            </div>
          </section>
        );

      case "projects":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-5xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="EXPLOIT_VAULT.DIR" className="mb-6">
                <p className="text-xs text-terminal-green/40 font-mono mb-4">» CLICK ANY PROJECT TO EXPAND DETAILS</p>
                <div className="space-y-2">
                  {featuredProjects.map((p, i) => {
                    const isExpanded = expandedProject === i;
                    return (
                      <div
                        key={i}
                        className={`border rounded transition-all duration-300 cursor-pointer select-none
                          ${isExpanded
                            ? "border-terminal-green/70 bg-terminal-green/5 shadow-lg shadow-terminal-green/10"
                            : "border-terminal-green/25 hover:border-terminal-green/50 hover:bg-terminal-green/3"
                          }`}
                        onClick={() => setExpandedProject(isExpanded ? null : i)}
                      >
                        <div className="p-3 sm:p-4">
                          <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className={`text-sm sm:text-base font-bold transition-colors ${isExpanded ? "text-white" : "text-terminal-green-bright"}`}>{p.title}</h3>
                              {p.github && (
                                <button onClick={e => { e.stopPropagation(); window.open(p.github, '_blank'); }}
                                  className="text-terminal-green hover:text-terminal-green-bright transition-colors" title="View source">
                                  <Github className="w-4 h-4" />
                                </button>
                              )}
                              {p.tag && (
                                <span className="text-xs border border-yellow-400/40 text-yellow-400/80 px-2 py-0.5 rounded font-mono">{p.tag}</span>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs border px-2 py-0.5 rounded font-mono flex-shrink-0 ${impactColor(p.impact)}`}>{p.impact}</span>
                              {isExpanded
                                ? <ChevronUp className="w-4 h-4 text-terminal-green/60 flex-shrink-0" />
                                : <ChevronDown className="w-4 h-4 text-terminal-green/40 flex-shrink-0" />
                              }
                            </div>
                          </div>
                          <p className="text-xs font-mono text-terminal-green/50 mb-1">{p.tech}</p>

                          {/* Collapsed hint */}
                          {!isExpanded && (
                            <p className="text-xs text-terminal-green/30 font-mono mt-1">[ CLICK TO EXPAND ]</p>
                          )}

                          {/* Expanded content */}
                          {isExpanded && (
                            <div className="mt-3 border-t border-terminal-green/20 pt-3 animate-fade-in">
                              <p className="text-xs text-terminal-green/40 font-mono mb-2">» PROJECT_DETAILS.LOG</p>
                              <p className="text-xs sm:text-sm text-terminal-green/90 leading-relaxed mb-3">{p.description}</p>
                              {p.metrics && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {p.metrics.map((m, mi) => (
                                    <span key={mi} className="text-xs px-2 py-1 border border-terminal-green/30 rounded font-mono text-terminal-green/70 bg-terminal-green/5">
                                      ✓ {m}
                                    </span>
                                  ))}
                                </div>
                              )}
                              {p.github && (
                                <button
                                  onClick={e => { e.stopPropagation(); window.open(p.github, '_blank'); }}
                                  className="flex items-center gap-1.5 text-xs text-terminal-green-bright hover:underline font-mono transition-colors"
                                >
                                  <ExternalLink className="w-3 h-3" /> VIEW SOURCE CODE
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <p className="text-xs text-terminal-green/40 text-center mt-4 font-mono">+ More on GitHub</p>
              </TerminalWindow>
              <div className="h-32"></div>
            </div>
          </section>
        );

      case "assessment":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-4xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="THREAT_ASSESSMENT.FINAL" className="mb-6">
                <div className="space-y-5">
                  <div>
                    <h3 className="text-xs font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4" /> Certifications
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {certifications.map((c, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 border border-terminal-green/20 rounded bg-terminal-bg/50 hover:border-terminal-green/40 hover:bg-terminal-green/3 transition-all duration-200">
                          <Shield className={`w-5 h-5 flex-shrink-0 ${c.status === 'ACTIVE' ? 'text-yellow-400' : 'text-terminal-green-bright'}`} />
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-terminal-green-bright">{c.name}</p>
                            <p className="text-xs text-terminal-green/50 font-mono">
                              {c.issuer} · {c.status === 'ACTIVE'
                                ? <span className="text-yellow-400 font-bold">IN PROGRESS</span>
                                : c.year}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Research Publications
                    </h3>
                    <div className="space-y-2">
                      {researchPapers.map((pub, i) => (
                        <div key={i} className="p-3 border border-terminal-green/20 rounded bg-terminal-bg/50 hover:border-terminal-green/40 transition-colors">
                          <div className="flex items-start justify-between gap-2 flex-wrap mb-1">
                            <p className="text-xs sm:text-sm font-bold text-terminal-green-bright flex-1 leading-snug">{pub.title}</p>
                            <span className="text-xs border border-yellow-400/40 text-yellow-400/80 px-2 py-0.5 rounded font-mono shrink-0">{pub.status}</span>
                          </div>
                          <p className="text-xs text-terminal-green/70 font-mono">{pub.venue} — {pub.full}</p>
                          <p className="text-xs text-terminal-green/40 font-mono mt-0.5">{pub.id} · First Author: Abhiram Lanka</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4" /> Leadership &amp; Recognition
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2 text-xs text-terminal-green/80">
                      {[
                        "Cybersecurity Chapter Lead — codeIAM Club",
                        "Organising Committee — Codeiam Spark Nation Hackathon",
                        "Attendee — BSides Vizag 2025 Cybersecurity Conference",
                        "1st Prize — ABVP Event (Andhra University, 2024)"
                      ].map((a, i) => (
                        <div key={i} className="flex items-start gap-2 p-2 border border-terminal-green/15 rounded hover:border-terminal-green/30 transition-colors">
                          <span className="text-terminal-green-bright mt-0.5">»</span>
                          <span>{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="p-3 border border-terminal-green/30 rounded hover:border-terminal-green/50 transition-colors">
                      <h4 className="font-bold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">Security First</h4>
                      <p className="text-xs text-terminal-green/75">Hands-on experience with penetration testing, vulnerability assessment, and OWASP methodologies.</p>
                    </div>
                    <div className="p-3 border border-terminal-green/30 rounded hover:border-terminal-green/50 transition-colors">
                      <h4 className="font-bold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">Proven Results</h4>
                      <p className="text-xs text-terminal-green/75">35% conversion rates, 50% onboarding uplift, and recognition across cybersecurity &amp; BD domains.</p>
                    </div>
                  </div>
                  <div className="bg-terminal-bg-light p-4 rounded border border-terminal-green text-center">
                    <p className="text-sm text-terminal-green-bright mb-3 font-semibold">🎯 Ready to contribute?</p>
                    <Button variant="terminal" size="lg" onClick={handleDownloadResume} className="animate-terminal-glow w-full sm:w-auto">
                      <Download className="w-4 h-4" /> DOWNLOAD FULL RESUME
                    </Button>
                  </div>
                </div>
              </TerminalWindow>
              <div className="h-32"></div>
            </div>
          </section>
        );

      case "contact":
        return (
          <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
            <div className="max-w-4xl mx-auto w-full animate-fade-in">
              <TerminalWindow title="SECURE_CHANNEL.COMM" className="mb-6">
                <div className="space-y-4">
                  <h3 className="text-lg sm:text-xl font-bold text-terminal-green-bright text-center tracking-widest">
                    ESTABLISH SECURE CONNECTION
                  </h3>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="p-4 border border-terminal-green/30 rounded bg-terminal-bg/50 text-center hover:border-terminal-green/60 hover:bg-terminal-green/5 transition-all duration-200 group">
                      <Github className="w-7 h-7 text-terminal-green-bright mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">GitHub</h4>
                      <Button variant="outline" size="sm" onClick={() => window.open('https://github.com/Abhiram-ops', '_blank')}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 w-full text-xs mt-1">
                        VIEW REPOS
                      </Button>
                    </div>
                    <div className="p-4 border border-terminal-green/30 rounded bg-terminal-bg/50 text-center hover:border-terminal-green/60 hover:bg-terminal-green/5 transition-all duration-200 group">
                      <Linkedin className="w-7 h-7 text-terminal-green-bright mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">LinkedIn</h4>
                      <Button variant="outline" size="sm"
                        onClick={() => window.open('https://www.linkedin.com/in/abhiram-lanka-1696a5306/', '_blank')}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 w-full text-xs mt-1">
                        CONNECT
                      </Button>
                    </div>
                    <div className="p-4 border border-terminal-green/30 rounded bg-terminal-bg/50 text-center hover:border-terminal-green/60 hover:bg-terminal-green/5 transition-all duration-200 group">
                      <Download className="w-7 h-7 text-terminal-green-bright mx-auto mb-2 group-hover:scale-110 transition-transform" />
                      <h4 className="font-bold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">Resume</h4>
                      <Button variant="outline" size="sm" onClick={handleDownloadResume}
                        className="border-terminal-green text-terminal-green hover:bg-terminal-green/10 w-full text-xs mt-1">
                        DOWNLOAD
                      </Button>
                    </div>
                  </div>
                  <div className="p-3 border border-terminal-green/25 rounded bg-terminal-bg-light text-center">
                    <p className="text-xs text-terminal-green/80 font-mono">
                      📧 <a href="mailto:lankaabhiram16@gmail.com" className="hover:text-terminal-green-bright transition-colors">lankaabhiram16@gmail.com</a>
                      &nbsp;·&nbsp;
                      📞 <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a>
                      &nbsp;·&nbsp;
                      📍 Visakhapatnam, AP
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
              <h1 className="text-4xl font-bold mb-4 text-terminal-green-bright">SELECT A SECTION</h1>
              <p className="text-terminal-green/70">Choose a module from the sidebar.</p>
            </div>
          </section>
        );
    }
  };

  if (!isUnlocked && !isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center">
        <MatrixBackground />
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          <div className="bg-terminal-bg-light border-2 border-terminal-green rounded-lg p-6 md:p-8 shadow-2xl">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 border-2 border-terminal-green rounded-full flex items-center justify-center">
                <Lock className="w-8 h-8 text-terminal-green-bright animate-pulse" />
              </div>
              <h1 className="text-xl md:text-2xl font-bold text-terminal-green-bright mb-2 glitch-text">CLASSIFIED ACCESS</h1>
              <p className="text-terminal-green/70 text-sm mb-2">Security credentials required</p>
            </div>
            <p className="text-terminal-green-bright font-bold text-sm mb-2">UNLOCK TO PROCEED</p>
            <p className="text-xs text-terminal-green/50 mb-6">Click the lock to access ABHIRAM's portfolio</p>
            <Button onClick={handleUnlock} variant="terminal" size="lg" className="w-full animate-terminal-glow">
              <Unlock className="w-5 h-5 mr-2" /> GRANT ACCESS
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center overflow-hidden">
        <MatrixBackground />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <div className="relative mb-8">
            <div className="w-48 h-48 mx-auto relative">
              <div className="absolute inset-0 border-2 border-terminal-green/30 rounded-full animate-spin"></div>
              <div className="absolute inset-4 border border-terminal-green/50 rounded-full animate-spin" style={{animationDirection:'reverse',animationDuration:'3s'}}></div>
              <div className="absolute inset-8 border border-terminal-green/70 rounded-full animate-spin" style={{animationDuration:'2s'}}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Shield className="w-16 h-16 text-terminal-green-bright animate-pulse" />
              </div>
            </div>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-terminal-green-bright glitch-text mb-4">DECRYPTING ACCESS</h2>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-terminal-green-bright">» Authenticating credentials...</p>
            <p className="text-terminal-green">» Establishing secure session...</p>
            <p className="text-terminal-green/70">» Loading portfolio data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showGreeting) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center overflow-hidden">
        <MatrixBackground />
        <div className="relative z-10 max-w-2xl mx-auto px-6 w-full font-mono">
          <p className="text-terminal-green-bright text-sm mb-1 animate-fade-in">» ACCESS GRANTED — CLEARANCE: ADMIN</p>
          <p className="text-terminal-green/60 text-sm mb-7">» WELCOME, OPERATOR. IDENTITY CONFIRMED.</p>

          <h1 className="text-4xl sm:text-5xl font-bold text-terminal-green-bright mb-2 glitch-text tracking-wider">
            ABHIRAM LANKA
          </h1>
          <div className="w-full h-px bg-terminal-green/30 mb-5" />

          <p className="text-sm text-terminal-green/85 leading-relaxed mb-8">
            I'm a final-year B.Tech CSE student at Andhra University, Visakhapatnam, with a dual focus on
            <span className="text-terminal-green-bright font-semibold"> Cybersecurity</span> and
            <span className="text-terminal-green-bright font-semibold"> Business Development</span>.
            Currently driving growth as a Business Development Associate at OpenHire, I've previously worked
            with Caarya and IIT Bhubaneswar — building pipelines, closing deals, and scaling operations.
            On the technical side, I built <span className="text-terminal-green-bright font-semibold">CityBus Live</span> — a hardware-free real-time bus tracking system
            deployed on live Visakhapatnam routes — with a research paper submitted to two international conferences (ASIANCON 2026 &amp; ICST 2026).
            I lead the Cybersecurity chapter at codeIAM Club, hold hands-on experience in penetration testing and OWASP methodologies,
            and build tools that make systems — technical or human — work better.
          </p>

          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-terminal-green/60">LOADING PORTFOLIO</span>
              <span className="text-terminal-green-bright">{greetProgress}%</span>
            </div>
            <div className="w-full h-2 bg-terminal-green/10 rounded-full border border-terminal-green/20 overflow-hidden">
              <div
                className="h-full bg-terminal-green-bright rounded-full"
                style={{ width: `${greetProgress}%`, transition: "width 0.1s linear" }}
              />
            </div>
          </div>
          <p className="text-xs text-terminal-green/40">» INITIALIZING NAVIGATION MODULES...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex w-full bg-terminal-bg">
      {/* Scanline overlay */}
      <div
        className="fixed inset-0 z-50 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)",
        }}
      />
      <div style={{pointerEvents:'none'}}><MatrixBackground /></div>
      <CyberSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={showSidebar}
        onOpenChange={setShowSidebar}
      />
      <main className="flex-1 relative">
        <div className="fixed inset-0 z-5" style={{opacity:0.4, pointerEvents:'none'}}>
          <MatrixBackground />
        </div>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
