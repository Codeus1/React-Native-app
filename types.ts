
export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
}

export interface UserProfile {
  name: string;
  role: string;
  bio: string;
  skills: Array<{ name: string; level: number; category: string }>;
  experience: string;
}

export interface AIResponse {
  readme: string;
  suggestions: string[];
  summary: string;
}

export type AppView = 'dashboard' | 'builder' | 'analytics' | 'coach';
