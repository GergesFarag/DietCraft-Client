import { Directive, ElementRef, Input, OnInit, Renderer2 } from "@angular/core";

@Directive({
  selector: "[appDoubleSize]",
  standalone: false,
})
export class DoubleSizeDirective implements OnInit {
  @Input("appDoubleSize") value:string = '4';
  constructor(private element: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    this.renderer.setStyle(
      this.element.nativeElement.children[0],
      "width",
      this.element.nativeElement.children[0].offsetWidth * +this.value + "px"
    );
  }
}
