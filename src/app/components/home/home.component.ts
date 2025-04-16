import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private router:Router){}
  ngOnInit(): void {
    
  }
  navigateToContact(){
    this.router.navigate(['/contact'])
  }
}
