import { AfterViewChecked, AfterViewInit, Component, Input, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: false,
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent{
  @Input() type: string = 'button';
  @Input() label: string = 'Click Me';
  @Input() color: string = 'white';
  @Input() backgroundColor: string = '#10bc69';
  @Input() size: string = ['small', 'medium', 'large'][0];
  @Input() disabled: boolean = false;
  @Input() classes!:string;
  @Input() Action: () => any = () => {}
  constructor(private router:Router){}
}
