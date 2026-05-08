"use client";

import { useAppStore } from "@/lib/store";

export function MonitorPortfolioContent() {
  const { portfolioSection, setPortfolioSection, closePortfolio } = useAppStore();

  return (
    <div
      className="w-full h-full flex flex-col"
      style={{
        fontFamily: '"MS Sans Serif", Tahoma, sans-serif',
        fontSize: "11px",
        background: "#008080",
        color: "white",
      }}
    >
      {/* Top toolbar - fullscreen app style */}
      <div
        className="flex items-center justify-between px-2 py-1"
        style={{
          background: "#000080",
          borderBottom: "2px solid #c0c0c0",
        }}
      >
        <span className="font-bold">My Portfolio</span>
        <button
          onClick={closePortfolio}
          className="px-2 py-0.5 text-xs"
          style={{
            background: "#c0c0c0",
            color: "black",
            border: "1px solid",
            borderColor: "#fff #808080 #808080 #fff",
          }}
        >
          Close [X]
        </button>
      </div>

      {/* Tab bar */}
      <div
        className="flex"
        style={{ background: "#c0c0c0", borderBottom: "1px solid #808080" }}
      >
        <TabButton
          active={portfolioSection === "about"}
          onClick={() => setPortfolioSection("about")}
        >
          About Me
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

      {/* Content area - fills rest of screen */}
      <div
        className="flex-1 overflow-auto p-2"
        style={{
          background: "white",
          color: "black",
        }}
      >
        {portfolioSection === "about" && <AboutSection />}
        {portfolioSection === "projects" && <ProjectsSection />}
        {portfolioSection === "experience" && <ExperienceSection />}
      </div>

      {/* Bottom status bar */}
      <div
        className="px-2 py-0.5 text-xs"
        style={{
          background: "#c0c0c0",
          color: "#404040",
          borderTop: "1px solid #808080",
        }}
      >
        Click tabs to navigate | Press Close to exit
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
      className="px-3 py-1 text-xs font-medium"
      style={{
        background: active ? "white" : "#c0c0c0",
        color: "black",
        borderTop: active ? "2px solid #000080" : "none",
        borderLeft: "1px solid #fff",
        borderRight: "1px solid #808080",
        marginTop: active ? 0 : 2,
      }}
    >
      {children}
    </button>
  );
}

function AboutSection() {
  return (
    <div className="text-xs leading-relaxed">
      <h2 className="font-bold text-sm mb-2 text-blue-800 border-b border-gray-300 pb-1">
        About Me
      </h2>

      <div className="mb-2">
        <span className="font-bold">Developer Name</span>
        <span className="text-gray-500 ml-1">- Full Stack Developer</span>
      </div>

      <p className="mb-2 text-gray-700">
        Welcome to my portfolio! I build web apps with modern technologies while
        appreciating the aesthetics of computing history.
      </p>

      <div className="mb-2">
        <span className="font-bold">Skills:</span>
        <div className="flex flex-wrap gap-1 mt-1">
          {["JavaScript", "TypeScript", "React", "Next.js", "Node.js", "Three.js"].map(
            (s) => (
              <span
                key={s}
                className="px-1 py-0.5 bg-yellow-100 border border-gray-400"
                style={{ fontSize: "10px" }}
              >
                {s}
              </span>
            )
          )}
        </div>
      </div>

      <div>
        <span className="font-bold">Contact:</span>
        <div className="mt-1 text-gray-600" style={{ fontSize: "10px" }}>
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
    { name: "3D Portfolio", desc: "Interactive 3D environment", year: "2024" },
    { name: "E-commerce", desc: "Full-stack store with Stripe", year: "2023" },
    { name: "Task Manager", desc: "Collaborative project tool", year: "2023" },
    { name: "Weather App", desc: "Real-time visualization", year: "2022" },
  ];

  return (
    <div className="text-xs leading-relaxed">
      <h2 className="font-bold text-sm mb-2 text-blue-800 border-b border-gray-300 pb-1">
        Projects
      </h2>

      <div className="space-y-1.5">
        {projects.map((p, i) => (
          <div
            key={i}
            className="p-1.5 bg-gray-50 border border-gray-300"
          >
            <div className="flex justify-between">
              <span className="font-bold">{p.name}</span>
              <span className="text-gray-500">{p.year}</span>
            </div>
            <p className="text-gray-600" style={{ fontSize: "10px" }}>
              {p.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function ExperienceSection() {
  const experiences = [
    { title: "Senior Frontend Dev", company: "Tech Company", period: "2022-Now" },
    { title: "Full Stack Dev", company: "Startup Studio", period: "2020-2022" },
    { title: "Junior Developer", company: "Digital Agency", period: "2018-2020" },
  ];

  return (
    <div className="text-xs leading-relaxed">
      <h2 className="font-bold text-sm mb-2 text-blue-800 border-b border-gray-300 pb-1">
        Experience
      </h2>

      <div className="space-y-1.5">
        {experiences.map((e, i) => (
          <div
            key={i}
            className={`p-1.5 border border-gray-300 ${i === 0 ? "bg-yellow-50" : "bg-gray-50"}`}
          >
            <div className="font-bold">{e.title}</div>
            <div className="text-blue-700" style={{ fontSize: "10px" }}>
              {e.company}
            </div>
            <div className="text-gray-500" style={{ fontSize: "10px" }}>
              {e.period}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-2 p-1.5 bg-gray-100 border border-gray-300">
        <div className="font-bold">Education</div>
        <div style={{ fontSize: "10px" }}>
          Computer Science, B.Sc. - University, 2018
        </div>
      </div>
    </div>
  );
}
