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

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Redirect to home by default
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "user-info", component: UserInfoComponent, canActivate: [AuthGuard] }, // Protected route
  { path: "chatbot", component: ChatBotComponent, canActivate: [AuthGuard] }, // Protected route for chatbot
  {
    path: "services",
    component: ServicesComponent,
    canActivate: [AuthGuard], // Protected route for services
    children: [
      { path: "user-info", component: UserInfoComponent },
      { path: "chatbot", component: ChatBotComponent },
      { path: "meal-detection", component: MealDetectionComponent },
    ],
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
