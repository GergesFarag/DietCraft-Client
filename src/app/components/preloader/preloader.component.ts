import { Component } from '@angular/core';

@Component({
  selector: 'app-preloader',
  standalone: false,
  templateUrl: './preloader.component.html',
  styleUrl: './preloader.component.css',
})
export class PreloaderComponent {
  showPreloader = true; // Initially show preloader

  ngOnInit(): void {
    window.addEventListener('load', () => {
      this.showPreloader = false; // Hide preloader on page load
    });
  }
}
