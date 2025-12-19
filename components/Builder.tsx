
import React, { useState } from 'react';
import { UserProfile, Project, AIResponse } from '../types';
import { generatePortfolioContent } from '../services/geminiService';

interface BuilderProps {
  profile: UserProfile;
  projects: Project[];
  setProfile: (p: UserProfile) => void;
  setProjects: (p: Project[]) => void;
}

export const Builder: React.FC<BuilderProps> = ({ profile, projects, setProfile, setProjects }) => {
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse | null>(null);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const result = await generatePortfolioContent(profile, projects);
      setAiResponse(result);
    } catch (error) {
      console.error(error);
      alert("Failed to generate content. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">AI Profile Builder</h1>
          <p className="text-slate-400">Generate a high-converting GitHub README using Gemini 3 Pro.</p>
        </div>
        <button 
          onClick={handleGenerate}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-500/20"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          )}
          {loading ? 'Thinking...' : 'Generate README'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="font-bold mb-4 text-slate-200 uppercase tracking-widest text-xs">Profile Inputs</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Role</label>
                <input 
                  value={profile.role} 
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Core Mission (Bio)</label>
                <textarea 
                  value={profile.bio} 
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none resize-none" 
                />
              </div>
            </div>
          </div>

          <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50">
            <h3 className="font-bold mb-4 text-slate-200 uppercase tracking-widest text-xs">AI Suggestions</h3>
            {aiResponse ? (
              <ul className="space-y-3">
                {aiResponse.suggestions.map((s, i) => (
                  <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                    <span className="text-indigo-400 font-bold">•</span>
                    {s}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-slate-500 italic">Generate to see personalized recruiter tips.</p>
            )}
          </div>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700/50 flex flex-col min-h-[400px]">
          <h3 className="font-bold mb-4 text-slate-200 uppercase tracking-widest text-xs">Markdown Preview</h3>
          <div className="flex-1 bg-slate-900/50 rounded-xl p-4 border border-slate-700/30 overflow-y-auto font-mono text-sm leading-relaxed text-indigo-300">
            {aiResponse ? (
              <pre className="whitespace-pre-wrap">{aiResponse.readme}</pre>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-slate-600 space-y-2">
                <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p>Your AI-generated README will appear here.</p>
              </div>
            )}
          </div>
          {aiResponse && (
            <button 
              onClick={() => navigator.clipboard.writeText(aiResponse.readme)}
              className="mt-4 w-full py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs font-bold uppercase transition-colors"
            >
              Copy to Clipboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
