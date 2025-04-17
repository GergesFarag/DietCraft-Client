import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../models/IUser';
import { AuthService } from '../../services/auth.service';
import { IUserVM } from '../../vms/Iuser.vm';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnDestroy {
  loginForm!: FormGroup;
  errorMessage: string | null = null;
  prevURL:string = '';
  warningMessage: string | null = null;
  passwordFieldType: string = 'password';
  iClass: string = 'fa-eye-slash';
  timeoOutSubs:number;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private authService: AuthService,
  ) {
    const nav = this.router.getCurrentNavigation();
    this.timeoOutSubs = this.warningMessage = nav?.extras?.state?.['fromGuard'] ?? null;
    setTimeout(() => {
      this.warningMessage = null;
    },2000)
  }
  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  // Toggle password visibility
  toggleVisibility(): void {
    this.passwordFieldType =
      this.passwordFieldType === 'password' ? 'text' : 'password';
  }

  loginUser() {
    if (this.loginForm.invalid && this.loginForm.get('email')?.value !== 'admin') {
      this.errorMessage =
        'An error occurred, please check you have entered valid Email & Password.';
      return;
    }

    let user: IUser = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    console.log(user);
    this.userService.login(user).subscribe({
      next: (response) => {
        if (response.message == 'User Logged In Successfully !') {
          let user:IUserVM = {
            username : response.data.user.username,
            email : response.data.user.email,
            isAdmin : response.data.user.isAdmin
          }
          this.authService.setToken(response.data.accessToken)
          this.userService.setCookie('refreshToken',response.data.user.refreshToken)  
          this.userService.setUserInLS(user);
            this.router.navigate(['/']);
          } else {
            this.errorMessage = response.message;
        }
      },
      error: (error) => {
        this.errorMessage = error.message;
      },
    });
  }
  ngOnDestroy(): void {
    clearTimeout(this.timeoOutSubs);
  }
}
