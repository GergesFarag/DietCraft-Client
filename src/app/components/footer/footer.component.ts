import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: false,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  @Input() currentPageRoute!:string;
  constructor(private router:Router){
    console.log("Current Page" , this.currentPageRoute);
  }
  navigateToContact(){
    this.router.navigate(['/contact']);
  }
}
