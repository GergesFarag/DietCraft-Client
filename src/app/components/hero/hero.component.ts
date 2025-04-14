import { Component, signal, Signal, WritableSignal } from "@angular/core";
import { IUser } from "../../models/IUser";
import { UserService } from "../../services/user.service";
import { AuthService } from "../../services/auth.service";
import { IUserVM } from "../../vms/Iuser.vm";

@Component({
  selector: "app-hero",
  standalone: false,
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent {
  user: WritableSignal<IUserVM> = signal({} as IUserVM);
  constructor(private _userService: UserService) {
    this.user = this._userService.userSignal;
  }
}
