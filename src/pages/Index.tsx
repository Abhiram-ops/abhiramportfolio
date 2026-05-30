import { useEffect, useState } from "react";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { CyberSidebar } from "@/components/CyberSidebar";
import { FuturisticBackground } from "@/components/FuturisticBackground";
import {
  Github, Download, Mail, Phone, MapPin, Shield, Code, Brain,
  Lock, Unlock, Award, Briefcase, Linkedin, FileText,
  ChevronDown, ChevronUp, ExternalLink, Zap, ArrowRight,
  Menu, Terminal, Target
} from "lucide-react";

/* ── CountUp ───────────────────────────────────────────── */
const CountUp = ({ to }: { to: number }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let cur = 0;
    const inc = Math.ceil(to / 40);
    const t = setInterval(() => {
      cur = Math.min(cur + inc, to);
      setCount(cur);
      if (cur >= to) clearInterval(t);
    }, 40);
    return () => clearInterval(t);
  }, [to]);
  return <>{count}</>;
};

/* ── SectionLabel (Attendly-inspired, terminal-styled) ── */
const SectionLabel = ({ num, title }: { num: string; title: string }) => (
  <div className="flex items-center gap-2 mb-6 sm:mb-8">
    <span className="text-terminal-green/35 font-mono text-xs tracking-widest">[</span>
    <span className="text-terminal-green/50 font-mono text-xs tracking-widest">{num}</span>
    <span className="text-terminal-green/35 font-mono text-xs">—</span>
    <span className="text-terminal-green-bright font-mono text-xs tracking-[0.25em] font-bold">{title}</span>
    <span className="text-terminal-green/35 font-mono text-xs">]</span>
    <div className="flex-1 h-px bg-terminal-green/12 ml-1" />
  </div>
);

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
  const [expandedCap, setExpandedCap] = useState<number | null>(null);
  const [heroSubIdx, setHeroSubIdx] = useState(0);
  const [heroSubTyped, setHeroSubTyped] = useState("");
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const [cursorBig, setCursorBig] = useState(false);

  const heroSubtitles = [
    "Ethical Hacker. Security Researcher.",
    "Business Development Builder.",
    "Research Author. CityBus Live.",
    "Final Year CSE. Andhra University.",
  ];

  useEffect(() => {
    const move = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    if (activeSection === "hero") {
      setHeroRevealed(false);
      const t = setTimeout(() => setHeroRevealed(true), 80);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  useEffect(() => {
    const target = heroSubtitles[heroSubIdx];
    let i = 0; setHeroSubTyped("");
    const ti = setInterval(() => {
      if (i <= target.length) { setHeroSubTyped(target.slice(0, i)); i++; }
      else clearInterval(ti);
    }, 55);
    const ht = setTimeout(() => setHeroSubIdx(p => (p + 1) % heroSubtitles.length), target.length * 55 + 2800);
    return () => { clearInterval(ti); clearTimeout(ht); };
  }, [heroSubIdx]);

  useEffect(() => {
    if (!showGreeting) return;
    setGreetProgress(0);
    const start = Date.now();
    const iv = setInterval(() => {
      const pct = Math.min(((Date.now() - start) / 10000) * 100, 100);
      setGreetProgress(Math.round(pct));
      if (pct >= 100) {
        clearInterval(iv);
        setTimeout(() => { setShowGreeting(false); setActiveSection("hero"); setShowSidebar(true); }, 300);
      }
    }, 50);
    return () => clearInterval(iv);
  }, [showGreeting]);

  useEffect(() => {
    if (activeSection === "skills") {
      setSkillsAnimated(false);
      const t = setTimeout(() => setSkillsAnimated(true), 200);
      return () => clearTimeout(t);
    }
  }, [activeSection]);

  useEffect(() => { setExpandedProject(null); setExpandedCap(null); }, [activeSection]);


  /* ── Data ──────────────────────────────────────────────── */
  const allSkillsMarquee = [
    "Python", "Cybersecurity", "OWASP Top 10", "Penetration Testing",
    "Kali Linux", "Wireshark", "Nmap", "Maltego", "Flask", "JavaScript",
    "React", "Node.js", "SQL", "PostgreSQL", "B2B Sales", "Lead Generation",
    "CRM", "WebSocket", "Azure", "Git", "Bash", "Cloudflare WAF",
  ];

  const capabilities = [
    {
      num: "01", title: "OFFENSIVE SECURITY", icon: Shield,
      tagline: "Ethical hacking. Penetration testing. OWASP.",
      skills: ["Python", "Cybersecurity", "Penetration Testing", "OWASP", "Kali Linux", "Wireshark", "Nmap", "Maltego", "Bash Scripting", "Cloudflare WAF"],
      bars: [
        { name: "Cybersecurity & Pen Testing", level: 88, color: "#00ffff" },
        { name: "Web App Security (OWASP)", level: 84, color: "#f87171" },
        { name: "Network Security & OSINT", level: 82, color: "#00ffff" },
      ],
    },
    {
      num: "02", title: "DEVELOPMENT", icon: Code,
      tagline: "Full stack. Backend. Automation.",
      skills: ["Python", "Java", "JavaScript", "React", "Node.js", "Flask", "HTML/CSS", "SQLite", "Unit Testing"],
      bars: [
        { name: "Python", level: 85, color: "#00ffff" },
        { name: "JavaScript / React", level: 74, color: "#60a5fa" },
        { name: "SQL & Databases", level: 78, color: "#60a5fa" },
      ],
    },
    {
      num: "03", title: "TOOLS & OPS", icon: Terminal,
      tagline: "Database. DevOps. Infrastructure.",
      skills: ["MySQL", "PostgreSQL", "MongoDB", "Git", "Bash Scripting", "Azure", "WebSocket", "Cloudflare WAF", "Vulnerability Assessment"],
      bars: [],
    },
    {
      num: "04", title: "BUSINESS DEV", icon: Briefcase,
      tagline: "Sales. Ops. Startup ecosystem.",
      skills: ["Lead Generation", "Client Acquisition", "B2B Sales", "CRM Management", "Market Research", "Partnership Development", "EdTech Sales", "SaaS Operations", "Business Analytics", "Cold Outreach"],
      bars: [
        { name: "B2B Sales & Lead Gen", level: 90, color: "#facc15" },
        { name: "Client Acquisition / CRM", level: 85, color: "#facc15" },
      ],
    },
  ];

  const experiences = [
    { company: "OpenHire", position: "Business Development Associate (Internship)", period: "Feb 2026 - Present", highlight: "Managing high-impact client acquisition and partnership growth for a premier recruitment firm. Building high-performance sales & ops engines for EdTech & SaaS clients.", tag: "ACTIVE" },
    { company: "codeiam.club, Andhra University", position: "Community Relations Lead", period: "Apr 2025 - Present", highlight: "Spearheading inter-club collaboration initiatives and fostering community engagement within codeiam.club.", tag: "ACTIVE" },
    { company: "Caarya", position: "Business Development Manager (Internship)", period: "Jan 2025 - Dec 2025", highlight: "Drove strategic partnerships connecting startups with top talent. Achieved 35% conversion rate & 50% increase in startup onboarding.", tag: "COMPLETED" },
    { company: "codeiam.club, Andhra University", position: "Cybersecurity Chapter Lead", period: "Apr 2024 - Mar 2025", highlight: "Led the Cybersecurity chapter, organised student summits and collaborated on the Codeiam Spark Nation Hackathon.", tag: "COMPLETED" },
    { company: "IIT Bhubaneswar", position: "Software Testing Intern", period: "May 2024 - July 2024", highlight: "Evaluated and validated academic software systems; designed test cases and supported automation documentation.", tag: "COMPLETED" },
    { company: "Techno Hacks", position: "Cybersecurity Intern", period: "July 2024 - Aug 2024", highlight: "Performed network sniffing (Wireshark), scanning (Nmap), and OSINT gathering (Maltego).", tag: "COMPLETED" },
  ];

  const featuredProjects = [
    {
      title: "CityBus Live", subtitle: "Real-Time Urban Bus Tracking",
      problem: "City buses run blind. No live tracking, no ETAs, and dedicated GPS hardware costs 15,000 per vehicle — an impossible ask for public transit operators.",
      fix: "Repurpose the driver's own smartphone as the tracker via HTML5 Geolocation + WebSocket Pub/Sub. Zero hardware cost, live ETAs to commuters, 287ms latency.",
      description: "Deployed live on 4 Visakhapatnam routes. 500+ concurrent sessions, 99.8% traffic reduction vs HTTP polling. Research paper submitted to ASIANCON 2026 and ICST 2026.",
      impact: "CRITICAL", tag: "Research Paper",
      tech: "Flask-SocketIO · WebSocket · Azure App Service · PostgreSQL · Leaflet.js · PWA",
      metrics: ["287ms avg latency", "500+ concurrent users", "4 live routes", "99.8% polling reduction"],
    },
    {
      title: "Cybersweep", subtitle: "Automated Recon Toolkit",
      problem: "Early-stage pentests burn hours on repetitive port scanning, service fingerprinting and report formatting — before any real analysis begins.",
      fix: "Automate the entire recon pipeline. Scan, fingerprint, assemble threat report — single command, single run.",
      description: "Python-powered recon toolkit for comprehensive network analysis, vulnerability detection, and automated threat reporting.",
      impact: "CRITICAL",
      tech: "Python · Nmap · Security Analytics · Automation",
      github: "https://github.com/Abhiram-ops/Cybersweep",
      metrics: ["Automated pipeline", "Multi-vector scanning", "Structured reports"],
    },
    {
      title: "Web App Vulnerability Scanner", subtitle: "OWASP Top 10 Automation",
      problem: "Manual OWASP Top 10 checks take hours, are inconsistently applied, and easy to miss across large codebases.",
      fix: "Systematically probe every attack vector automatically. Output a structured, actionable remediation report.",
      description: "Console-based tool detecting SQLi, XSS, and CSRF. Automates OWASP Top 10 checks and generates detailed security reports.",
      impact: "HIGH",
      tech: "Python · Requests · BeautifulSoup · OWASP Top 10",
      metrics: ["OWASP Top 10 coverage", "SQLi / XSS / CSRF detection", "Auto remediation reports"],
    },
    {
      title: "LeadFinder", subtitle: "Smart Lead Scraping Tool",
      problem: "Sales teams burn hours manually scraping job boards and company pages for qualified leads that may not even be accurate.",
      fix: "Package the whole process as a standalone .exe. Enter criteria, get validated, deduplicated leads immediately.",
      description: "Standalone executable for automated lead generation. Extracts job metadata and contact info via SerpAPI, BeautifulSoup and Regex.",
      impact: "HIGH",
      tech: "Python · SerpAPI · Web Scraping · Automation",
      metrics: ["Standalone .exe", "Multi-source scraping", "Validated contacts"],
    },
    {
      title: "E-Attendance", subtitle: "QR Code + OTP System",
      problem: "Roll call is trivially faked. A student can answer for an absent friend in seconds — no technical skill required.",
      fix: "Time-limited QR + one-time OTP. Both must validate together on-device before attendance logs. Impersonation becomes practically impossible.",
      description: "Secure dual-factor attendance system with QR generation and OTP verification, eliminating proxy attendance.",
      impact: "MEDIUM",
      tech: "Flask · MySQL · QR Code · OTP · Python",
      metrics: ["Time-limited QR", "OTP dual-factor", "Zero proxy loophole"],
    },
  ];

  const certifications = [
    { name: "Google Cybersecurity Certificate", issuer: "Google · Coursera", year: "In Progress", status: "ACTIVE" },
    { name: "REMAC+", issuer: "Udemy", year: "2026", status: "COMPLETED" },
    { name: "Business Ethics", issuer: "NPTEL · IIT", year: "2026", status: "COMPLETED" },
  ];

  const researchPapers = [
    { title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework", venue: "ASIANCON 2026", full: "Asia Conference on Innovation in Emerging Technologies", id: "Paper ID: 1595", status: "UNDER REVIEW" },
    { title: "CityBus Live: A Hardware-Free, Universally Deployable Real-Time Urban Bus Tracking Framework", venue: "ICST 2026", full: "International Conference on Intelligent Computing & Sustainable Technologies", id: "Paper ID: 232", status: "UNDER REVIEW" },
  ];

  const securityPipeline = [
    { num: "01", skill: "Penetration Testing", detail: "OWASP methodology, manual + automated", status: "VERIFIED" },
    { num: "02", skill: "Network Analysis", detail: "Wireshark, Nmap, traffic sniffing", status: "VERIFIED" },
    { num: "03", skill: "OSINT & Recon", detail: "Maltego, open-source intelligence", status: "VERIFIED" },
    { num: "04", skill: "Web App Security", detail: "SQLi, XSS, CSRF, injection attacks", status: "VERIFIED" },
    { num: "05", skill: "Google Cybersecurity", detail: "Coursera certification — in progress", status: "IN PROGRESS" },
    { num: "06", skill: "Research Publication", detail: "Two conference submissions, under review", status: "SUBMITTED" },
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
  const handleSectionChange = (s: string) => { setActiveSection(s); setShowSidebar(false); };
  const handleNextSection = () => {
    const i = sections.indexOf(activeSection);
    if (i < sections.length - 1) setActiveSection(sections[i + 1]);
  };
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 10) setTimeout(handleNextSection, 800);
  };
  const tagColor = (tag: string) => tag === "ACTIVE"
    ? "text-terminal-green-bright bg-terminal-green/10 border-terminal-green-bright"
    : "text-terminal-green/45 bg-transparent border-terminal-green/20";
  const impactColor = (impact: string) => {
    if (impact === "CRITICAL") return "text-red-400 border-red-400/40 bg-red-400/10";
    if (impact === "HIGH") return "text-yellow-400 border-yellow-400/40 bg-yellow-400/10";
    return "text-terminal-green/55 border-terminal-green/20 bg-transparent";
  };
  const R = () => "reveal-item";

  /* ══════════════════════════════════════════════════════════
     SECTION RENDERS
  ══════════════════════════════════════════════════════════ */

  /* ── [ 00 ] HERO ──────────────────────────────────────── */
  const renderHero = () => (
    <section className="min-h-screen flex flex-col justify-center px-5 sm:px-12 lg:px-16 relative z-10 pt-16 sm:pt-0" onScroll={handleScroll}>

      <div className={heroRevealed ? R() : "opacity-0"} style={{ animationDelay: "0.05s" }}>
        <SectionLabel num="00" title="IDENTITY_SCAN" />
      </div>

      {/* Mega headline */}
      <div className="mb-3 sm:mb-4 overflow-hidden">
        <h1 className={`font-display leading-none tracking-wide glitch-text ${heroRevealed ? R() : "opacity-0"}`}
          data-text="ABHIRAM"
          style={{ fontSize: "clamp(3.2rem, 14vw, 15rem)", animationDelay: "0.15s", textShadow: "0 0 40px hsl(180 100% 50% / 0.5), 0 0 80px hsl(180 100% 50% / 0.2)" }}>
          ABHIRAM
        </h1>
        <h1 className={`font-display leading-none tracking-wide ${heroRevealed ? R() : "opacity-0"}`}
          style={{ fontSize: "clamp(3.2rem, 14vw, 15rem)", animationDelay: "0.25s", color: "hsl(180 100% 50% / 0.15)", WebkitTextStroke: "1px hsl(180 100% 50% / 0.25)" }}>
          LANKA
        </h1>
      </div>

      {/* Divider */}
      <div className={`w-full h-px mb-4 relative ${heroRevealed ? R() : "opacity-0"}`} style={{ animationDelay: "0.35s", background: "linear-gradient(to right, hsl(180 100% 50% / 0.5), hsl(180 100% 50% / 0.1))" }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-terminal-green-bright" />
      </div>

      {/* Cycling subtitle */}
      <div className={`h-6 mb-7 ${heroRevealed ? R() : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
        <p className="text-xs sm:text-sm font-mono text-terminal-green/55 tracking-[0.25em] uppercase">
          {heroSubTyped}<span className="animate-blink">_</span>
        </p>
      </div>

      {/* Stats */}
      <div className={`grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 mb-8 max-w-xl ${heroRevealed ? R() : "opacity-0"}`} style={{ animationDelay: "0.5s" }}>
        {[
          { to: 2, label: "Research Papers", suffix: "" },
          { to: 4, label: "Internship Roles", suffix: "+" },
          { to: 500, label: "Concurrent Users", suffix: "+" },
          { to: 2026, label: "Graduating", suffix: "" },
        ].map((s, i) => (
          <div key={i}>
            <div className="font-display text-3xl sm:text-5xl leading-none text-terminal-green-bright">
              {heroRevealed ? <CountUp to={s.to} /> : 0}{s.suffix}
            </div>
            <div className="text-xs font-mono text-terminal-green/35 mt-1 uppercase tracking-widest leading-tight">{s.label}</div>
          </div>
        ))}
      </div>

      {/* CTAs */}
      <div className={`flex flex-wrap gap-2 sm:gap-3 mb-8 ${heroRevealed ? R() : "opacity-0"}`} style={{ animationDelay: "0.62s" }}>
        <button onClick={() => window.open("https://github.com/Abhiram-ops", "_blank")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-terminal-green text-terminal-green-bright text-xs sm:text-sm font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_16px_hsl(180_100%_50%/0.3)] transition-all duration-200">
          <Github className="w-4 h-4" /> GITHUB <ArrowRight className="w-3 h-3" />
        </button>
        <button onClick={() => window.open("https://www.linkedin.com/in/abhiram-lanka-1696a5306/", "_blank")}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-terminal-green/35 text-terminal-green/75 text-xs sm:text-sm font-mono hover:border-terminal-green hover:text-terminal-green-bright transition-all duration-200">
          <Linkedin className="w-4 h-4" /> LINKEDIN
        </button>
        <button onClick={handleDownloadResume}
          className="flex items-center gap-2 px-4 sm:px-5 py-2.5 border border-terminal-green/35 text-terminal-green/75 text-xs sm:text-sm font-mono hover:border-terminal-green hover:text-terminal-green-bright transition-all duration-200">
          <Download className="w-4 h-4" /> RESUME
        </button>
        <div className="flex items-center gap-1.5 text-xs font-mono text-terminal-green/35 self-center">
          <MapPin className="w-3 h-3" /> Visakhapatnam, AP
        </div>
      </div>

      {/* Skill marquee */}
      <div className={`border-t border-b border-terminal-green/12 py-2.5 overflow-hidden -mx-5 sm:-mx-12 lg:-mx-16 ${heroRevealed ? R() : "opacity-0"}`} style={{ animationDelay: "0.78s" }}>
        <div className="marquee-track">
          {[...allSkillsMarquee, ...allSkillsMarquee].map((s, i) => (
            <span key={i} className="text-xs font-mono text-terminal-green/40 uppercase tracking-[0.2em] px-4 whitespace-nowrap">
              {s} <span className="text-terminal-green/18 ml-4">·</span>
            </span>
          ))}
        </div>
      </div>

      <div className="tron-grid hidden sm:block" />
      <div className="h-20" />
    </section>
  );


  /* ── [ 01 ] CAPABILITIES ─────────────────────────────── */
  const renderSkills = () => (
    <section className="min-h-screen flex items-center justify-center px-3 sm:px-8 overflow-y-auto relative z-10 pt-14 sm:pt-0 pb-8" onScroll={handleScroll}>
      <div className="max-w-5xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="SKILL_MATRIX.SYS">
          <SectionLabel num="01" title="CAPABILITIES" />

          <div className="grid sm:grid-cols-2 gap-3">
            {capabilities.map((cap, i) => {
              const isOpen = expandedCap === i;
              const Icon = cap.icon;
              return (
                <div key={i}
                  className={`border rounded-lg transition-all duration-300 cursor-pointer overflow-hidden
                    ${isOpen ? "border-terminal-green/60 bg-terminal-green/4 shadow-[0_0_24px_hsl(180_100%_50%/0.07)]" : "border-terminal-green/18 hover:border-terminal-green/40"}`}
                  onClick={() => setExpandedCap(isOpen ? null : i)}>

                  <div className="p-3 sm:p-4">
                    {/* Card header */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-terminal-green/30">{cap.num}</span>
                        <div>
                          <div className="flex items-center gap-2">
                            <Icon className="w-3.5 h-3.5 text-terminal-green-bright" />
                            <h3 className="font-mono text-xs font-bold text-terminal-green-bright tracking-widest">{cap.title}</h3>
                          </div>
                          <p className="text-xs text-terminal-green/40 font-body mt-0.5">{cap.tagline}</p>
                        </div>
                      </div>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-terminal-green/45 shrink-0" /> : <ChevronDown className="w-4 h-4 text-terminal-green/30 shrink-0" />}
                    </div>

                    {/* Skills chips — always visible */}
                    <div className="flex flex-wrap gap-1.5 mb-2">
                      {cap.skills.slice(0, isOpen ? cap.skills.length : 5).map(s => (
                        <span key={s} className="text-xs px-2 py-0.5 border border-terminal-green/25 rounded font-mono text-terminal-green/60 bg-terminal-green/4 hover:border-terminal-green/50 transition-colors">{s}</span>
                      ))}
                      {!isOpen && cap.skills.length > 5 && (
                        <span className="text-xs px-2 py-0.5 font-mono text-terminal-green/30">+{cap.skills.length - 5} more</span>
                      )}
                    </div>

                    {/* Expanded: proficiency bars */}
                    {isOpen && cap.bars.length > 0 && (
                      <div className="mt-4 pt-3 border-t border-terminal-green/15 space-y-3 animate-fade-in">
                        <p className="text-xs font-mono text-terminal-green/30 uppercase tracking-widest mb-2">Proficiency</p>
                        {cap.bars.map((bar, bi) => (
                          <div key={bi}>
                            <div className="flex justify-between mb-1">
                              <span className="text-xs font-body text-terminal-green/65">{bar.name}</span>
                              <span className="text-xs font-mono font-bold" style={{ color: bar.color }}>{skillsAnimated ? `${bar.level}%` : "0%"}</span>
                            </div>
                            <div className="h-1 rounded-full overflow-hidden" style={{ background: "hsl(180 100% 50% / 0.06)" }}>
                              <div className="h-full rounded-full transition-all ease-out"
                                style={{ width: skillsAnimated ? `${bar.level}%` : "0%", backgroundColor: bar.color, boxShadow: `0 0 8px ${bar.color}60`, transitionDuration: "1200ms", transitionDelay: `${bi * 120}ms` }} />
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {!isOpen && <p className="text-xs font-mono text-terminal-green/22 mt-1">[ CLICK TO EXPAND ]</p>}
                  </div>
                </div>
              );
            })}
          </div>
        </TerminalWindow>
      </div>
    </section>
  );


  /* ── [ 02 ] MISSION LOG ──────────────────────────────── */
  const renderExperience = () => (
    <section className="min-h-screen flex items-center justify-center px-3 sm:px-8 overflow-y-auto relative z-10 pt-14 sm:pt-0 pb-8" onScroll={handleScroll}>
      <div className="max-w-3xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="MISSION_LOG.EXP">
          <SectionLabel num="02" title="MISSION_LOG" />

          {/* Stats bar — Attendly-style */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 p-3 sm:p-4 border border-terminal-green/15 rounded-lg" style={{ background: "rgba(0,255,255,0.02)" }}>
            {[
              { val: "35%", label: "Conversion Rate", color: "text-terminal-green-bright" },
              { val: "50%", label: "Onboarding Uplift", color: "text-terminal-green-bright" },
              { val: "4+", label: "Roles Held", color: "text-terminal-green-bright" },
              { val: "2", label: "Active Roles", color: "text-yellow-400" },
            ].map((s, i) => (
              <div key={i}>
                <div className={`font-display text-2xl sm:text-3xl leading-none ${s.color}`}>{s.val}</div>
                <div className="text-xs font-mono text-terminal-green/35 mt-1 uppercase tracking-widest leading-tight">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-terminal-green/15" />
            <div className="space-y-4">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-8 group">
                  <div className={`absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 transition-all duration-300
                    ${exp.tag === "ACTIVE" ? "border-terminal-green-bright bg-terminal-green/20 timeline-dot-active" : "border-terminal-green/35 bg-terminal-bg group-hover:border-terminal-green-bright"}`} />
                  <div className={`border rounded-lg p-3 sm:p-4 transition-all duration-200
                    ${exp.tag === "ACTIVE" ? "border-terminal-green/35 bg-terminal-green/3" : "border-terminal-green/12 hover:border-terminal-green/30"}`}>
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-1.5">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-body font-semibold text-terminal-green-bright text-sm">{exp.company}</h3>
                          <span className={`text-xs border px-1.5 py-0.5 rounded font-mono ${tagColor(exp.tag)}`}>{exp.tag}</span>
                        </div>
                        <p className="text-xs text-terminal-green/55 font-mono">{exp.position}</p>
                      </div>
                      <p className="text-xs text-terminal-green/35 font-mono whitespace-nowrap">{exp.period}</p>
                    </div>
                    <p className="text-xs text-terminal-green/70 leading-relaxed font-body">{exp.highlight}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="text-xs font-mono text-terminal-green/25 text-center mt-5">+ Full impact metrics in resume</p>
        </TerminalWindow>
      </div>
    </section>
  );


  /* ── [ 03 ] EXPLOIT VAULT — Problem/Fix framing ─────── */
  const renderProjects = () => {
    const [featured, ...rest] = featuredProjects;
    return (
      <section className="min-h-screen flex items-center justify-center px-3 sm:px-8 overflow-y-auto relative z-10 pt-14 sm:pt-0 pb-8" onScroll={handleScroll}>
        <div className="max-w-5xl mx-auto w-full animate-fade-in">
          <TerminalWindow title="EXPLOIT_VAULT.DIR">
            <SectionLabel num="03" title="EXPLOIT_VAULT" />

            {/* Featured project */}
            <div className={`relative border rounded-lg p-4 sm:p-5 mb-4 cursor-pointer overflow-hidden transition-all duration-300
              ${expandedProject === 0 ? "border-terminal-green/65 shadow-[0_0_32px_hsl(180_100%_50%/0.08)]" : "border-terminal-green/30 hover:border-terminal-green/55"}`}
              style={{ background: expandedProject === 0 ? "rgba(0,255,255,0.03)" : "transparent" }}
              onClick={() => setExpandedProject(expandedProject === 0 ? null : 0)}>

              <div className="absolute top-0 right-0 w-40 h-40 rounded-full blur-3xl pointer-events-none" style={{ background: "radial-gradient(circle, rgba(0,255,255,0.04), transparent)" }} />

              <div className="flex items-start justify-between gap-2 mb-1 flex-wrap">
                <div>
                  <span className="text-xs font-mono text-terminal-green/30 uppercase tracking-widest">Featured Project</span>
                  <h3 className={`font-display text-xl sm:text-3xl tracking-wide mt-0.5 transition-colors ${expandedProject === 0 ? "text-white" : "text-terminal-green-bright"}`}>
                    {featured.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-body text-terminal-green/50">{featured.subtitle}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`text-xs border px-2 py-1 rounded font-mono ${impactColor(featured.impact)}`}>{featured.impact}</span>
                  <span className="text-xs border border-yellow-400/35 text-yellow-400/75 px-2 py-1 rounded font-mono">{featured.tag}</span>
                  {expandedProject === 0 ? <ChevronUp className="w-4 h-4 text-terminal-green/45" /> : <ChevronDown className="w-4 h-4 text-terminal-green/30" />}
                </div>
              </div>

              <p className="text-xs font-mono text-terminal-green/35 mb-3">{featured.tech}</p>

              {/* Problem / Fix — always visible on featured */}
              <div className="grid sm:grid-cols-2 gap-2 mb-3">
                <div className="p-3 border border-red-400/18 rounded-lg" style={{ background: "rgba(248,113,113,0.03)" }}>
                  <p className="text-xs font-mono text-red-400/55 uppercase tracking-widest mb-1.5">The Problem</p>
                  <p className="text-xs font-body text-terminal-green/65 leading-relaxed">{featured.problem}</p>
                </div>
                <div className="p-3 border border-terminal-green/20 rounded-lg" style={{ background: "rgba(0,255,255,0.03)" }}>
                  <p className="text-xs font-mono text-terminal-green-bright/55 uppercase tracking-widest mb-1.5">The Fix</p>
                  <p className="text-xs font-body text-terminal-green/80 leading-relaxed">{featured.fix}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5 mb-2">
                {featured.metrics?.map((m, mi) => (
                  <span key={mi} className="text-xs px-2 py-1 border border-terminal-green/22 rounded-full font-mono text-terminal-green/55 bg-terminal-green/4">✓ {m}</span>
                ))}
              </div>

              {expandedProject !== 0 && <p className="text-xs font-mono text-terminal-green/22">[ CLICK FOR MORE ]</p>}
              {expandedProject === 0 && (
                <div className="mt-3 pt-3 border-t border-terminal-green/15 animate-fade-in">
                  <p className="text-xs sm:text-sm font-body text-terminal-green/80 leading-relaxed">{featured.description}</p>
                </div>
              )}
            </div>

            {/* Other projects — 2-col grid with Problem/Fix on expand */}
            <div className="grid sm:grid-cols-2 gap-2.5">
              {rest.map((p, i) => {
                const idx = i + 1;
                const isExp = expandedProject === idx;
                return (
                  <div key={idx}
                    className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all duration-300
                      ${isExp ? "border-terminal-green/55 bg-terminal-green/4" : "border-terminal-green/18 hover:border-terminal-green/40"}`}
                    onClick={() => setExpandedProject(isExp ? null : idx)}>

                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h3 className={`text-sm font-body font-semibold transition-colors ${isExp ? "text-white" : "text-terminal-green-bright"}`}>{p.title}</h3>
                          {p.github && (
                            <button onClick={e => { e.stopPropagation(); window.open(p.github, "_blank"); }}
                              className="text-terminal-green/40 hover:text-terminal-green-bright transition-colors shrink-0">
                              <Github className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                        <p className="text-xs text-terminal-green/40 font-body">{p.subtitle}</p>
                      </div>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <span className={`text-xs border px-1.5 py-0.5 rounded font-mono ${impactColor(p.impact)}`}>{p.impact}</span>
                        {isExp ? <ChevronUp className="w-3.5 h-3.5 text-terminal-green/40" /> : <ChevronDown className="w-3.5 h-3.5 text-terminal-green/28" />}
                      </div>
                    </div>

                    <p className="text-xs font-mono text-terminal-green/32 mb-2">{p.tech}</p>

                    {!isExp && <p className="text-xs font-mono text-terminal-green/22">[ CLICK TO EXPAND ]</p>}
                    {isExp && (
                      <div className="animate-fade-in">
                        <div className="grid grid-cols-1 gap-2 mb-3">
                          <div className="p-2.5 border border-red-400/15 rounded" style={{ background: "rgba(248,113,113,0.02)" }}>
                            <p className="text-xs font-mono text-red-400/50 uppercase tracking-widest mb-1">The Problem</p>
                            <p className="text-xs font-body text-terminal-green/60 leading-relaxed">{p.problem}</p>
                          </div>
                          <div className="p-2.5 border border-terminal-green/18 rounded" style={{ background: "rgba(0,255,255,0.02)" }}>
                            <p className="text-xs font-mono text-terminal-green-bright/50 uppercase tracking-widest mb-1">The Fix</p>
                            <p className="text-xs font-body text-terminal-green/75 leading-relaxed">{p.fix}</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {p.metrics?.map((m, mi) => (
                            <span key={mi} className="text-xs px-1.5 py-0.5 border border-terminal-green/20 rounded font-mono text-terminal-green/50">✓ {m}</span>
                          ))}
                        </div>
                        {p.github && (
                          <button onClick={e => { e.stopPropagation(); window.open(p.github, "_blank"); }}
                            className="flex items-center gap-1 text-xs font-mono text-terminal-green-bright hover:underline">
                            <ExternalLink className="w-3 h-3" /> VIEW SOURCE
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
            <p className="text-xs font-mono text-terminal-green/25 text-center mt-4">+ More on GitHub</p>
          </TerminalWindow>
        </div>
      </section>
    );
  };


  /* ── [ 04 ] THREAT ASSESSMENT — security pipeline ───── */
  const renderAssessment = () => (
    <section className="min-h-screen flex items-center justify-center px-3 sm:px-8 overflow-y-auto relative z-10 pt-14 sm:pt-0 pb-8" onScroll={handleScroll}>
      <div className="max-w-4xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="THREAT_ASSESSMENT.FINAL">
          <SectionLabel num="04" title="THREAT_ASSESSMENT" />

          {/* Security pipeline — Attendly-inspired numbered steps */}
          <div className="mb-7">
            <p className="text-xs font-mono text-terminal-green/35 uppercase tracking-widest mb-4">Security Pipeline · All checks verified in order</p>
            <div className="space-y-2">
              {securityPipeline.map((step, i) => (
                <div key={i} className={`flex items-center gap-3 p-3 rounded-lg border transition-all duration-200
                  ${step.status === "VERIFIED" ? "border-terminal-green/22 hover:border-terminal-green/40" :
                    step.status === "IN PROGRESS" ? "border-yellow-400/22 hover:border-yellow-400/40" :
                    "border-blue-400/22 hover:border-blue-400/40"}`}
                  style={{ background: step.status === "VERIFIED" ? "rgba(0,255,255,0.02)" : step.status === "IN PROGRESS" ? "rgba(250,204,21,0.02)" : "rgba(96,165,250,0.02)" }}>
                  <span className="font-mono text-xs text-terminal-green/30 shrink-0 w-6">{step.num}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-body font-semibold text-terminal-green-bright truncate">{step.skill}</p>
                    <p className="text-xs font-mono text-terminal-green/40 hidden sm:block">{step.detail}</p>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className={`text-xs font-mono px-2 py-0.5 rounded border
                      ${step.status === "VERIFIED" ? "text-terminal-green-bright border-terminal-green/30" :
                        step.status === "IN PROGRESS" ? "text-yellow-400 border-yellow-400/30" :
                        "text-blue-400 border-blue-400/30"}`}>
                      {step.status}
                    </span>
                    <span className={`text-sm ${step.status === "VERIFIED" ? "text-terminal-green-bright" : step.status === "IN PROGRESS" ? "text-yellow-400" : "text-blue-400"}`}>
                      {step.status === "VERIFIED" ? "✓" : step.status === "IN PROGRESS" ? "○" : "→"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="mb-5">
            <p className="text-xs font-mono text-terminal-green/35 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Award className="w-3.5 h-3.5" /> Certifications
            </p>
            <div className="grid sm:grid-cols-3 gap-2">
              {certifications.map((c, i) => (
                <div key={i} className="flex items-center gap-2.5 p-3 border border-terminal-green/18 rounded-lg hover:border-terminal-green/35 transition-all">
                  <Shield className={`w-4 h-4 shrink-0 ${c.status === "ACTIVE" ? "text-yellow-400" : "text-terminal-green-bright"}`} />
                  <div>
                    <p className="text-xs font-body font-semibold text-terminal-green-bright leading-tight">{c.name}</p>
                    <p className="text-xs font-mono text-terminal-green/40">
                      {c.issuer} · {c.status === "ACTIVE" ? <span className="text-yellow-400 font-bold">IN PROGRESS</span> : c.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Research papers */}
          <div className="mb-5">
            <p className="text-xs font-mono text-terminal-green/35 uppercase tracking-widest mb-3 flex items-center gap-2">
              <FileText className="w-3.5 h-3.5" /> Research Publications
            </p>
            <div className="space-y-2">
              {researchPapers.map((pub, i) => (
                <div key={i} className="p-3 sm:p-4 border border-terminal-green/18 rounded-lg hover:border-terminal-green/35 transition-colors">
                  <div className="flex items-start justify-between gap-2 flex-wrap mb-1.5">
                    <p className="text-xs sm:text-sm font-body font-semibold text-terminal-green-bright flex-1 leading-snug">{pub.title}</p>
                    <span className="text-xs border border-yellow-400/35 text-yellow-400/75 px-2 py-0.5 rounded font-mono shrink-0">{pub.status}</span>
                  </div>
                  <p className="text-xs font-mono text-terminal-green/50">{pub.venue} · {pub.full}</p>
                  <p className="text-xs font-mono text-terminal-green/30 mt-0.5">{pub.id} · First Author: Abhiram Lanka</p>
                </div>
              ))}
            </div>
          </div>

          {/* Leadership */}
          <div className="mb-5">
            <p className="text-xs font-mono text-terminal-green/35 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Brain className="w-3.5 h-3.5" /> Leadership & Recognition
            </p>
            <div className="grid sm:grid-cols-2 gap-2">
              {["Cybersecurity Chapter Lead, codeIAM Club", "Organising Committee, Codeiam Spark Nation Hackathon", "Attendee, BSides Vizag 2025 Cybersecurity Conference", "1st Prize, ABVP Event (Andhra University, 2024)"].map((a, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 border border-terminal-green/12 rounded-lg hover:border-terminal-green/25 transition-colors">
                  <span className="text-terminal-green-bright mt-0.5 shrink-0">»</span>
                  <span className="text-xs font-body text-terminal-green/70">{a}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 sm:p-5 border border-terminal-green rounded-lg text-center" style={{ background: "rgba(0,255,255,0.03)" }}>
            <p className="text-sm font-body text-terminal-green-bright mb-3 font-semibold">Ready to contribute?</p>
            <button onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-terminal-green text-terminal-green-bright text-sm font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] transition-all">
              <Download className="w-4 h-4" /> DOWNLOAD FULL RESUME
            </button>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );

  /* ── [ 05 ] SECURE CHANNEL ───────────────────────────── */
  const renderContact = () => (
    <section className="min-h-screen flex items-center justify-center px-3 sm:px-8 overflow-y-auto relative z-10 pt-14 sm:pt-0 pb-8" onScroll={handleScroll}>
      <div className="max-w-3xl mx-auto w-full animate-fade-in">
        <TerminalWindow title="SECURE_CHANNEL.COMM">
          <SectionLabel num="05" title="SECURE_CHANNEL" />
          <h3 className="font-display text-2xl sm:text-4xl text-terminal-green-bright tracking-widest text-center mb-6">
            ESTABLISH CONNECTION
          </h3>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {[
              { icon: Github, label: "GitHub", action: () => window.open("https://github.com/Abhiram-ops", "_blank"), cta: "VIEW REPOS" },
              { icon: Linkedin, label: "LinkedIn", action: () => window.open("https://www.linkedin.com/in/abhiram-lanka-1696a5306/", "_blank"), cta: "CONNECT" },
              { icon: Download, label: "Resume", action: handleDownloadResume, cta: "DOWNLOAD" },
            ].map((item, i) => (
              <div key={i} className="p-4 sm:p-5 border border-terminal-green/22 rounded-lg text-center hover:border-terminal-green/55 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.06)] transition-all duration-200 group">
                <item.icon className="w-7 h-7 text-terminal-green-bright mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <h4 className="font-body font-semibold text-terminal-green-bright mb-2 text-xs uppercase tracking-wider">{item.label}</h4>
                <button onClick={item.action}
                  className="text-xs font-mono text-terminal-green/65 border border-terminal-green/28 px-3 py-1.5 hover:border-terminal-green hover:text-terminal-green-bright transition-all w-full">
                  {item.cta}
                </button>
              </div>
            ))}
          </div>
          <div className="p-3 border border-terminal-green/18 rounded-lg text-center">
            <p className="text-xs font-mono text-terminal-green/60">
              <a href="mailto:lankaabhiram16@gmail.com" className="hover:text-terminal-green-bright transition-colors">lankaabhiram16@gmail.com</a>
              <span className="text-terminal-green/22 mx-3">·</span>
              <a href="tel:9556925563" className="hover:text-terminal-green-bright transition-colors">9556925563</a>
              <span className="text-terminal-green/22 mx-3">·</span>
              Visakhapatnam, AP
            </p>
          </div>
        </TerminalWindow>
      </div>
    </section>
  );

  /* ── Router ──────────────────────────────────────────── */
  const renderActiveSection = () => {
    switch (activeSection) {
      case "hero": return renderHero();
      case "skills": return renderSkills();
      case "experience": return renderExperience();
      case "projects": return renderProjects();
      case "assessment": return renderAssessment();
      case "contact": return renderContact();
      default: return renderHero();
    }
  };


  /* ── Lock / Animating / Greeting screens ──────────────── */
  if (!isUnlocked && !isAnimating) {
    return (
      <div className="min-h-screen text-terminal-green relative flex items-center justify-center" style={{ background: "radial-gradient(ellipse 120% 80% at 15% 40%, #020d1a 0%, #030810 40%, #020609 100%)" }}>
        <div className="cyber-cursor" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 16 : 10, height: cursorBig ? 16 : 10 }} />
        <FuturisticBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 text-center max-w-md mx-auto px-5">
          <div className="border border-terminal-green/40 rounded-lg p-6 md:p-8 shadow-[0_0_40px_hsl(180_100%_50%/0.15)]" style={{ background: "rgba(2,12,22,0.9)", backdropFilter: "blur(16px)" }}>
            <SectionLabel num="00" title="IDENTITY_SCAN" />
            <div className="w-20 h-20 mx-auto mb-4 border-2 border-terminal-green rounded-full flex items-center justify-center shadow-[0_0_20px_hsl(180_100%_50%/0.3)]">
              <Lock className="w-8 h-8 text-terminal-green-bright animate-pulse" />
            </div>
            <h1 className="font-display text-2xl sm:text-3xl text-terminal-green-bright mb-2">CLASSIFIED ACCESS</h1>
            <p className="text-terminal-green/55 text-sm font-mono mb-1">Security credentials required</p>
            <p className="text-xs font-mono text-terminal-green/30 mb-6">Click to access ABHIRAM's portfolio</p>
            <button onClick={handleUnlock}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-terminal-green text-terminal-green-bright font-mono hover:bg-terminal-green/10 hover:shadow-[0_0_20px_hsl(180_100%_50%/0.3)] transition-all duration-200">
              <Unlock className="w-5 h-5" /> GRANT ACCESS
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (isAnimating) {
    return (
      <div className="min-h-screen text-terminal-green relative flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse 120% 80% at 15% 40%, #020d1a 0%, #030810 40%, #020609 100%)" }}>
        <FuturisticBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 text-center max-w-2xl px-4">
          <div className="w-44 h-44 mx-auto relative mb-8">
            <div className="absolute inset-0 border-2 border-terminal-green/30 rounded-full animate-spin" />
            <div className="absolute inset-4 border border-terminal-green/50 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "3s" }} />
            <div className="absolute inset-8 border border-terminal-green/70 rounded-full animate-spin" style={{ animationDuration: "2s" }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Shield className="w-14 h-14 text-terminal-green-bright animate-pulse" />
            </div>
          </div>
          <h2 className="font-display text-3xl md:text-5xl text-terminal-green-bright mb-5">DECRYPTING ACCESS</h2>
          <div className="space-y-1.5 font-mono text-sm text-left inline-block">
            <p className="text-terminal-green-bright">» Authenticating credentials...</p>
            <p className="text-terminal-green/75">» Establishing secure session...</p>
            <p className="text-terminal-green/45">» Loading portfolio data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (showGreeting) {
    return (
      <div className="min-h-screen text-terminal-green relative flex items-center justify-center overflow-hidden" style={{ background: "radial-gradient(ellipse 120% 80% at 15% 40%, #020d1a 0%, #030810 40%, #020609 100%)" }}>
        <FuturisticBackground />
        <div className="grain-overlay" /><div className="scanlines" />
        <div className="relative z-10 max-w-2xl mx-auto px-5 sm:px-6 w-full pt-6 sm:pt-0 font-mono">
          <p className="text-terminal-green-bright text-sm mb-1 reveal-item" style={{ animationDelay: "0.1s" }}>» ACCESS GRANTED | CLEARANCE: ADMIN</p>
          <p className="text-terminal-green/45 text-sm mb-7 reveal-item" style={{ animationDelay: "0.3s" }}>» WELCOME, OPERATOR. IDENTITY CONFIRMED.</p>
          <h1 className="font-display text-4xl sm:text-6xl text-terminal-green-bright mb-3 reveal-item" style={{ animationDelay: "0.5s", textShadow: "0 0 40px hsl(180 100% 50% / 0.4)" }}>
            ABHIRAM LANKA
          </h1>
          <div className="w-full h-px mb-5 reveal-item" style={{ animationDelay: "0.62s", background: "linear-gradient(to right, hsl(180 100% 50% / 0.5), transparent)" }} />
          <p className="text-sm text-terminal-green/80 leading-relaxed mb-7 font-body reveal-item" style={{ animationDelay: "0.72s" }}>
            Final-year B.Tech CSE at Andhra University, Visakhapatnam. Dual focus on
            <span className="text-terminal-green-bright font-semibold"> Cybersecurity</span> and
            <span className="text-terminal-green-bright font-semibold"> Business Development</span>.
            Currently driving growth at OpenHire. Previously at Caarya and IIT Bhubaneswar.
            Built <span className="text-terminal-green-bright font-semibold">CityBus Live</span> — deployed live on 4 Visakhapatnam routes, with research papers submitted to ASIANCON 2026 and ICST 2026.
            Cybersecurity Chapter Lead at codeIAM Club. Builder of tools that make systems work better.
          </p>
          <div className="reveal-item" style={{ animationDelay: "0.88s" }}>
            <div className="flex justify-between text-xs font-mono mb-1.5">
              <span className="text-terminal-green/40">LOADING PORTFOLIO</span>
              <span className="text-terminal-green-bright">{greetProgress}%</span>
            </div>
            <div className="w-full h-1.5 rounded-full overflow-hidden" style={{ background: "hsl(180 100% 50% / 0.06)" }}>
              <div className="h-full rounded-full transition-all duration-100 ease-linear" style={{ width: `${greetProgress}%`, background: "hsl(var(--terminal-green-bright))", boxShadow: "0 0 10px hsl(180 100% 50% / 0.6)" }} />
            </div>
          </div>
          <p className="text-xs font-mono text-terminal-green/28 mt-2.5 reveal-item" style={{ animationDelay: "1s" }}>» INITIALIZING NAVIGATION MODULES...</p>
        </div>
      </div>
    );
  }

  /* ── Main portfolio render ──────────────────────────────── */
  return (
    <div className="min-h-screen flex w-full" style={{ background: "transparent" }}>
      <div className="space-bg" />
      <div className="stars" />
      <div className="hex-grid" />
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="orb orb-1" /><div className="orb orb-2" /><div className="orb orb-3" /><div className="orb orb-4" />
      </div>

      <div className="cyber-cursor" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 18 : 10, height: cursorBig ? 18 : 10 }} />
      <div className="cyber-cursor-ring" style={{ left: cursor.x, top: cursor.y, width: cursorBig ? 48 : 32, height: cursorBig ? 48 : 32 }} />
      <div className="grain-overlay" />
      <div className="scanlines" />
      <FuturisticBackground />

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 right-4 z-[200] sm:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 border border-terminal-green/45 rounded"
        style={{ background: "rgba(2,10,18,0.85)", backdropFilter: "blur(8px)" }}
        onClick={() => setShowSidebar(true)}
        aria-label="Open navigation">
        <span className="w-5 h-px bg-terminal-green-bright block" />
        <span className="w-5 h-px bg-terminal-green-bright block" />
        <span className="w-3 h-px bg-terminal-green-bright block" />
      </button>

      <CyberSidebar
        activeSection={activeSection}
        onSectionChange={handleSectionChange}
        isOpen={showSidebar}
        onOpenChange={setShowSidebar}
      />
      <main className="flex-1 relative">
        {renderActiveSection()}
      </main>
    </div>
  );
};

export default Index;
