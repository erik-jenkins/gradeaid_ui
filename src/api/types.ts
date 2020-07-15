export interface Crit {
  id: number;
  text: string;
  pointValue: number;
  index: number;
}

export interface Category {
  id: number;
  name: string;
  crits: Crit[];
}

export interface Assignment {
  id: number;
  name: string;
  categories: Category[];
}

export interface Course {
  id: number;
  name: string;
  assignments: Assignment[];
}
