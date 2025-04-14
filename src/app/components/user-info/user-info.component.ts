import { Component } from '@angular/core';
import { Goals, UserInfoSchema } from '../../models/UserInfoSchema';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-info',
  standalone: false,
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css',
})
export class UserInfoComponent {
  activityLevel = ['Low', 'Medium', 'High'];
  userInfoForm!: FormGroup;
  errorMessage: string | null = null;
  goals = Goals;
  goalKeys = Object.keys(Goals).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof Goals)[];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      age: ['', [Validators.required, Validators.min(1)]],
      weight: ['', [Validators.required, Validators.min(1)]],
      height: ['', [Validators.required, Validators.min(1)]],
      gender: [true, Validators.required],
      activityLevel: ['', Validators.required],
      goal: ['', Validators.required],
    });

    // // ✅ Ensure `calories` field is updated properly
    if (this.userInfoForm) {
      this.userInfoForm.get('calories')?.valueChanges.subscribe((value) => {
        if (value !== null && value !== undefined) {
          this.userInfoForm.patchValue(
            { calories: Number(value) || Number(0) },
            { emitEvent: false }
          );
        }
      });

    //   // ✅ Ensure `activityLevel` is always lowercase
    //   this.userInfoForm
    //     .get('activityLevel')
    //     ?.valueChanges.subscribe((value) => {
    //       if (typeof value === 'string' && value.trim() !== '') {
    //         this.userInfoForm.patchValue(
    //           { activityLevel: value.toLowerCase() },
    //           { emitEvent: false }
    //         );
    //       }
    //     });
    } 
  }

  addUserInfo(): void {
    if (this.userInfoForm.valid) {
      let userInfo: UserInfoSchema = this.userInfoForm.value;

      // userInfo.calories = userInfo.calories ? Number(userInfo.calories) : Number(0);
      userInfo.activityLevel = userInfo.activityLevel.toLocaleLowerCase();

      this.userService.addUserInfo(userInfo).subscribe({
        next: (response) => {
          console.log(response);

          if (response?.message) {
            this.router.navigate(['/home']);
          } else {
            this.errorMessage = response?.message || 'Adding your info failed';
          }
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error?.Error || 'An error occurred';
        },
      });
    }
  }
}
