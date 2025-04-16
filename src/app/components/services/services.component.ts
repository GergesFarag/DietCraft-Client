import { Component, OnInit } from "@angular/core";
import { IServiceVM } from "../../vms/Iservice.vm";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-services",
  standalone: false,
  templateUrl: "./services.component.html",
  styleUrl: "./services.component.css",
})
export class ServicesComponent implements OnInit {
  services: IServiceVM[];
  isChildRoute!:boolean;
  constructor(private router:Router , private activatedRoute:ActivatedRoute) {
    this.services = [
      {
        id: 1,
        icon: "fa-solid fa-robot",
        title: "AI Chatbot",
        description:
          "Intelligent conversational assistant that provides personalized nutrition advice, meal planning, and answers health-related questions in real-time.",
        features: [
          "Natural language processing",
          "Personalized recommendations",
          "24/7 availability",
          "Continuous learning",
        ],
        link:"/chatbot"
      },
      {
        id: 2,
        icon: "fa-solid fa-calculator",
        title: "Calories Calculation System",
        description:
          "Precise calorie tracking system that helps users monitor daily intake and achieve their health goals with detailed nutritional breakdowns.",
        features: [
          "Custom goal setting",
          "Macro & micronutrient tracking",
          "Progress visualization",
          "Diet plan integration",
        ],
        link:"/user-info"
      },
      {
        id: 3,
        icon: "fa-solid fa-camera",
        title: "Meal Recognition",
        description:
          "Advanced image recognition technology that identifies foods from photos, making meal logging quick and effortless for busy lifestyles.",
        features: [
          "Instant food identification",
          "Portion size estimation",
          "Multiple food detection",
          "Restaurant menu scanning",
        ],
        link:"/meal-detection"
      },
      {
        id: 4,
        icon: "fa-solid fa-utensils",
        title: "Nutrition In-Detail",
        description:
          "Comprehensive nutrition analysis providing in-depth insights about vitamins, minerals, and other essential nutrients for optimal health management.",
        features: [
          "Detailed nutrient profiles",
          "Dietary deficiency alerts",
          "Personalized recommendations",
          "Scientific insights",
        ],
        link:"/nutrition"
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      const currentRoute = this.activatedRoute.snapshot.firstChild;
      this.isChildRoute = currentRoute !== null && currentRoute.routeConfig !== null;
    })
  }
}
