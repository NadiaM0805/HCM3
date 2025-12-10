export interface KeyResult {
  id: string;
  description: string;
}

export interface Objective {
  id: string;
  title: string;
  keyResults: KeyResult[];
}

