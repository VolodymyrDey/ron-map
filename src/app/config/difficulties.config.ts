export interface Difficulty {
  id: string;
  name: string;
  color: string;
}

export const DIFFICULTIES: Difficulty[] = [
  { id: 'casual', name: 'Casual', color: '#4CAF50' },
  { id: 'standard', name: 'Standard', color: '#FF9800' },
  { id: 'hard', name: 'Hard', color: '#F44336' }
];
