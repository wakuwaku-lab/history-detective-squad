export type Era = {
  id: string;
  name: string;
  period: string;
  description: string;
  color: string;
  icon: string;
  unlocked: boolean;
  stars: number;
  cases: Case[];
};

export type Case = {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: Question[];
  reward: number;
};

export type Question = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export type Character = {
  id: string;
  name: string;
  title: string;
  era: string;
  description: string;
  skills: string[];
  image: string;
};

export type DetectiveLevel = 'apprentice' | 'junior' | 'senior' | 'master' | 'legend';

export type Detective = {
  name: string;
  level: DetectiveLevel;
  exp: number;
  expToNext: number;
  badge: string;
  cases: string[];
  unlockedEras: string[];
  score: number;
};

export type GameState = {
  detective: Detective;
  currentEra: string | null;
  currentCase: string | null;
  isPlaying: boolean;
  score: number;
};
