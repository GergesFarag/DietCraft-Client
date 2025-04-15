import { Component, Input, signal, WritableSignal } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-confirmation",
  standalone: false,
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.css",
})
export class ConfirmationComponent {
  
  @Input() head: string = "Confirmation";
  @Input() message: string = "Are you sure you want to proceed?";
  @Input() confirmText: string = "Yes";
  @Input() cancelText: string = "No";
  @Input() confirmAction: any = () => {};
  @Input() cancelAction: any = () => {};
  @Input() iconClass: string = "fa-solid fa-check-double";
  @Input() iconColor: string = "red";
  constructor(
    private authService: AuthService,
    private router: Router,
    private _userService: UserService
  ) {}
  hideConfirmation(){
    this._userService.loggingOutSignal.set(false);
  }
}
