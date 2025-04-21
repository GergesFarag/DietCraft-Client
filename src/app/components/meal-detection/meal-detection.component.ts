// image-uploader/image-uploader.component.ts
import { Component, OnInit, Query, signal, WritableSignal } from "@angular/core";
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from "@angular/animations";
import { MealDetectionService } from "../../services/meal-detection.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-meal-detection",
  standalone: false,
  templateUrl: "./meal-detection.component.html",
  styleUrl: "./meal-detection.component.css",
  animations: [
    trigger("fadeInOut", [
      state("in", style({ opacity: 1 })),
      transition(":enter", [style({ opacity: 0 }), animate("300ms ease-in")]),
      transition(":leave", [animate("300ms ease-out", style({ opacity: 0 }))]),
    ]),
    trigger("slideUpDown", [
      state("in", style({ transform: "translateY(0)" })),
      transition(":enter", [
        style({ transform: "translateY(20px)" }),
        animate("400ms ease-out"),
      ]),
      transition(":leave", [
        animate("400ms ease-in", style({ transform: "translateY(20px)" })),
      ]),
    ]),
    trigger("pulse", [
      state("active", style({ transform: "scale(1.05)" })),
      state("inactive", style({ transform: "scale(1)" })),
      transition("inactive => active", animate("200ms ease-in")),
      transition("active => inactive", animate("200ms ease-out")),
    ]),
  ],
})
export class MealDetectionComponent implements OnInit {
  dragAreaClass: string = "dragarea";
  selectedFile: File | null = null;
  previewUrl: string | ArrayBuffer | null = null;
  isLoading: boolean = false;
  uploadComplete: boolean = false;
  uploadError: boolean = false;
  errorMessage: string = "";
  itemPrediction:string = '';
  pulseState: string = "inactive";
  progressValue: number = 0;
  imageSrc: WritableSignal<string> = signal("");

  constructor(private _mealDetectionService: MealDetectionService , private router:Router) {}

  ngOnInit(): void {
    this.resetComponent();
  }

  onFileSelect(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    this.dragAreaClass = "dragarea-active";
    this.pulseState = "active";
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.dragAreaClass = "dragarea";
    this.pulseState = "inactive";
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.dragAreaClass = "dragarea";
    this.pulseState = "inactive";

    if (event.dataTransfer && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File): void {
    // Validate file is an image
    if (!file.type.match(/image\/*/)) {
      this.errorMessage = "Please upload an image file";
      this.uploadError = true;
      setTimeout(() => (this.uploadError = false), 3000);
      return;
    }

    this.selectedFile = file;

    const reader = new FileReader();
    reader.onload = (e) => {
      this.previewUrl = e.target?.result || null;
    };
    reader.readAsDataURL(file);
  }
  uploadFile(): void {
    if (!this.selectedFile) return;

    this.isLoading = true;
    this.uploadComplete = false;
    this.uploadError = false;
    this.errorMessage = "";
    const interval = setInterval(() => {
      if (this.progressValue < 100) {
        this.progressValue += 20;
      }
    }, 300);
    this._mealDetectionService.detectMeal(this.selectedFile).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.imageSrc.update((_) => response.imageURL);
          if(response.itemPrediction){
            this.itemPrediction = response.itemPrediction;
          }else{
            this.itemPrediction = ''; 
          }
          clearInterval(interval);
          this.isLoading = false;
          this.uploadComplete = true;
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.uploadError = true;
        this.errorMessage = "Upload failed. Please try again.";
        clearInterval(interval); // Stop the interval on error
      },
    });
  }

  cancelUpload(): void {
    this.resetComponent();
  }
  // navigateToNutrients(){
  //   console.log(this.itemPrediction);
  //   const queryParams = new Query();
  //   this.router.navigate(['/services/nutrition'], { queryParams: { searchItem: this.itemPrediction } });
  // }

  resetComponent(): void {
    this.selectedFile = null;
    this.previewUrl = null;
    this.isLoading = false;
    this.uploadComplete = false;
    this.uploadError = false;
    this.errorMessage = "";
    this.progressValue = 0;
    this.dragAreaClass = "dragarea";
  }
}
