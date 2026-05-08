"use client";

import { useAppStore } from "@/lib/store";

export function PortfolioContent() {
  const { portfolioSection, setPortfolioSection } = useAppStore();

  return (
    <div className="flex h-full" style={{ fontFamily: '"MS Sans Serif", Tahoma, sans-serif' }}>
      {/* Sidebar navigation */}
      <div 
        className="w-32 flex-shrink-0 p-1"
        style={{
          background: "#c0c0c0",
          borderRight: "1px solid #808080"
        }}
      >
        <div className="mb-2 px-1 font-bold text-xs">Portfolio</div>
        <NavButton 
          active={portfolioSection === "about"} 
          onClick={() => setPortfolioSection("about")}
          icon="👤"
        >
          About Me
        </NavButton>
        <NavButton 
          active={portfolioSection === "projects"} 
          onClick={() => setPortfolioSection("projects")}
          icon="📁"
        >
          Projects
        </NavButton>
        <NavButton 
          active={portfolioSection === "experience"} 
          onClick={() => setPortfolioSection("experience")}
          icon="💼"
        >
          Experience
        </NavButton>
      </div>

      {/* Content area */}
      <div className="flex-1 p-3 overflow-auto bg-white">
        {portfolioSection === "about" && <AboutSection />}
        {portfolioSection === "projects" && <ProjectsSection />}
        {portfolioSection === "experience" && <ExperienceSection />}
      </div>
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: string;
  children: React.ReactNode;
}

function NavButton({ active, onClick, icon, children }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-2 py-1 mb-1 text-xs flex items-center gap-1"
      style={{
        background: active ? "#000080" : "transparent",
        color: active ? "white" : "black",
        border: active ? "1px dotted white" : "1px solid transparent"
      }}
    >
      <span>{icon}</span>
      <span>{children}</span>
    </button>
  );
}

function AboutSection() {
  return (
    <div className="text-xs">
      <h2 className="text-base font-bold mb-3 pb-1 border-b border-gray-300">
        About Me
      </h2>
      
      <div className="flex gap-4 mb-4">
        <div 
          className="w-20 h-20 flex-shrink-0"
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#808080 #ffffff #ffffff #808080"
          }}
        >
          <div className="w-full h-full flex items-center justify-center text-3xl">
            🧑‍💻
          </div>
        </div>
        
        <div>
          <h3 className="font-bold mb-1">Developer Name</h3>
          <p className="text-gray-600 mb-2">Full Stack Developer</p>
          <p className="leading-relaxed">
            Welcome to my retro portfolio! I build web applications 
            with modern technologies while appreciating the aesthetics 
            of computing history.
          </p>
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold mb-2 flex items-center gap-1">
          <span>📋</span> Skills
        </h3>
        <div className="flex flex-wrap gap-1">
          {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Three.js", "CSS", "HTML"].map((skill) => (
            <span 
              key={skill}
              className="px-2 py-0.5"
              style={{
                background: "#ffffcc",
                border: "1px solid #808080"
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-2 flex items-center gap-1">
          <span>📧</span> Contact
        </h3>
        <div className="space-y-1">
          <p><span className="text-gray-500">Email:</span> developer@example.com</p>
          <p><span className="text-gray-500">GitHub:</span> github.com/developer</p>
          <p><span className="text-gray-500">Location:</span> Poland</p>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    {
      name: "3D Portfolio Website",
      description: "Interactive 3D environment built with React Three Fiber",
      tech: ["React", "Three.js", "TypeScript"],
      year: "2024"
    },
    {
      name: "E-commerce Platform",
      description: "Full-stack online store with payment integration",
      tech: ["Next.js", "Stripe", "PostgreSQL"],
      year: "2023"
    },
    {
      name: "Task Management App",
      description: "Collaborative project management tool",
      tech: ["React", "Node.js", "MongoDB"],
      year: "2023"
    },
    {
      name: "Weather Dashboard",
      description: "Real-time weather data visualization",
      tech: ["Vue.js", "D3.js", "API"],
      year: "2022"
    }
  ];

  return (
    <div className="text-xs">
      <h2 className="text-base font-bold mb-3 pb-1 border-b border-gray-300">
        Projects
      </h2>
      
      <div className="space-y-3">
        {projects.map((project, index) => (
          <div 
            key={index}
            className="p-2"
            style={{
              background: "#f5f5f5",
              border: "1px solid #808080"
            }}
          >
            <div className="flex items-start justify-between mb-1">
              <h3 className="font-bold flex items-center gap-1">
                <span>📄</span> {project.name}
              </h3>
              <span className="text-gray-500">{project.year}</span>
            </div>
            <p className="text-gray-600 mb-2">{project.description}</p>
            <div className="flex gap-1 flex-wrap">
              {project.tech.map((t) => (
                <span 
                  key={t}
                  className="px-1 text-xs"
                  style={{
                    background: "#e0e0e0",
                    border: "1px solid #a0a0a0"
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Company Inc.",
      period: "2022 - Present",
      description: "Leading frontend development team, implementing modern React applications"
    },
    {
      title: "Full Stack Developer",
      company: "Startup Studio",
      period: "2020 - 2022",
      description: "Built and maintained multiple web applications from scratch"
    },
    {
      title: "Junior Developer",
      company: "Digital Agency",
      period: "2018 - 2020",
      description: "Developed responsive websites and learned modern web technologies"
    }
  ];

  return (
    <div className="text-xs">
      <h2 className="text-base font-bold mb-3 pb-1 border-b border-gray-300">
        Work Experience
      </h2>
      
      <div className="space-y-3">
        {experiences.map((exp, index) => (
          <div 
            key={index}
            className="p-2 relative"
            style={{
              background: index === 0 ? "#ffffdd" : "#f5f5f5",
              border: "1px solid #808080"
            }}
          >
            {index === 0 && (
              <span 
                className="absolute -top-2 -right-2 px-1 text-xs"
                style={{
                  background: "#00aa00",
                  color: "white",
                  border: "1px solid #008800"
                }}
              >
                Current
              </span>
            )}
            <h3 className="font-bold flex items-center gap-1">
              <span>💼</span> {exp.title}
            </h3>
            <p className="text-blue-800 font-medium">{exp.company}</p>
            <p className="text-gray-500 mb-1">{exp.period}</p>
            <p className="text-gray-600">{exp.description}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 p-2" style={{ background: "#e8e8e8", border: "1px solid #808080" }}>
        <h3 className="font-bold mb-2 flex items-center gap-1">
          <span>🎓</span> Education
        </h3>
        <p><strong>Computer Science, B.Sc.</strong></p>
        <p className="text-gray-600">University of Technology, 2018</p>
      </div>
    </div>
  );
}
