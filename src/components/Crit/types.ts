export interface Crit {
  id: string;
  text: string;
  isComment: boolean;
  pointValue: number;
  occurs: number;
}

export const getDndId = (crit: Crit): string => `crit-${crit.id}`;
export const stripDndId = (dndId: string): string => dndId.replace('crit-', '');
