import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Detective, GameState } from '@/types';

interface AppStore extends GameState {
  setDetective: (detective: Partial<Detective>) => void;
  addExp: (exp: number) => void;
  unlockEra: (eraId: string) => void;
  completeCase: (caseId: string, stars: number) => void;
  setCurrentEra: (eraId: string | null) => void;
  setCurrentCase: (caseId: string | null) => void;
  setPlaying: (playing: boolean) => void;
  addScore: (score: number) => void;
  reset: () => void;
}

const initialDetective: Detective = {
  name: '小探',
  level: 'apprentice',
  exp: 0,
  expToNext: 100,
  badge: '🔍',
  cases: [],
  unlockedEras: ['xianqin'],
  score: 0,
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      detective: initialDetective,
      currentEra: null,
      currentCase: null,
      isPlaying: false,
      score: 0,

      setDetective: (detective) => set((state) => ({
        detective: { ...state.detective, ...detective },
      })),

      addExp: (exp) => set((state) => {
        const newExp = state.detective.exp + exp;
        const expToNext = state.detective.expToNext;
        
        if (newExp >= expToNext) {
          const levels: Detective['level'][] = ['apprentice', 'junior', 'senior', 'master', 'legend'];
          const currentIndex = levels.indexOf(state.detective.level);
          const newLevel = levels[Math.min(currentIndex + 1, levels.length - 1)];
          const badges = ['🔍', '🗺️', '📜', '👑', '⭐'];
          
          return {
            detective: {
              ...state.detective,
              level: newLevel,
              exp: newExp - expToNext,
              expToNext: Math.floor(expToNext * 1.5),
              badge: badges[Math.min(currentIndex + 1, badges.length - 1)],
            },
          };
        }
        
        return { detective: { ...state.detective, exp: newExp } };
      }),

      unlockEra: (eraId) => set((state) => ({
        detective: {
          ...state.detective,
          unlockedEras: [...new Set([...state.detective.unlockedEras, eraId])],
        },
      })),

      completeCase: (caseId, stars) => set((state) => ({
        detective: {
          ...state.detective,
          cases: [...new Set([...state.detective.cases, caseId])],
        },
        score: state.score + stars * 10,
      })),

      setCurrentEra: (eraId) => set({ currentEra: eraId }),
      setCurrentCase: (caseId) => set({ currentCase: caseId }),
      setPlaying: (playing) => set({ isPlaying: playing }),
      addScore: (score) => set((state) => ({ score: state.score + score })),

      reset: () => set({
        detective: initialDetective,
        currentEra: null,
        currentCase: null,
        isPlaying: false,
        score: 0,
      }),
    }),
    {
      name: 'history-detective-storage',
    }
  )
);
