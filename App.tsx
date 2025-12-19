
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { MobileNav } from './components/MobileNav';
import { Dashboard } from './components/Dashboard';
import { Builder } from './components/Builder';
import { Analytics } from './components/Analytics';
import { Coach } from './components/Coach';
import { AppView, UserProfile, Project } from './types';

const INITIAL_PROFILE: UserProfile = {
  name: "Alex Developer",
  role: "Fullstack Engineer",
  bio: "Passionate about building scalable web applications and AI-driven tools.",
  skills: [
    { name: "React", level: 90, category: "Frontend" },
    { name: "TypeScript", level: 85, category: "Frontend" },
    { name: "Node.js", level: 80, category: "Backend" },
    { name: "Tailwind", level: 95, category: "Frontend" },
    { name: "Python", level: 70, category: "Backend" },
  ],
  experience: "5+ years in modern web development"
};

const INITIAL_PROJECTS: Project[] = [
  { id: '1', title: 'NeuralTask', description: 'AI-powered task management system.', tech: ['React', 'Gemini API', 'PostgreSQL'] },
  { id: '2', title: 'EcoTrack', description: 'Sustainability monitoring dashboard.', tech: ['Vue', 'D3.js', 'Firebase'] }
];

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('dashboard');
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);

  return (
    <div className="flex h-screen bg-[#0f172a] text-slate-200 overflow-hidden flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <Sidebar currentView={view} setView={setView} />
      
      <main className="flex-1 overflow-y-auto relative pb-20 md:pb-0">
        <header className="sticky top-0 z-20 bg-[#0f172a]/90 backdrop-blur-md border-b border-slate-800 p-4 flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
              DevBoost AI
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-xs md:text-sm font-medium text-slate-400 hidden xs:block">
              <span className="text-white">{profile.name}</span>
            </div>
            <img 
              src={`https://picsum.photos/seed/${profile.name}/32/32`} 
              className="w-8 h-8 rounded-full border border-slate-700 shadow-md"
              alt="Avatar"
            />
          </div>
        </header>

        <div className="max-w-7xl mx-auto p-4 md:p-10">
          {view === 'dashboard' && <Dashboard profile={profile} projects={projects} />}
          {view === 'builder' && <Builder profile={profile} projects={projects} setProfile={setProfile} setProjects={setProjects} />}
          {view === 'analytics' && <Analytics profile={profile} />}
          {view === 'coach' && <Coach profile={profile} />}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav currentView={view} setView={setView} />
    </div>
  );
};

export default App;
