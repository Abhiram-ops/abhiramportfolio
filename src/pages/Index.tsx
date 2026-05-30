import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { CyberSidebar } from "@/components/CyberSidebar";
import {
  Github, Download, Mail, Phone, MapPin, Shield, Code, Brain,
  Lock, Unlock, Award, Briefcase, Linkedin, FileText,
  ChevronDown, ChevronUp, ExternalLink, Zap, ArrowRight
} from "lucide-react";

/* ── CountUp sub-component ─────────────────────────────── */
const CountUp = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const inc = Math.ceil(to / 40);
    const timer = setInterval(() => {
      start = Math.min(start + inc, to);
      setCount(start);
      if (start >= to) clearInterval(timer);
    }, 40);
    return () => clearInterval(timer);
  }, [to]);
  return <>{count}</>;
};

/* ── Main component ────────────────────────────────────── */
const Index = () => {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [showSidebar, setShowSidebar] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const [greetProgress, setGreetProgress] = useState(0);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [expandedProject, setExpandedProject] = useState<number | null>(null);
  const [heroSubIdx, setHeroSubIdx] = useState(0);
  const [heroSubTyped, setHeroSubTyped] = useState("");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorBig, setCursorBig] = useState(false);

  const heroSubtitles = [
    "Ethical Hacker. Security Researcher.",
    "Business Development Builder.",
    "Research Author · CityBus Live.",
    "Final Year CSE · Andhra University.",
  ];

  /* cursor tracking */
  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    const over = () => setCursorBig(true);
    const out = () => setCursorBig(false);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a,button").forEach(el => {
      el.addEventListener("mouseenter", over);
      el.addEventListener("mouseleave", out);
    });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* hero reveal on section enter */
  useEffect(() => {
    if (activeSection === "hero") {
      setHeroRevealed(false);
      const t = setTimeout(() => setHeroRevealed(true), 80);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  /* cycling subtitle typewriter */
  useEffect(() => {
    const target = heroSubtitles[heroSubIdx];
    let i = 0;
    setHeroSubTyped("");
    const typeInterval = setInterval(() => {
      if (i <= target.length) { setHeroSubTyped(target.slice(0, i)); i++; }
      else clearInterval(typeInterval);
    }, 55);
    const holdTimeout = setTimeout(() => {
      setHeroSubIdx(prev => (prev + 1) % heroSubtitles.length);
    }, target.length * 55 + 2800);
    return () => { clearInterval(typeInterval); clearTimeout(holdTimeout); };
  }, [heroSubIdx]);

  /* greeting progress */
  useEffect(() => {
    if (!showGreeting) return;
    setGreetProgress(0);
    const start = Date.now();
    const interval = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / 10000) * 100, 100);
      setGreetProgress(Math.round(pct));
      if (pct >= 100) {
        clearInterval(interval);
        setTimeout(() => { setShowGreeting(false); setActiveSection("hero"); setShowSidebar(true); }, 300);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [showGreeting]);

  /* skills animation */
  useEffect(() => {
    if (activeSection === "skills") {
      setSkillsAnimated(false);
      const t = setTimeout(() => setSkillsAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  /* reset expanded project */
  useEffect(() => { setExpandedProject(null); }, [activeSection]);


  /* ── Data ──────────────────────────────────────────────── */
  const allSkillsMarquee = [
    "Python", "Cybersecurity", "OWASP Top 10", "Penetration Testing",
    "Kali Linux", "Wireshark", "Nmap", "Maltego", "Flask",
    "JavaScript", "React", "Node.js", "SQL", "PostgreSQL", "MongoDB",
    "B2B Sales", "Lead Generation", "CRM", "Client Acquisition",
    "WebSocket", "Azure", "Git", "Bash", "Cloudflare WAF",
  ];

  const skillLevels = [
    { name: "Cybersecurity & Pen Testing", level: 88, color: "#00ffff" },
    { name: "Python", level: 85, color: "#00ffff" },
    { name: "Web App Security (OWASP)", level: 84, color: "#f87171" },
    { name: "Network Security & OSINT", level: 82, color: "#00ffff" },
    { name: "B2B Sales & Lead Generation", level: 90, color: "#facc15" },
    { name: "Client Acquisition / CRM", level: 85, color: "#facc15" },
    { name: "JavaScript / React", level: 74, color: "#60a5fa" },
    { name: "SQL & Databases", level: 78, color: "#60a5fa" },
  ];

  const keySkills = ["Python", "Java", "Cybersecurity", "Penetration Testing", "OWASP", "Kali Linux", "JavaScript", "SQL", "Node.js"];
  const tools = ["Wireshark", "Nmap", "Maltego", "MySQL", "PostgreSQL", "MongoDB", "Git", "Bash Scripting", "Cloudflare WAF"];
  const additionalSkills = ["Vulnerability Assessment", "Network Security", "Unit Testing", "HTML/CSS", "SQLite", "React", "Flask"];
  const bdSkills = ["Lead Generation", "Client Acquisition", "B2B Sales", "CRM Management", "Market Research", "Partnership Development", "EdTech Sales", "SaaS Operations", "Talent Acquisition", "Business Analytics", "Cold Outreach", "Startup Ecosystem"];

  const experiences = [
    { company: "OpenHire", position: "Business Development Associate (Internship)", period: "Feb 2026 - Present", highlight: "Managing high-impact client acquisition and partnership growth. Building high-performance sales & ops engines for EdTech & SaaS clients.", tag: "ACTIVE" },
    { company: "codeiam.club, Andhra University", position: "Community Relations Lead", period: "Apr 2025 - Present", highlight: "Spearheading inter-club collaboration initiatives and fostering community engagement within codeiam.club.", tag: "ACTIVE" },
    { company: "Caarya", position: "Business Development Manager (Internship)", period: "Jan 2025 - Dec 2025", highlight: "Drove strategic partnerships connecting startups with top talent. Achieved 35% conversion rate & 50% increase in startup onboarding.", tag: "COMPLETED" },
    { company: "codeiam.club, Andhra University", position: "Cybersecurity Chapter Lead", period: "Apr 2024 - Mar 2025", highlight: "Led the Cybersecurity chapter, organised student summits and collaborated on the Codeiam Spark Nation Hackathon.", tag: "COMPLETED" },
    { company: "IIT Bhubaneswar", position: "Software Testing Intern", period: "May 2024 - July 2024", highlight: "Evaluated and validated academic software systems; designed test cases and supported automation documentation.", tag: "COMPLETED" },
    { company: "Techno Hacks", position: "Cybersecurity Intern", period: "July 2024 - Aug 2024", highlight: "Performed network sniffing (Wireshark), scanning (Nmap), and OSINT gathering (Maltego).", tag: "COMPLETED" },
  ];

  const featuredProjects = [
    {
      title: "CityBus Live: Real-Time Urban Bus Tracking",
      description: "Most city bus routes in India have no live tracking, not because the tech doesn't exist, but because dedicated GPS hardware costs 15,000 per vehicle. CityBus Live eliminates this by repurposing the driver's own smartphone as the tracker, delivering real-time ETAs to commuters via a PWA at zero hardware cost. Deployed live on 4 Visakhapatnam routes.",
      impact: "CRITICAL", featured: true,
      tech: "Flask-SocketIO · WebSocket · Azure App Service · PostgreSQL · Leaflet.js · HTML5 GPS · PWA",
      tag: "Research Paper",
      metrics: ["287ms avg latency", "500+ concurrent users", "4 live routes", "99.8% traffic reduction vs HTTP polling"],
    },
    {
      title: "Cybersweep",
      description: "A Python-powered recon toolkit that automates the early stages of a pentest: scans ports, fingerprints services, and assembles a structured threat report in a single run.",
      impact: "CRITICAL",
      tech: "Python · Nmap · Security Analytics · Automation",
      github: "https://github.com/Abhiram-ops/Cybersweep",
      metrics: ["Automated recon pipeline", "Multi-vector scanning", "Structured threat reports"],
    },
    {
      title: "Web Application Vulnerability Scanner",
      description: "Systematically checks for the most common web vulnerabilities across the OWASP Top 10, then generates a detailed remediation report — no manual probing needed.",
      impact: "HIGH",
      tech: "Python · Requests · BeautifulSoup · OWASP Top 10",
      metrics: ["OWASP Top 10 coverage", "SQLi / XSS / CSRF detection", "Auto-remediation reports"],
    },
    {
      title: "LeadFinder: Smart Lead Scraping Tool",
      description: "A sales automation tool packaged as a standalone .exe that scrapes job boards and company pages to extract validated leads, built to cut manual prospecting time to near zero.",
      impact: "HIGH",
      tech: "Python · SerpAPI · Web Scraping · Automation",
      metrics: ["Standalone .exe", "Multi-source scraping", "Validated contact extraction"],
    },
    {
      title: "E-Attendance using QR & OTP",
      description: "Built to close the proxy attendance loophole: students must scan a time-limited QR code and verify a one-time PIN before attendance is logged, making impersonation practically impossible.",
      impact: "MEDIUM",
      tech: "Flask · MySQL · QR Code · OTP · Python",
      metrics: ["Time-limited QR codes", "OTP dual-factor", "Zero proxy loophole"],
    },
  ];

  const certifications = [
    { name: "Google Cybersecurity Certificate", issuer: "Google · Coursera", year: "In Progress", status: "ACTIVE" },
    { name: "REMAC+", issuer: "Udemy", year: "2026", status: "COMPLETED" },
    { name: "Business Ethics", issuer: "NPTEL · IIT", year: "2026", status: "COMPLETED" },
  ];

  const researchPapers = [
    { title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework Using Browser-Based GPS and WebSocket Communication", venue: "ASIANCON 2026", full: "Asia Conference on Innovation in Emerging Technologies", id: "Paper ID: 1595", status: "UNDER REVIEW" },
    { title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework Using Browser-Based GPS and WebSocket Communication", venue: "ICST 2026", full: "International Conference on Intelligent Computing & Sustainable Technologies", id: "Paper ID: 232", status: "UNDER REVIEW" },
  ];

  /* ── Helpers ────────────────────────────────────────────── */
  const handleDownloadResume = () => {
    const a = document.createElement("a");
    a.href = "/abhiramportfolio/Abhiram_Lanka_Resume.docx";
    a.download = "Abhiram_Lanka_Resume.docx";
    a.click();
  };
  const handleUnlock = () => {
    setIsAnimating(true);
    setTimeout(() => { setIsUnlocked(true); setIsAnimating(false); setShowGreeting(true); }, 2000);
  };

  const sections = ["hero", "skills", "experience", "projects", "assessment", "contact"];
  const handleSectionChange = (section: string) => { setActiveSection(section); setShowSidebar(false); };
  const handleNextSection = () => {
    const idx = sections.indexOf(activeSection);
    if (idx < sections.length - 1) setActiveSection(sections[idx + 1]);
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) setTimeout(handleNextSection, 800);
  };

  const tagColor = (tag: string) => tag === "ACTIVE"
    ? "text-terminal-green-bright bg-terminal-green/10 border-terminal-green-bright"
    : "text-terminal-green/50 bg-transparent border-terminal-green/20";
  const impactColor = (impact: string) => {
    if (impact === "CRITICAL") return "text-red-400 border-red-400/40 bg-red-400/10";
    if (impact === "HIGH") return "text-yellow-400 border-yellow-400/40 bg-yellow-400/10";
    return "text-terminal-green/60 border-terminal-green/20 bg-transparent";
  };

  const R = (style: string) => `reveal-item ${style}`;


  /* ── Hero section ──────────────────────────────────────── */
  const renderHero = () => (
    <section className="min-h-screen flex flex-col justify-center px-6 sm:px-12 lg:px-16 relative z-10 overflow-hidden" onScroll={handleScroll}>

      {/* Status badge */}
      <div className={heroRevealed ? R("") : "opacity-0"} style={{ animationDelay: "0.05s" }}>
        <div className="flex items-center gap-2 mb-6 sm:mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-terminal-green-bright opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-terminal-green-bright" />
          </span>
          <span className="text-xs font-mono text-terminal-green/50 tracking-[0.3em] uppercase">System Online · Clearance: Admin</span>
        </div>
      </div>

      {/* MEGA headline */}
      <div className="mb-4 sm:mb-6 overflow-hidden">
        <h1
          className={`font-display leading-none tracking-wide glitch-text ${heroRevealed ? R("") : "opacity-0"}`}
          data-text="ABHIRAM"
          style={{ fontSize: "clamp(4rem, 14vw, 15rem)", animationDelay: "0.15s", textShadow: "0 0 40px hsl(180 100% 50% / 0.5), 0 0 80px hsl(180 100% 50% / 0.25)" }}
        >
          ABHIRAM
        </h1>
        <h1
          className={`font-display leading-none tracking-wide ${heroRevealed ? R("") : "opacity-0"}`}
          style={{ fontSize: "clamp(4rem, 14vw, 15rem)", animationDelay: "0.25s", color: "hsl(180 100% 50% / 0.18)", WebkitTextStroke: "1px hsl(180 100% 50% / 0.3)" }}
        >
          LANKA
        </h1>
      </div>

      {/* Divider */}
      <div className={`w-full h-px bg-terminal-green/25 mb-5 relative overflow-hidden ${heroRevealed ? R("") : "opacity-0"}`} style={{ animationDelay: "0.35s" }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-terminal-green-bright" />
        <div className="absolute inset-0 bg-gradient-to-r from-terminal-green/0 via-terminal-green/50 to-terminal-green/0 animate-[glow-pulse_3s_ease-in-out_infinite]" style={{ height: "1px" }} />
      </div>

      {/* Cycling subtitle */}
      <div className={`h-7 mb-8 ${heroRevealed ? R("") : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
        <p className="text-sm sm:text-base font-mono text-terminal-green/60 tracking-[0.2em] uppercase">
          {heroSubTyped}<span className="animate-blink">_</span>
        </p>
      </div>

      {/* Stats row */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-10 max-w-2xl ${heroRevealed ? R("") : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
        {[
          { to: 2, label: "Research Papers", suffix: "" },
          { to: 4, label: "Internship Roles", suffix: "+" },
          { to: 500, label: "Concurrent Users", suffix: "+" },
          { to: 2026, label: "Graduating", suffix: "" },
        ].map((s, i) => (
          <div key={i} className="group">
            <div className="font-display text-4xl sm:text-6xl leading-none text-terminal-green-bright group-hover:animate-[glow-pulse_1s_ease-in-out_infinite] transition-all">
              {heroRevealed ? <CountUp to={s.to} /> : 0}{s.suffix}
            </div>
            <div className="text-xs font-mono text-terminal-green/40 mt-1 uppercase tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTA buttons */}
      <div className={`flex flex-wrap gap-3 mb-10 ${heroRevealed ? R("") : "opacity-0"}`} style={{ animationDelay: "0.65s" }}>
        <button onClick={() => window.open("https://github.com/Abhiram-ops", "_blank")}
          className="flex items-center gap-2 px-5 py-2.5 border border-terminal-green text-terminal-green-bright text-sm font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_16px_hsl(180_100%_50%/0.3)] transition-all duration-200">
          <Github className="w-4 h-4" /> GITHUB <ArrowRight className="w-3 h-3" />
        </button>
        <button onClick={() => window.open("https://www.linkedin.com/in/abhiram-lanka-1696a5306/", "_blank")}
          className="flex items-center gap-2 px-5 py-2.5 border border-terminal-green/40 text-terminal-green/80 text-sm font-mono hover:border-terminal-green hover:text-terminal-green-bright transition-all duration-200">
          <Linkedin className="w-4 h-4" /> LINKEDIN
        </button>
        <button onClick={handleDownloadResume}
          className="flex items-center gap-2 px-5 py-2.5 border border-terminal-green/40 text-terminal-green/80 text-sm font-mono hover:border-terminal-green hover:text-terminal-green-bright transition-all duration-200">
          <Download className="w-4 h-4" /> RESUME
        </button>
        <div className="flex items-center gap-2 text-xs font-mono text-terminal-green/40 self-center">
          <MapPin className="w-3 h-3" /> Visakhapatnam, AP
        </div>
      </div>

      {/* Skill marquee strip */}
      <div className={`border-t border-b border-terminal-green/15 py-2.5 overflow-hidden -mx-6 sm:-mx-12 lg:-mx-16 px-0 ${heroRevealed ? R("") : "opacity-0"}`} style={{ animationDelay: "0.8s" }}>
        <div className="marquee-track gap-0">
          {[...allSkillsMarquee, ...allSkillsMarquee].map((s, i) => (
            <span key={i} className="flex items-center gap-0 text-xs font-mono text-terminal-green/50 uppercase tracking-[0.2em] px-4 whitespace-nowrap">
              {s} <span className="text-terminal-green/20 ml-4">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="h-24" />
    </section>
  );


  /* ── Skills section ────────────────────────────────────── */
  const renderSkills = () => (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
      <div className="max-w-5xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="SKILL_MATRIX.SYS" className="mb-6">

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-5">
              <Zap className="w-4 h-4 text-terminal-green-bright" />
              <h3 className="text-xs font-mono font-bold text-terminal-green-bright uppercase tracking-[0.3em]">Proficiency Index</h3>
            </div>
            <div className="space-y-4">
              {skillLevels.map((skill, i) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-xs font-body text-terminal-green/75">{skill.name}</span>
                    <span className="text-xs font-mono font-bold tabular-nums" style={{ color: skill.color }}>
                      {skillsAnimated ? `${skill.level}%` : "0%"}
                    </span>
                  </div>
                  <div className="relative h-1.5 bg-terminal-green/8 rounded-full overflow-hidden" style={{ background: "hsl(180 100% 50% / 0.06)" }}>
                    <div
                      className="absolute left-0 top-0 h-full rounded-full transition-all ease-out"
                      style={{
                        width: skillsAnimated ? `${skill.level}%` : "0%",
                        backgroundColor: skill.color,
                        boxShadow: skillsAnimated ? `0 0 12px ${skill.color}60` : "none",
                        transitionDuration: "1400ms",
                        transitionDelay: `${i * 90}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t border-terminal-green/15 pt-6 grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-xs font-mono font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                <Shield className="w-4 h-4" /> Security Arsenal
              </h3>
              <div className="flex flex-wrap gap-2">{keySkills.map(s => <SkillTag key={s} skill={s} />)}</div>
            </div>
            <div>
              <h3 className="text-xs font-mono font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
                <Code className="w-4 h-4" /> Tools & Stack
              </h3>
              <div className="flex flex-wrap gap-2">{tools.map(s => <SkillTag key={s} skill={s} />)}</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-xs font-mono font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
              <Briefcase className="w-4 h-4" /> Business Development
            </h3>
            <div className="flex flex-wrap gap-2">
              {bdSkills.map(s => (
                <span key={s} className="px-2 py-1 text-xs border border-yellow-400/30 text-yellow-400/80 rounded font-mono hover:border-yellow-400/60 hover:bg-yellow-400/5 transition-all duration-200 cursor-default">{s}</span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-mono font-bold mb-3 text-terminal-green-bright flex items-center gap-2 uppercase tracking-widest">
              <Brain className="w-4 h-4" /> Additional
            </h3>
            <div className="flex flex-wrap gap-2">{additionalSkills.map(s => <SkillTag key={s} skill={s} />)}</div>
          </div>
        </TerminalWindow>
        <div className="h-24" />
      </div>
    </section>
  );

  /* ── Experience section — timeline layout ──────────────── */
  const renderExperience = () => (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
      <div className="max-w-3xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="MISSION_LOG.EXP" className="mb-6">
          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-terminal-green/15" />

            <div className="space-y-5">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-8 group">
                  {/* Timeline dot */}
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
                    ${exp.tag === "ACTIVE"
                      ? "border-terminal-green-bright bg-terminal-green/20 timeline-dot-active"
                      : "border-terminal-green/40 bg-terminal-bg group-hover:border-terminal-green-bright"
                    }`}
                  />

                  <div className={`border rounded-lg p-3 sm:p-4 transition-all duration-200
                    ${exp.tag === "ACTIVE"
                      ? "border-terminal-green/40 bg-terminal-green/3"
                      : "border-terminal-green/15 hover:border-terminal-green/35"
                    }`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-body font-semibold text-terminal-green-bright text-sm sm:text-base">{exp.company}</h3>
                          <span className={`text-xs border px-2 py-0.5 rounded font-mono ${tagColor(exp.tag)}`}>{exp.tag}</span>
                        </div>
                        <p className="text-xs sm:text-sm text-terminal-green/65 font-mono">{exp.position}</p>
                      </div>
                      <p className="text-xs text-terminal-green/40 font-mono whitespace-nowrap">{exp.period}</p>
                    </div>
                    <p className="text-xs text-terminal-green/75 mt-1.5 leading-relaxed font-body">{exp.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs text-terminal-green/30 text-center mt-5 font-mono">+ Full impact metrics in resume</p>
        </TerminalWindow>
        <div className="h-24" />
      </div>
    </section>
  );


  /* ── Projects section — featured + grid ───────────────── */
  const renderProjects = () => {
    const [featured, ...rest] = featuredProjects;
    return (
      <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
        <div className="max-w-5xl mx-auto w-full animate-fade-in">
          <TerminalWindow title="EXPLOIT_VAULT.DIR" className="mb-6">
            <p className="text-xs font-mono text-terminal-green/35 mb-5">» CLICK ANY PROJECT TO EXPAND DETAILS</p>

            {/* Featured project — full width */}
            <div
              className={`relative border rounded-lg p-4 sm:p-6 mb-4 cursor-pointer overflow-hidden transition-all duration-300
                ${expandedProject === 0
                  ? "border-terminal-green/70 bg-terminal-green/5 shadow-[0_0_30px_hsl(180_100%_50%/0.08)]"
                  : "border-terminal-green/35 hover:border-terminal-green/60 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.06)]"
                }`}
              onClick={() => setExpandedProject(expandedProject === 0 ? null : 0)}
            >
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-terminal-green/4 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-start justify-between gap-3 mb-3 flex-wrap">
                <div>
                  <span className="text-xs font-mono text-terminal-green/40 uppercase tracking-widest mb-1 block">Featured Project</span>
                  <h3 className={`font-display text-xl sm:text-3xl tracking-wide transition-colors ${expandedProject === 0 ? "text-white" : "text-terminal-green-bright"}`}>
                    {featured.title.split(":")[0]}
                  </h3>
                  {featured.title.includes(":") && (
                    <p className="text-sm font-body text-terminal-green/60">{featured.title.split(":")[1].trim()}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs border px-2 py-1 rounded font-mono ${impactColor(featured.impact)}`}>{featured.impact}</span>
                  <span className="text-xs border border-yellow-400/40 text-yellow-400/80 px-2 py-1 rounded font-mono">{featured.tag}</span>
                  {expandedProject === 0 ? <ChevronUp className="w-4 h-4 text-terminal-green/50" /> : <ChevronDown className="w-4 h-4 text-terminal-green/35" />}
                </div>
              </div>

              <p className="text-xs font-mono text-terminal-green/40 mb-3">{featured.tech}</p>

              {/* Metrics always visible on featured */}
              <div className="flex flex-wrap gap-2 mb-2">
                {featured.metrics?.map((m, mi) => (
                  <span key={mi} className="text-xs px-2.5 py-1 border border-terminal-green/25 rounded-full font-mono text-terminal-green/60 bg-terminal-green/5">
                    ✓ {m}
                  </span>
                ))}
              </div>

              {expandedProject !== 0 && (
                <p className="text-xs font-mono text-terminal-green/25 mt-2">[ CLICK TO EXPAND ]</p>
              )}

              {expandedProject === 0 && (
                <div className="mt-4 pt-4 border-t border-terminal-green/15 animate-fade-in">
                  <p className="text-xs font-mono text-terminal-green/35 mb-2">» PROJECT_DETAILS.LOG</p>
                  <p className="text-sm font-body text-terminal-green/85 leading-relaxed">{featured.description}</p>
                </div>
              )}
            </div>

            {/* Other projects — 2-column grid */}
            <div className="grid sm:grid-cols-2 gap-3">
              {rest.map((p, i) => {
                const idx = i + 1;
                const isExp = expandedProject === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300
                      ${isExp ? "border-terminal-green/60 bg-terminal-green/5" : "border-terminal-green/20 hover:border-terminal-green/45"}`}
                    onClick={() => setExpandedProject(isExp ? null : idx)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className={`text-sm font-body font-semibold transition-colors ${isExp ? "text-white" : "text-terminal-green-bright"}`}>{p.title}</h3>
                        {p.github && (
                          <button onClick={e => { e.stopPropagation(); window.open(p.github, "_blank"); }}
                            className="text-terminal-green/50 hover:text-terminal-green-bright transition-colors">
                            <Github className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-xs border px-1.5 py-0.5 rounded font-mono ${impactColor(p.impact)}`}>{p.impact}</span>
                        {isExp ? <ChevronUp className="w-3.5 h-3.5 text-terminal-green/50" /> : <ChevronDown className="w-3.5 h-3.5 text-terminal-green/30" />}
                      </div>
                    </div>
                    <p className="text-xs font-mono text-terminal-green/40 mb-2">{p.tech}</p>
                    {!isExp && <p className="text-xs font-mono text-terminal-green/25">[ CLICK TO EXPAND ]</p>}
                    {isExp && (
                      <div className="mt-3 pt-3 border-t border-terminal-green/15 animate-fade-in">
                        <p className="text-xs sm:text-sm font-body text-terminal-green/85 leading-relaxed mb-3">{p.description}</p>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {p.metrics?.map((m, mi) => (
                            <span key={mi} className="text-xs px-2 py-0.5 border border-terminal-green/25 rounded font-mono text-terminal-green/55">✓ {m}</span>
                          ))}
                        </div>
                        {p.github && (
                          <button onClick={e => { e.stopPropagation(); window.open(p.github, "_blank"); }}
                            className="flex items-center gap-1 text-xs font-mono text-terminal-green-bright hover:underline">
                            <ExternalLink className="w-3 h-3" /> VIEW SOURCE CODE
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <p className="text-xs font-mono text-terminal-green/30 text-center mt-5">+ More on GitHub</p>
          </TerminalWindow>
          <div className="h-24" />
        </div>
      </section>
    );
  };


  /* ── Assessment & Contact sections ────────────────────── */
  const renderAssessment = () => (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
      <div className="max-w-4xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="THREAT_ASSESSMENT.FINAL" className="mb-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-mono font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                <Award className="w-4 h-4" /> Certifications
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {certifications.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 border border-terminal-green/20 rounded-lg bg-terminal-bg/50 hover:border-terminal-green/40 hover:bg-terminal-green/3 transition-all duration-200">
                    <Shield className={`w-5 h-5 shrink-0 ${c.status === "ACTIVE" ? "text-yellow-400" : "text-terminal-green-bright"}`} />
                    <div>
                      <p className="text-xs sm:text-sm font-body font-semibold text-terminal-green-bright">{c.name}</p>
                      <p className="text-xs text-terminal-green/45 font-mono">
                        {c.issuer} · {c.status === "ACTIVE" ? <span className="text-yellow-400 font-bold">IN PROGRESS</span> : c.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" /> Research Publications
              </h3>
              <div className="space-y-2">
                {researchPapers.map((pub, i) => (
                  <div key={i} className="p-3 sm:p-4 border border-terminal-green/20 rounded-lg bg-terminal-bg/50 hover:border-terminal-green/40 transition-colors">
                    <div className="flex items-start justify-between gap-2 flex-wrap mb-1.5">
                      <p className="text-xs sm:text-sm font-body font-semibold text-terminal-green-bright flex-1 leading-snug">{pub.title}</p>
                      <span className="text-xs border border-yellow-400/40 text-yellow-400/80 px-2 py-0.5 rounded font-mono shrink-0">{pub.status}</span>
                    </div>
                    <p className="text-xs text-terminal-green/60 font-mono">{pub.venue} · {pub.full}</p>
                    <p className="text-xs text-terminal-green/35 font-mono mt-0.5">{pub.id} · First Author: Abhiram Lanka</p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xs font-mono font-bold text-terminal-green-bright uppercase tracking-widest mb-3 flex items-center gap-2">
                <Brain className="w-4 h-4" /> Leadership & Recognition
              </h3>
              <div className="grid sm:grid-cols-2 gap-2">
                {[
                  "Cybersecurity Chapter Lead, codeIAM Club",
                  "Organising Committee, Codeiam Spark Nation Hackathon",
                  "Attendee, BSides Vizag 2025 Cybersecurity Conference",
                  "1st Prize, ABVP Event (Andhra University, 2024)",
                ].map((a, i) => (
                  <div key={i} className="flex items-start gap-2 p-2.5 border border-terminal-green/12 rounded-lg hover:border-terminal-green/28 transition-colors">
                    <span className="text-terminal-green-bright mt-0.5 shrink-0">»</span>
                    <span className="text-xs font-body text-terminal-green/75">{a}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              <div className="p-3 border border-terminal-green/25 rounded-lg hover:border-terminal-green/45 transition-colors">
                <h4 className="font-body font-semibold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">Security First</h4>
                <p className="text-xs font-body text-terminal-green/65">Hands-on experience with penetration testing, vulnerability assessment, and OWASP methodologies.</p>
              </div>
              <div className="p-3 border border-terminal-green/25 rounded-lg hover:border-terminal-green/45 transition-colors">
                <h4 className="font-body font-semibold text-terminal-green-bright mb-1 text-xs uppercase tracking-wider">Proven Results</h4>
                <p className="text-xs font-body text-terminal-green/65">35% conversion rates, 50% onboarding uplift, and recognition across cybersecurity & BD domains.</p>
              </div>
            </div>

            <div className="bg-terminal-bg-light p-4 sm:p-5 rounded-lg border border-terminal-green text-center">
              <p className="text-sm font-body text-terminal-green-bright mb-3 font-semibold">Ready to contribute?</p>
              <button onClick={handleDownloadResume}
                className="inline-flex items-center gap-2 px-6 py-3 border border-terminal-green text-terminal-green-bright text-sm font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] transition-all duration-200 animate-[terminal-glow_2s_ease-in-out_infinite]">
                <Download className="w-4 h-4" /> DOWNLOAD FULL RESUME
              </button>
            </div>
          </div>
        </TerminalWindow>
        <div className="h-24" />
      </div>
    </section>
  );

  const renderContact = () => (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-8 overflow-y-auto relative z-10" onScroll={handleScroll}>
      <div className="max-w-3xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="SECURE_CHANNEL.COMM" className="mb-6">
          <div className="space-y-5">
            <h3 className="font-display text-2xl sm:text-4xl text-terminal-green-bright tracking-widest text-center">
              ESTABLISH CONNECTION
            </h3>
            <div className="grid sm:grid-cols-3 gap-3">
              {[
                { icon: Github, label: "GitHub", action: () => window.open("https://github.com/Abhiram-ops", "_blank"), cta: "VIEW REPOS" },
                { icon: Linkedin, label: "LinkedIn", action: () => window.open("https://www.linkedin.com/in/abhiram-lanka-1696a5306/", "_blank"), cta: "CONNECT" },
                { icon: Download, label: "Resume", action: handleDownloadResume, cta: "DOWNLOAD" },
              ].map((item, i) => (
                <div key={i} className="p-5 border border-terminal-green/25 rounded-lg text-center hover:border-terminal-green/60 hover:bg-terminal-green/4 transition-all duration-200 group">
                  <item.icon className="w-7 h-7 text-terminal-green-bright mx-auto mb-3 group-hover:scale-110 transition-transform" />
                  <h4 className="font-body font-semibold text-terminal-green-bright mb-2 text-xs uppercase tracking-wider">{item.label}</h4>
                  <button onClick={item.action}
                    className="text-xs font-mono text-terminal-green/70 border border-terminal-green/30 px-3 py-1.5 hover:border-terminal-green hover:text-terminal-green-bright transition-all duration-200 w-full">
                    {item.cta}
                  </button>
                </div>
              ))}
            </div>
            <div className="p-3 border border-terminal-green/20 rounded-lg text-center">
              <p className="text-xs font-mono text-terminal-green/65">
                <a href="mailto:lankaabhiram16@gmail.com" className="hover:text-terminal-green-bright transition-colors">lankaabhiram16@gmail.com</a>
                <span className="text-terminal-green/25 mx-3">·</span>
                <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a>
                <span className="text-terminal-green/25 mx-3">·</span>
                Visakhapatnam, AP
              </p>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );

  /* ── renderActiveSection router ─────────────────────────── */
  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero":       return renderHero();
      case "skills":     return renderSkills();
      case "experience": return renderExperience();
      case "projects":   return renderProjects();
      case "assessment": return renderAssessment();
      case "contact":    return renderContact();
      default:           return renderHero();
    }
  };


  /* ── Lock / Animating / Greeting screens ──────────────── */
  if (!isUnlocked && !isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center">
        <div className="cyber-cursor" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 16 : 10, height: cursorBig ? 16 : 10 }} />
        <MatrixBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 text-center max-w-md mx-auto px-4">
          <div className="bg-terminal-bg-light border-2 border-terminal-green rounded-lg p-6 md:p-8 shadow-[0_0_40px_hsl(180_100%_50%/0.2)]">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto mb-4 border-2 border-terminal-green rounded-full flex items-center justify-center shadow-[0_0_20px_hsl(180_100%_50%/0.3)]">
                <Lock className="w-8 h-8 text-terminal-green-bright animate-pulse" />
              </div>
              <h1 className="font-display text-3xl text-terminal-green-bright mb-2">CLASSIFIED ACCESS</h1>
              <p className="text-terminal-green/60 text-sm font-mono">Security credentials required</p>
            </div>
            <p className="text-xs font-mono text-terminal-green/40 mb-6">Click the lock to access ABHIRAM's portfolio</p>
            <button onClick={handleUnlock}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-terminal-green text-terminal-green-bright font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] transition-all duration-200 animate-[terminal-glow_2s_ease-in-out_infinite]">
              <Unlock className="w-5 h-5" /> GRANT ACCESS
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnimating) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center overflow-hidden">
        <MatrixBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <div className="w-48 h-48 mx-auto relative mb-8">
            <div className="absolute inset-0 border-2 border-terminal-green/30 rounded-full animate-spin" />
            <div className="absolute inset-4 border border-terminal-green/50 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "3s" }} />
            <div className="absolute inset-8 border border-terminal-green/70 rounded-full animate-spin" style={{ animationDuration: "2s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-16 h-16 text-terminal-green-bright animate-pulse" />
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-terminal-green-bright mb-6">DECRYPTING ACCESS</h2>
          <div className="space-y-2 font-mono text-sm">
            <p className="text-terminal-green-bright">» Authenticating credentials...</p>
            <p className="text-terminal-green/80">» Establishing secure session...</p>
            <p className="text-terminal-green/50">» Loading portfolio data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showGreeting) {
    return (
      <div className="min-h-screen bg-terminal-bg text-terminal-green relative flex items-center justify-center overflow-hidden">
        <MatrixBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 max-w-2xl mx-auto px-6 w-full font-mono">
          <p className="text-terminal-green-bright text-sm mb-1 reveal-item" style={{ animationDelay: "0.1s" }}>» ACCESS GRANTED | CLEARANCE: ADMIN</p>
          <p className="text-terminal-green/50 text-sm mb-8 reveal-item" style={{ animationDelay: "0.3s" }}>» WELCOME, OPERATOR. IDENTITY CONFIRMED.</p>
          <h1 className="font-display text-5xl sm:text-7xl text-terminal-green-bright mb-3 reveal-item" style={{ animationDelay: "0.5s", textShadow: "0 0 40px hsl(180 100% 50% / 0.4)" }}>
            ABHIRAM LANKA
          </h1>
          <div className="w-full h-px bg-terminal-green/25 mb-6 reveal-item" style={{ animationDelay: "0.65s" }} />
          <p className="text-sm text-terminal-green/80 leading-relaxed mb-8 font-body reveal-item" style={{ animationDelay: "0.75s" }}>
            I'm a final-year B.Tech CSE student at Andhra University, Visakhapatnam, with a dual focus on
            <span className="text-terminal-green-bright font-semibold"> Cybersecurity</span> and
            <span className="text-terminal-green-bright font-semibold"> Business Development</span>.
            Currently driving growth as a Business Development Associate at OpenHire, I've previously worked
            with Caarya and IIT Bhubaneswar, building pipelines, closing deals, and scaling operations.
            On the technical side, I built <span className="text-terminal-green-bright font-semibold">CityBus Live</span>, a hardware-free real-time bus tracking system
            deployed on live Visakhapatnam routes, with a research paper submitted to two international conferences (ASIANCON 2026 & ICST 2026).
            I lead the Cybersecurity chapter at codeIAM Club, and build tools that make systems (technical or human) work better.
          </p>
          <div className="reveal-item" style={{ animationDelay: "0.9s" }}>
            <div className="flex justify-between text-xs font-mono mb-2">
              <span className="text-terminal-green/45">LOADING PORTFOLIO</span>
              <span className="text-terminal-green-bright">{greetProgress}%</span>
            </div>
            <div className="w-full h-1.5 bg-terminal-green/8 rounded-full overflow-hidden" style={{ background: "hsl(180 100% 50% / 0.06)" }}>
              <div className="h-full bg-terminal-green-bright rounded-full transition-all duration-100 ease-linear" style={{ width: `${greetProgress}%`, boxShadow: "0 0 10px hsl(180 100% 50% / 0.6)" }} />
            </div>
          </div>
          <p className="text-xs font-mono text-terminal-green/30 mt-3 reveal-item" style={{ animationDelay: "1s" }}>» INITIALIZING NAVIGATION MODULES...</p>
        </div>
      </div>
    );
  }

  /* ── Main portfolio render ──────────────────────────────── */
  return (
    <div className="min-h-screen flex w-full bg-terminal-bg">
      {/* Custom cursor */}
      <div className="cyber-cursor" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 18 : 10, height: cursorBig ? 18 : 10 }} />
      <div className="cyber-cursor-ring" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 48 : 32, height: cursorBig ? 48 : 32 }} />

      {/* Overlays */}
      <div className="grain-overlay" />
      <div className="scanlines" />
      <div style={{ pointerEvents: "none" }}><MatrixBackground /></div>

      <CyberSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={showSidebar}
        onOpenChange={setShowSidebar}
      />
      <main className="flex-1 relative">
        <div className="fixed inset-0 z-5" style={{ opacity: 0.35, pointerEvents: "none" }}>
          <MatrixBackground />
        </div>
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
