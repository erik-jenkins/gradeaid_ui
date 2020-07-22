export interface Assignment {
  id: string;
  name: string;
  categoryIds: string[];
  maxScore: number;
  useMasteryScoring: boolean;
  masteryPoints: number;
}
