import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MatrixBackground } from "@/components/MatrixBackground";
import { TerminalWindow } from "@/components/TerminalWindow";
import { SkillTag } from "@/components/SkillTag";
import { Github, Download, Mail, Phone, MapPin, ExternalLink, Calendar, Building, GraduationCap, Award } from "lucide-react";

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

  const programmingSkills = ["Python", "Java", "SQL", "JavaScript", "HTML/CSS"];
  const cybersecuritySkills = ["Vulnerability Assessment", "Network Security", "OWASP", "Kali Linux", "Wireshark", "Bash Scripting"];
  const databaseSkills = ["MySQL", "SQLite", "PostgreSQL", "MongoDB"];
  const testingSkills = ["Unit Testing", "Test Case Design", "Bug Reporting", "Automation Concepts"];
  const businessSkills = ["Client Acquisition", "Market Research", "Lead Generation", "Pitching"];
  const toolsSkills = ["Git", "Jupyter", "VS Code", "Excel"];

  const experiences = [
    {
      company: "Caarya",
      position: "Business Development Associate",
      period: "Feb 2025 - Present",
      achievements: [
        "Prospected startups and students for internships; achieved a 35% conversion rate",
        "Designed and led pitch campaigns, resulting in a 50% increase in startup onboarding"
      ]
    },
    {
      company: "IIT Bhubaneswar",
      position: "Software Testing Intern",
      period: "May 2024 - July 2024",
      achievements: [
        "Evaluated and validated academic software systems for bugs and performance",
        "Designed test cases, reported critical issues, and supported test automation documentation"
      ]
    },
    {
      company: "Techno Hacks",
      position: "Cybersecurity Intern",
      period: "July 2024 - Aug 2024",
      achievements: [
        "Task 1: Performed sniffing attacks using Wireshark",
        "Task 2: Conducted network scanning with Nmap",
        "Task 3: Executed information gathering using Maltego"
      ]
    }
  ];

  const projects = [
    {
      title: "E-Attendance using QR & OTP",
      description: "Built a secure attendance system using Flask, MySQL, and HTML/CSS with QR and OTP verification. Implemented session handling and reduced proxy attendance and manual tracking errors.",
      technologies: ["Flask", "MySQL", "HTML/CSS", "QR Codes", "OTP"]
    },
    {
      title: "LeadFinder - Smart Lead Scraping Tool",
      description: "Developed an automated lead generation tool using Python, BeautifulSoup, SerpAPI, and Regex. Extracted job metadata, contact info, and packaged it into a .exe with PyInstaller & Inno Setup.",
      technologies: ["Python", "BeautifulSoup", "SerpAPI", "PyInstaller", "Regex"]
    },
    {
      title: "Web Application Vulnerability Scanner",
      description: "Created a console-based tool to detect SQLi, XSS, and CSRF using Python, Requests, and BeautifulSoup. Conducted OWASP Top 10 checks and generated reports for vulnerability patching.",
      technologies: ["Python", "Requests", "BeautifulSoup", "OWASP", "Security Testing"]
    }
  ];

  const achievements = [
    "Internshala Student Partner certification",
    "2nd Prize in School-Level Science Exhibition",
    "Conducted college hackathons as an event organizer",
    "Served as Cybersecurity Chapter Lead, codeIAM Club",
    "Led student summit collaboration with Caarya",
    "Regular participant in coding contests and tech events"
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-terminal-green relative">
      <MatrixBackground />
      
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
              Specialized in <span className="text-terminal-green-bright">CYBERSECURITY</span>, <span className="text-terminal-green-bright">SOFTWARE DEVELOPMENT</span>, and <span className="text-terminal-green-bright">BUSINESS STRATEGY</span>
            </p>
            <p className="text-sm md:text-base text-terminal-green/80 mb-8">
              Advanced problem-solving through innovative tech solutions and cutting-edge security protocols.
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
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="terminal" size="lg" className="animate-terminal-glow">
              <Github className="w-5 h-5" />
              GITHUB ACCESS
            </Button>
            <Button variant="outline" size="lg">
              <Download className="w-5 h-5" />
              DOWNLOAD RESUME
            </Button>
          </div>
        </div>
      </div>

      {/* Skills Section */}
      <div className="relative z-10 px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <TerminalWindow title="TECHNICAL_SKILLS.EXE" className="mb-12">
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-bold mb-4 text-terminal-green-bright">[PROGRAMMING_&_TECH]</h3>
                <div className="flex flex-wrap gap-2">
                  {programmingSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-terminal-green-bright">[CYBERSECURITY]</h3>
                <div className="flex flex-wrap gap-2">
                  {cybersecuritySkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-4 text-terminal-green-bright">[DATABASES_&_TOOLS]</h3>
                <div className="flex flex-wrap gap-2">
                  {[...databaseSkills, ...toolsSkills].map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-terminal-green-bright">[SOFTWARE_TESTING]</h3>
                <div className="flex flex-wrap gap-2">
                  {testingSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold mb-4 text-terminal-green-bright">[BUSINESS_&_STRATEGY]</h3>
                <div className="flex flex-wrap gap-2">
                  {businessSkills.map((skill) => (
                    <SkillTag key={skill} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Experience Section */}
          <TerminalWindow title="WORK_EXPERIENCE.LOG" className="mb-12">
            <div className="space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="border-l-2 border-terminal-green pl-4">
                  <div className="flex items-start gap-4 mb-2">
                    <Building className="w-5 h-5 mt-1 text-terminal-green-bright" />
                    <div>
                      <h3 className="text-lg font-bold text-terminal-green-bright">{exp.company}</h3>
                      <p className="text-terminal-green">{exp.position}</p>
                      <div className="flex items-center gap-2 text-sm text-terminal-green/80 mb-2">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <ul className="space-y-1 ml-9">
                    {exp.achievements.map((achievement, idx) => (
                      <li key={idx} className="text-sm text-terminal-green/90">
                        - {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* Education Section */}
          <TerminalWindow title="EDUCATION.DB" className="mb-12">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <GraduationCap className="w-5 h-5 mt-1 text-terminal-green-bright" />
                <div>
                  <h3 className="text-lg font-bold text-terminal-green-bright">Bachelor of Technology in Computer Science Engineering</h3>
                  <p className="text-terminal-green">Andhra University</p>
                  <div className="flex items-center gap-2 text-sm text-terminal-green/80">
                    <Calendar className="w-4 h-4" />
                    <span>2022 - 2026</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <GraduationCap className="w-5 h-5 mt-1 text-terminal-green-bright" />
                <div>
                  <h3 className="text-lg font-bold text-terminal-green-bright">Higher Secondary School</h3>
                  <p className="text-terminal-green">St. Xavier International School</p>
                  <div className="flex items-center gap-2 text-sm text-terminal-green/80">
                    <Calendar className="w-4 h-4" />
                    <span>2020 - 2022</span>
                  </div>
                </div>
              </div>
            </div>
          </TerminalWindow>

          {/* Projects Section */}
          <TerminalWindow title="PROJECT_FILES.DIR" className="mb-12">
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border border-terminal-green/30 p-4 rounded">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-terminal-green-bright">{project.title}</h3>
                    <ExternalLink className="w-5 h-5 text-terminal-green hover:text-terminal-green-bright cursor-pointer" />
                  </div>
                  <p className="text-sm text-terminal-green/90 mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <SkillTag key={tech} skill={tech} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TerminalWindow>

          {/* Achievements Section */}
          <TerminalWindow title="ACHIEVEMENTS.TXT" className="mb-12">
            <div className="space-y-3">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-start gap-3">
                  <Award className="w-4 h-4 mt-1 text-terminal-green-bright" />
                  <span className="text-sm text-terminal-green/90">{achievement}</span>
                </div>
              ))}
            </div>
          </TerminalWindow>
        </div>
      </div>

      {/* Online Indicator */}
      <div className="fixed top-4 right-4 z-20">
        <div className="terminal-window p-2">
          <div className="flex items-center gap-2 text-xs">
            <div className="w-2 h-2 bg-terminal-green rounded-full animate-pulse"></div>
            <span className="text-terminal-green font-mono">ONLINE</span>
          </div>
          <div className="text-xs text-terminal-green/70 font-mono">
            <div>xpd{'{'}qaqiq{'}'}</div>
            <div>lqk89n2u2</div>
            <div>vktjf8xv89</div>
            <div>kn448rgj040</div>
            <div>16v7xhdiqu6</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
