import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { SignupComponent } from "./components/signup/signup.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthGuard } from "./guards/auth.guard";
import { UserInfoComponent } from "./components/user-info/user-info.component";
import { ChatBotComponent } from "./components/chatbot/chatbot.component";

const routes: Routes = [
  { path: "", redirectTo: "/home", pathMatch: "full" }, // Redirect to home by default
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
  { path: "user-info", component: UserInfoComponent, canActivate: [AuthGuard] }, // Protected route
  { path: "chatbot", component: ChatBotComponent, canActivate: [AuthGuard] }, // Protected route for chatbot
  { path: "**", redirectTo: "/home" }, // Wildcard route (404 handling)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
