import { Component } from "@angular/core";
import { Goals, UserInfoSchema } from "../../models/UserInfoSchema";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-user-info",
  standalone: false,
  templateUrl: "./user-info.component.html",
  styleUrl: "./user-info.component.css",
})
export class UserInfoComponent {
  activityLevel = ["Low", "Medium", "High"];
  userInfoForm!: FormGroup;
  errorMessage: string | null = null;
  goals = Goals;
  goalKeys = Object.keys(Goals).filter((key) =>
    isNaN(Number(key))
  ) as (keyof typeof Goals)[];
  isUpdate: boolean = false;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.userInfoForm = this.fb.group({
      age: ["Ahmed", [Validators.required, Validators.min(10)]],
      weight: ["", [Validators.required, Validators.min(35)]],
      height: ["", [Validators.required, Validators.min(100)]],
      gender: [true, Validators.required],
      activityLevel: ["", Validators.required],
      goal: ["", Validators.required],
      calories: [null, [Validators.min(0), Validators.max(8000)]],
      targetWeight: [
        null,
        [Validators.min(35), Validators.max(300), Validators.required],
      ],
    });
    this.activatedRoute.queryParamMap.subscribe((params) => {
      if (params.get("update")) {
        this.isUpdate = true;
        this.userService.getUserInfo().subscribe((response) => {
          if (response.data) {
            this.userInfoForm.patchValue({
              age: response.data.age,
              weight: response.data.weight,
              height: response.data.height,
              gender: response.data.gender,
              activityLevel: this.activityLevel[+response.data.activityLevel],
              goal: response.data.goal,
              targetWeight: response.data.targetWeight,
              calories: response.data.calories,
            });
          }
        });
      }
    });
    if (this.userInfoForm) {
      this.userInfoForm.get("calories")?.valueChanges.subscribe((value) => {
        if (value !== null && value !== undefined) {
          this.userInfoForm.patchValue(
            { calories: Number(value) || Number(0) },
            { emitEvent: false }
          );
        }
      });
    }
  }
  addUserInfo(): void {
    // if (
    //   +this.userInfoForm.get("targetWeight")?.value >
    //   +this.userInfoForm.get("weight")?.value
    // ) {
    //   if (this.userInfoForm.get("goal")?.value === "loseWeight") {
    //     console.log("Gone Here 1");
    //     this.userInfoForm
    //       .get("targetWeight")
    //       ?.setErrors({ targetWeight: true });
    //       return;
    //   }
    // } else if (
    //   +this.userInfoForm.get("targetWeight")?.value <
    //   +this.userInfoForm.get("weight")?.value
    // ) {
    //   if (this.userInfoForm.get("goal")?.value === "gainWeight") {
    //     this.userInfoForm
    //       .get("targetWeight")
    //       ?.setErrors({ targetWeight: true });
    //       return;
    //   }
    // } else {
    //   this.userInfoForm.get("targetWeight")?.setErrors(null);
    // }

    if (this.userInfoForm.valid) {
      let userInfo: UserInfoSchema = this.userInfoForm.value;
      userInfo.activityLevel = userInfo.activityLevel.toLocaleLowerCase();
      if (!this.isUpdate) {
        this.userService.addUserInfo(userInfo).subscribe({
          next: (response) => {
            if (response?.data) {
              this.router.navigate(["/profile"]);
            } else {
              this.errorMessage =
                response?.message || "Adding your info failed";
            }
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error?.Error || "An error occurred";
          },
        });
      } else {
        console.log("Gone Here");
        this.userService.updateUserInfo(userInfo).subscribe({
          next: (response) => {
            if (response?.data) {
              this.router.navigate(["/profile"]);
            } else {
              this.errorMessage =
                response?.message || "Updating your info failed";
            }
          },
          error: (error) => {
            console.log(error);
            this.errorMessage = error?.Error || "An error occurred";
          },
        });
      }
    }
  }
}
