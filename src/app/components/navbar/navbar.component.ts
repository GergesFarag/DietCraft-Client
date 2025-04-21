import { AfterViewInit, Component, signal, ViewChild, WritableSignal } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";
import { IUserVM } from "../../vms/Iuser.vm";
import { ConfirmationComponent } from "../confirmation/confirmation.component";

@Component({
  selector: "app-navbar",
  standalone: false,
  templateUrl: "./navbar.component.html",
  styleUrl: "./navbar.component.css",
})
export class NavbarComponent {
  isActive = false;
  isLoggedIn = false;
  profileImage:any;
  loggingOut:WritableSignal<boolean>;
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
    this.loggingOut = this._userService.loggingOutSignal;
    this.profileImage = localStorage.getItem("profileImage");
  }
  toggleMobileNav(): void {
    this.isActive = !this.isActive;
  }

  hideMobileNav(): void {
    if (this.isActive) {
      this.toggleMobileNav();
    }
  }
  toggleLogout() {
    this._userService.loggingOutSignal.update((status) => !status);
  }
  confirmLogout(){
    this._userService.loggingOutSignal.set(false);
    this.authService.logout();
    this._userService.userSignal.set({} as IUserVM);
    this.router.navigate(["/"]);
  }
}
