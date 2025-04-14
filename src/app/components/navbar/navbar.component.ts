import { Component } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { IUserVM } from "../../vms/Iuser.vm";

@Component({
  selector: "app-navbar",
  standalone: false,
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  isActive = false;
  isLoggedIn = false;
  navLinks = [
    { label: "Home", url: "/home", state: "" },
    { label: "Services", url: "/services", state: "" },
    { label: "About", url: "/about", state: "" },
    { label: "Contact", url: "/contact", state: "" },
  ];

  constructor(
    private authService: AuthService,
    private router: Router,
    private _userService: UserService
  ) {
    this.authService.getAuthStatus().subscribe((status) => {
      this.isLoggedIn = status;
    });
  }

  toggleMobileNav(): void {
    this.isActive = !this.isActive;
  }

  hideMobileNav(): void {
    if (this.isActive) {
      this.toggleMobileNav();
    }
  }

  logout() {
    this.authService.logout();
    this._userService.userSignal.set({} as IUserVM);
  }
}
