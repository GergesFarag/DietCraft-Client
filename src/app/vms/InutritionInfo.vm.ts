import { INutrients } from "../models/INutrients";

export interface InutritionInfoVM extends Partial<INutrients>{
   name: string;
   calories: number;
   protein: number;
   carbs: number;
   fiber: number;
   sugar?: number;
   fat: number;
   sodium?:number;
   saturatedFat: number;
   isHealthy?: boolean;
}