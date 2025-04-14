import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-scrollup',
  standalone: false,
  templateUrl: './scrollup.component.html',
  styleUrl: './scrollup.component.css',
})
export class ScrollupComponent {
  isActive = false; // Controls button visibility

  @HostListener('window:scroll', [])
  onScroll(): void {
    this.isActive = window.scrollY > 100;
  }

  scrollToTop(event: Event): void {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
}
