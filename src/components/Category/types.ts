export interface Category {
  id: string;
  name: string;
  critIds: string[];
}

export const getDndId = (cat: Category): string => `category-${cat.id}`;
export const stripDndId = (dndId: string): string =>
  dndId.replace('category-', '');
