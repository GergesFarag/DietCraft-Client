import { Component } from "@angular/core";

@Component({
  selector: "app-features",
  standalone: false,
  templateUrl: "./features.component.html",
  styleUrl: "./features.component.css",
})
export class FeaturesComponent {
  featuredServices = [
    {
      title: "Diet tracking",
      details:
        "Healthy meal plans , Calorie calculation , Home workout routines.",
      icon: "bi-activity",
      link: "/services/user-info"
    },
    {
      title: "Chatbot assistant",
      details:
        "Assist you for any nutrition questions , food details and stories.",
      icon: "bi-robot",
      link: "/services/chatbot",
    },
    {
      title: "AI-based meal recognition",
      details: " Just pick up your camera and know how healthy your food.",
      icon: "bi-image",
      link: "/services/meal-detection",
    },
  ];
}
