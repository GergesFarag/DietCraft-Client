import { Component } from '@angular/core';
import Aos from "aos";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'diet-craft';
  
  ngOnInit() {
    Aos.init();
  }
}
