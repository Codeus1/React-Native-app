
import React from 'react';
import { UserProfile } from '../types';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, Tooltip, Cell
} from 'recharts';

interface AnalyticsProps {
  profile: UserProfile;
}

export const Analytics: React.FC<AnalyticsProps> = ({ profile }) => {
  const COLORS = ['#6366f1', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Skill Insights</h1>
        <p className="text-slate-400">Quantitative visualization of your professional expertise.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold mb-8">Skill Distribution</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={profile.skills}>
                <PolarGrid stroke="#334155" />
                <PolarAngleAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
                <Radar
                  name="Proficiency"
                  dataKey="level"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800/40 p-8 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-bold mb-8">Proficiency Levels</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={profile.skills} layout="vertical" margin={{ left: 40 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  stroke="#94a3b8" 
                  fontSize={12} 
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px' }}
                />
                <Bar dataKey="level" radius={[0, 4, 4, 0]} barSize={20}>
                  {profile.skills.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-indigo-900/40 to-slate-900/40 p-8 rounded-2xl border border-indigo-500/20">
        <h3 className="text-lg font-bold mb-4">Strategic Recommendation</h3>
        <p className="text-slate-300 leading-relaxed mb-6">
          Based on your current data, your **React** and **Tailwind** scores are in the top 5% of candidate profiles. 
          To reach Senior Staff level, focus on increasing your **Node.js** architecture depth and **System Design** capabilities.
        </p>
        <button className="px-6 py-2 bg-indigo-600 rounded-lg text-sm font-bold">Launch Learning Path</button>
      </div>
    </div>
  );
};
