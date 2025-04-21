import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { ChatBotComponent } from "./components/chatbot/chatbot.component";
import { ServicesComponent } from "./components/services/services.component";
import { MealDetectionComponent } from "./components/meal-detection/meal-detection.component";
import { ContactComponent } from "./components/contact/contact.component";
import { AboutComponent } from "./components/about/about.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { NutritionComponent } from "./components/nutrition/nutrition.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Redirect to home by default
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "user-info", component: UserInfoComponent, canActivate: [AuthGuard] }, // Protected route
  { path: "chatbot", component: ChatBotComponent, canActivate: [AuthGuard] }, // Protected route for chatbot
  {
    path: "services",
    component: ServicesComponent, // Protected route for services
    children: [
      {
        path: "user-info",
        component: UserInfoComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "chatbot",
        component: ChatBotComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "meal-detection",
        component: MealDetectionComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "nutrition",
        component: NutritionComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  {
    path: "profile",
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  { path: "contact", component: ContactComponent },
  { path: "about", component: AboutComponent },
  { path: "**", redirectTo: "/home" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
