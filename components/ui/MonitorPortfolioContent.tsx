"use client";

import { useAppStore } from "@/lib/store";

export function MonitorPortfolioContent() {
  const { portfolioSection, setPortfolioSection, closePortfolio } = useAppStore();

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
        fontSize: "14px",
        background: "#c0c0c0",
        color: "black",
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-2 py-1 select-none"
        style={{
          background: "linear-gradient(90deg, #000080, #1084d0)",
          color: "white",
        }}
      >
        <span className="font-bold text-sm">Portfolio - Internet Explorer</span>
        <button
          onClick={closePortfolio}
          className="w-5 h-5 flex items-center justify-center text-sm font-bold"
          style={{
            background: "#c0c0c0",
            border: "2px solid",
            borderColor: "#fff #808080 #808080 #fff",
            lineHeight: 1,
          }}
        >
          X
        </button>
      </div>

      {/* Menu bar */}
      <div
        className="flex gap-4 px-2 py-1 text-sm"
        style={{ background: "#c0c0c0", borderBottom: "1px solid #808080" }}
      >
        <span><span className="underline">F</span>ile</span>
        <span><span className="underline">E</span>dit</span>
        <span><span className="underline">V</span>iew</span>
        <span><span className="underline">H</span>elp</span>
      </div>

      {/* Toolbar / Tab buttons */}
      <div
        className="flex gap-2 px-2 py-2"
        style={{ background: "#c0c0c0", borderBottom: "1px solid #808080" }}
      >
        <TabButton
          active={portfolioSection === "about"}
          onClick={() => setPortfolioSection("about")}
        >
          About
        </TabButton>
        <TabButton
          active={portfolioSection === "projects"}
          onClick={() => setPortfolioSection("projects")}
        >
          Projects
        </TabButton>
        <TabButton
          active={portfolioSection === "experience"}
          onClick={() => setPortfolioSection("experience")}
        >
          Experience
        </TabButton>
      </div>

      {/* Content area */}
      <div
        className="flex-1 overflow-auto p-3"
        style={{
          background: "white",
          border: "2px solid",
          borderColor: "#808080 #fff #fff #808080",
          margin: "4px",
        }}
      >
        {portfolioSection === "about" && <AboutSection />}
        {portfolioSection === "projects" && <ProjectsSection />}
        {portfolioSection === "experience" && <ExperienceSection />}
      </div>

      {/* Status bar */}
      <div
        className="px-2 py-1 text-sm"
        style={{
          background: "#c0c0c0",
          borderTop: "1px solid #808080",
          color: "#404040",
        }}
      >
        Ready
      </div>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-1 text-sm font-medium"
      style={{
        background: active ? "#000080" : "#c0c0c0",
        color: active ? "white" : "black",
        border: "2px solid",
        borderColor: active ? "#404040 #fff #fff #404040" : "#fff #404040 #404040 #fff",
      }}
    >
      {children}
    </button>
  );
}

function AboutSection() {
  return (
    <div className="text-sm leading-relaxed">
      <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-2">About Me</h2>
      
      <div className="mb-3">
        <span className="font-bold text-base">Developer Name</span>
        <span className="text-gray-500 ml-2">Full Stack Developer</span>
      </div>
      
      <p className="mb-3 text-gray-700">
        Welcome to my portfolio! I build web apps with modern technologies 
        while appreciating the aesthetics of computing history.
      </p>

      <div className="mb-3">
        <span className="font-bold">Skills:</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Three.js"].map((s) => (
            <span key={s} className="px-2 py-0.5 bg-yellow-100 border border-gray-400 text-sm">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div>
        <span className="font-bold">Contact:</span>
        <div className="mt-2 text-gray-600 space-y-1">
          <div>Email: developer@example.com</div>
          <div>GitHub: github.com/developer</div>
          <div>Location: Poland</div>
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const projects = [
    { name: "3D Portfolio Website", desc: "Interactive 3D environment with React Three Fiber", year: "2024" },
    { name: "E-commerce Platform", desc: "Full-stack online store with Stripe", year: "2023" },
    { name: "Task Management App", desc: "Collaborative project management tool", year: "2023" },
    { name: "Weather Dashboard", desc: "Real-time weather visualization", year: "2022" },
  ];

  return (
    <div className="text-sm leading-relaxed">
      <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-2">Projects</h2>
      
      <div className="space-y-3">
        {projects.map((p, i) => (
          <div key={i} className="p-2 bg-gray-100 border border-gray-400">
            <div className="flex justify-between items-center">
              <span className="font-bold">{p.name}</span>
              <span className="text-gray-500">{p.year}</span>
            </div>
            <p className="text-gray-600 mt-1">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const experiences = [
    { title: "Senior Frontend Developer", company: "Tech Company Inc.", period: "2022 - Present" },
    { title: "Full Stack Developer", company: "Startup Studio", period: "2020 - 2022" },
    { title: "Junior Developer", company: "Digital Agency", period: "2018 - 2020" },
  ];

  return (
    <div className="text-sm leading-relaxed">
      <h2 className="font-bold text-lg mb-3 border-b border-gray-300 pb-2">Experience</h2>
      
      <div className="space-y-3">
        {experiences.map((e, i) => (
          <div key={i} className={`p-2 border border-gray-400 ${i === 0 ? "bg-yellow-50" : "bg-gray-100"}`}>
            <div className="font-bold">{e.title}</div>
            <div className="text-blue-800">{e.company}</div>
            <div className="text-gray-500">{e.period}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 p-2 bg-gray-200 border border-gray-400">
        <div className="font-bold">Education</div>
        <div>Computer Science, B.Sc. - University of Technology, 2018</div>
      </div>
    </div>
  );
}
