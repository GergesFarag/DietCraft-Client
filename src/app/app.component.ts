import { Component, OnDestroy, OnInit } from '@angular/core';
import Aos from "aos";
import { UserService } from './services/user.service';
import { IUserVM } from './vms/Iuser.vm';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit , OnDestroy {
  title = 'diet-craft';
  currentPage!:string;
  constructor(private _userService:UserService) {}
  ngOnInit() {
    Aos.init();
  }
  ngOnDestroy(): void {
    this._userService.userSignal.set({} as IUserVM);
    localStorage.removeItem('user');
  }
}
