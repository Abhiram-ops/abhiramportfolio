import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { Github, Download, Mail, Phone, MapPin, ExternalLink, Calendar, Building, GraduationCap, Award, Shield, Code, Brain } from "lucide-react";
import kaliLogo from "@/assets/kali-logo.png";

const Index = () => {
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

  const keySkills = ["Python", "Java", "Cybersecurity", "Penetration Testing", "OWASP", "Kali Linux", "JavaScript", "SQL"];
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

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green relative">
      <MatrixBackground />
      
      {/* Kali Linux Logo Background */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-20 z-0">
        <img src={kaliLogo} alt="Kali Linux" className="w-96 h-96" />
      </div>
      
      {/* Hero Section */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
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
                <span>lankaabhiram16@gmail.com</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button variant="terminal" size="lg" className="animate-terminal-glow">
              <Github className="w-5 h-5" />
              GITHUB ACCESS
            </Button>
          </div>
        </div>
      </div>

      {/* Core Skills */}
      <div className="relative z-10 px-4 py-20">
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

          {/* Experience Preview */}
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

          {/* Featured Projects */}
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

          {/* Call to Action Summary */}
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
      </div>
    </div>
  );
};

export default Index;
