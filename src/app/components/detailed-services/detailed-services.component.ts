import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detailed-services',
  standalone: false,
  templateUrl: './detailed-services.component.html',
  styleUrl: './detailed-services.component.css'
})
export class DetailedServicesComponent {
  constructor(private router:Router){}
  navigateToServices(){
    this.router.navigate(['/services']);
  }
}
