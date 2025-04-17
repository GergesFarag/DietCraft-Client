export enum Goals {
  "Lose Weight" = 0,
  "Maintain Weight" = 1,
  "Gain Weight" = 2,
}
export interface UserInfoSchema {
  age: number;
  weight: number;
  height: number;
  gender: boolean;
  activityLevel: string;
  goal: Goals;
  calories?: number | null;
  targetWeight?: number;
}
