import { Component } from "@angular/core";

@Component({
  selector: "app-about",
  standalone: false,
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent {
  aboutInfo = {
    title: "DIET CRAFT",
    motivation:
      "Diet Craft simplifies healthy eating by offering a platform with food alternatives and personalized recommendations based on nutritional values.",
    objectives: [
      "Create smart diet plans.",
      "Promote healthy lifestyle basics.",
      "Categorize foods by nutrition.",
      "Search foods by nutrients.",
    ],
    conclusion:
      "Whether your goal is weight loss, more energy, or better health, we’re here to help.",
  };
  milestones: { year: number; description: string }[] = [
    { year: 2010, description: "Founded with a vision for innovation." },
    { year: 2015, description: "Released our main product." },
    { year: 2020, description: "Entered global markets." },
  ];
}
