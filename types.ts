
export interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  bio: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
}

export interface BriefResult {
  slogan: string;
  visualDirection: string;
  strategy: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
