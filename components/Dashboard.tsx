
import React from 'react';
import { UserProfile, Project } from '../types';

interface DashboardProps {
  profile: UserProfile;
  projects: Project[];
}

export const Dashboard: React.FC<DashboardProps> = ({ profile, projects }) => {
  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Portfolio Dashboard</h1>
        <p className="text-sm md:text-base text-slate-400">Optimize your professional presence with AI-driven insights.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="bg-slate-800/40 p-5 md:p-6 rounded-2xl border border-slate-700/50 hover:border-indigo-500/50 transition-colors">
          <div className="text-slate-400 text-xs md:text-sm font-medium mb-1">Total Projects</div>
          <div className="text-3xl md:text-4xl font-bold text-white">{projects.length}</div>
          <div className="mt-4 text-[10px] md:text-xs text-emerald-400 flex items-center gap-1">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
            Active & Verified
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 md:p-6 rounded-2xl border border-slate-700/50 hover:border-emerald-500/50 transition-colors">
          <div className="text-slate-400 text-xs md:text-sm font-medium mb-1">Skill Score</div>
          <div className="text-3xl md:text-4xl font-bold text-white">84%</div>
          <div className="mt-4 w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: '84%' }}></div>
          </div>
        </div>

        <div className="bg-slate-800/40 p-5 md:p-6 rounded-2xl border border-slate-700/50 hover:border-amber-500/50 transition-colors sm:col-span-2 lg:col-span-1">
          <div className="text-slate-400 text-xs md:text-sm font-medium mb-1">Career Readiness</div>
          <div className="text-3xl md:text-4xl font-bold text-white">High</div>
          <div className="mt-4 text-[10px] md:text-xs text-amber-400 uppercase font-bold tracking-wider">Next step: Update LinkedIn</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 overflow-hidden">
          <div className="p-4 md:p-6 border-b border-slate-700/50 flex justify-between items-center">
            <h2 className="text-base md:text-lg font-bold uppercase tracking-tight">Featured Projects</h2>
          </div>
          <div className="divide-y divide-slate-700/50">
            {projects.map((project) => (
              <div key={project.id} className="p-4 md:p-6 flex items-start gap-4 hover:bg-slate-800/60 transition-colors cursor-pointer">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-700 rounded-lg flex items-center justify-center text-lg md:text-xl flex-shrink-0">
                  {project.title[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-white text-sm md:text-base truncate">{project.title}</h3>
                  <p className="text-xs md:text-sm text-slate-400 line-clamp-1">{project.description}</p>
                </div>
                <svg className="w-5 h-5 text-slate-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/40 rounded-2xl border border-slate-700/50 p-5 md:p-6">
          <h2 className="text-base md:text-lg font-bold mb-6 uppercase tracking-tight">Profile Snapshot</h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <img 
                src={`https://picsum.photos/seed/${profile.name}/64/64`} 
                className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-slate-700 shadow-xl" 
                alt="Profile" 
              />
              <div className="min-w-0">
                <div className="text-lg md:text-xl font-bold text-white truncate">{profile.name}</div>
                <div className="text-indigo-400 text-xs md:text-sm font-medium">{profile.role}</div>
              </div>
            </div>
            
            <div className="bg-slate-900/50 rounded-xl p-4 border border-slate-700/30">
              <p className="text-xs md:text-sm text-slate-300 leading-relaxed italic">
                "{profile.bio}"
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="p-3 bg-indigo-600/10 rounded-lg border border-indigo-600/20 text-center">
                <div className="text-[9px] md:text-xs text-indigo-400 font-bold mb-1 uppercase tracking-widest">FOCUS</div>
                <div className="text-xs md:text-sm font-semibold truncate">Web Scale</div>
              </div>
              <div className="p-3 bg-emerald-600/10 rounded-lg border border-emerald-600/20 text-center">
                <div className="text-[9px] md:text-xs text-emerald-400 font-bold mb-1 uppercase tracking-widest">STATUS</div>
                <div className="text-xs md:text-sm font-semibold truncate">Hiring</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
