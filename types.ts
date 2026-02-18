
export enum AppView {
  DASHBOARD = 'dashboard',
  GITHUB_SHIELD = 'github_shield',
  ARCADE = 'arcade',
  SETTINGS = 'settings'
}

export interface FocusSession {
  isActive: boolean;
  startTime: number | null;
  duration: number; // in seconds
  timeLeft: number;
}

export interface GitHubSummary {
  repoName: string;
  summary: string;
  keyIssues: string[];
  recentActivity: string;
}

export enum GameType {
  SNAKE = 'snake',
  MEMORY = 'memory',
  GEMINI_QUEST = 'gemini_quest'
}
