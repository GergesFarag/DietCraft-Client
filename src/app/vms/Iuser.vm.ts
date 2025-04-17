import { IUser } from "../models/IUser";

export interface IUserVM extends Partial<IUser>{
    profileImage?: string | ArrayBuffer | null;
    joinDate?: Date;
    currentWeight?: number;
    targetWeight?: number;
    height?: number;
    dailyCalories?: number;
    activityLevel?: string;
    restingHeartRate?: number;
    averageSleep?: number;
    dailySteps?: number;
    nutrition?: {
        protein: number;
        carbs: number;
        fat: number;
    };
    recentWorkouts?: Array<{
        date: Date;
        type: string;
        duration: number; // in minutes
        caloriesBurned: number; // in kcal
    }>;
}