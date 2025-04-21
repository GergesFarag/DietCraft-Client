// nutrition.component.ts
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { InutritionInfoVM } from "../../vms/InutritionInfo.vm";
import { NutritionInfoService } from "../../services/nutrition-info.service";
import { ActivatedRoute } from "@angular/router";
@Component({
  selector: "app-nutrition",
  templateUrl: "./nutrition.component.html",
  standalone: false,
  styleUrl: "./nutrition.component.css",
  animations: [
    trigger("fadeIn", [
      state("void", style({ opacity: 0, transform: "translateY(20px)" })),
      transition(":enter", [
        animate(
          "0.5s ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
    ]),
    trigger("pulseAnimation", [
      state(
        "healthy",
        style({
          backgroundColor: "#10bc69",
          transform: "scale(1)",
        })
      ),
      state(
        "unhealthy",
        style({
          backgroundColor: "#ff4b4b",
          transform: "scale(1)",
        })
      ),
      transition("void => healthy", [
        style({ transform: "scale(0.8)", backgroundColor: "#10bc69" }),
        animate("0.6s ease-in-out", style({ transform: "scale(1.1)" })),
        animate("0.3s ease-out", style({ transform: "scale(1)" })),
      ]),
      transition("void => unhealthy", [
        style({ transform: "scale(0.8)", backgroundColor: "#ff4b4b" }),
        animate("0.6s ease-in-out", style({ transform: "scale(1.1)" })),
        animate("0.3s ease-out", style({ transform: "scale(1)" })),
      ]),
    ]),
    trigger("chartAnimation", [
      transition(":enter", [
        style({ opacity: 0, transform: "scale(0.7)" }),
        animate(
          "0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
          style({ opacity: 1, transform: "scale(1)" })
        ),
      ]),
    ]),
  ],
})
export class NutritionComponent implements OnInit {
  searchControl = new FormControl("");
  searchResults: string[] = [];
  warningMessage = "";
  selectedFood: InutritionInfoVM | null = null;
  showHealthStatus = false;
  constructor(
    private _nutritionInfoService: NutritionInfoService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if(params.get("searchItem")){
        this.searchControl.setValue(params.get("searchItem"));
        this.searchFood();
      }
    })
  }

  searchFood() {
    if (this.searchControl.value) {
      const query = this.searchControl.value.trim().toLowerCase();
      this._nutritionInfoService.getNutritionInfo(query).subscribe({
        next: (res) => {
          this.selectedFood = {
            name: res.data.name,
            calories: res.data.calories,
            protein: res.data.protein_g,
            carbs: res.data.carbohydrates_total_g,
            fiber: res.data.fiber_g,
            sodium: res.data.sodium_mg,
            fat: res.data.fat_total_g,
            saturatedFat: res.data.fat_saturated_g,
            isHealthy: res.data.fat_saturated_g <= 3.0 && res.data.fat_total_g <= 3.5, // Threshold for health based on saturated fat per 100g
          };
          // this.selectFood(this.selectedFood.name);
          this.showHealthStatus = true;
        },
        error: (err) => {
          console.log("Error fetching data from nutrition service", err);
        },
      });
    } else {
      this.warningMessage = "Please provide valid food name .";
    }
  }

  selectFood(): void {
    if (this.selectedFood) {
      const food = this.selectedFood;
      this.selectedFood = food;
      this.searchControl.setValue(food.name, { emitEvent: false });
      this.searchResults = [];

      // Reset animation trigger
      this.showHealthStatus = false;
      setTimeout(() => {
        this.showHealthStatus = true;
      }, 100);
    }
  }

  getHealthStatusClass(): string {
    if (!this.selectedFood) return "";
    return this.selectedFood.isHealthy ? "healthy" : "unhealthy";
  }

  getHealthStatusText(): string {
    if (!this.selectedFood) return "";
    return this.selectedFood.isHealthy
      ? "Healthy Choice!"
      : "High in Fats";
  }

  getNutrientPercentage(nutrient: number, max: number): number {
    return Math.min(100, (nutrient / max) * 100);
  }
}
