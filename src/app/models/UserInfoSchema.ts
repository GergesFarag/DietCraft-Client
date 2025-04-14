export enum Goals {
  'Lose Weight' = 1,
  'Maintain Weight' = 2,
  'Gain Weight' = 3,
}
export interface UserInfoSchema {
  age: { type: Number; required: true };
  weight: { type: Number; required: true };
  height: { type: Number; required: true };
  gender: { type: Boolean; default: true };
  activityLevel:  string , required: true ;
  goal: { type: Goals; required: true };
  calories?: Number | null;
}
