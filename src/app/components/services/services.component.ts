import { Component, OnInit } from "@angular/core";
import { IServiceVM } from "../../vms/Iservice.vm";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { IUserVM } from "../../vms/Iuser.vm";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-services",
  standalone: false,
  templateUrl: "./services.component.html",
  styleUrl: "./services.component.css",
})
export class ServicesComponent implements OnInit {
  services: IServiceVM[];
  isChildRoute!: boolean;
  queryParams!: any;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _userService: UserService,
    private _authService: AuthService
  ) {
    this.services = [
      {
        id: 1,
        icon: "fa-solid fa-robot",
        title: "AI Chatbot",
        description: "AI-powered chatbot for personalized nutrition advice.",
        features: [
          "Natural language processing",
          "Personalized recommendations",
          "24/7 availability",
        ],
        link: "/chatbot",
      },
      {
        id: 2,
        icon: "fa-solid fa-calculator",
        title: "Calories Calculation System",
        description: "Accurate calorie tracker with detailed nutrition info.",
        features: [
          "Custom goal setting",
          "Macro & micronutrient tracking",
          "Progress visualization",
        ],
        link: "/user-info",
      },
      {
        id: 3,
        icon: "fa-solid fa-camera",
        title: "Meal Recognition",
        description: "Image Recognition and Detection Model for fast results.",
        features: [
          "Instant food identification",
          "Portion size estimation",
          "Multiple food detection",
        ],
        link: "/meal-detection",
      },
      {
        id: 4,
        icon: "fa-solid fa-utensils",
        title: "Nutrition In-Detail",
        description:
          "Detailed nutrition insights on vitamins, minerals, and key nutrients for better health.",
        features: [
          "Detailed nutrient profiles",
          "Dietary deficiency alerts",
          "Personalized recommendations",
        ],
        link: "/nutrition",
      },
    ];
  }
  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      const currentRoute = this.activatedRoute.snapshot.firstChild;
      this.isChildRoute =
        currentRoute !== null && currentRoute.routeConfig !== null;
    });
    this._authService.getAccessTokenObservable().subscribe((token) => {
      if (token) {
        this._userService.getUserInfo().subscribe((response) => {
          if (response.data) {
            this.queryParams = { update: 1 };
          }
        });
      }else{
        return;
      }
    });
  }
}
