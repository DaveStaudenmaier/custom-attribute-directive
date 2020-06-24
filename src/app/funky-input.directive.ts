import { Directive, ElementRef, Renderer2, OnInit, Input } from '@angular/core';

@Directive({
  selector: '[appFunkyInput]'
})
export class FunkyInputDirective implements OnInit {
  @Input() oddColor: string;
  @Input() evenColor: string;

  keyCount = 0;

  constructor(private element: ElementRef,
              private renderer: Renderer2) { }

  // The element that the directive is applied to is associated with our element reference
  ngOnInit() {
    this.renderer.setAttribute(this.element.nativeElement, 'maxlength', '10');
    this.renderer.setStyle(this.element.nativeElement, 'line-height', '2.5');
    this.renderer.setStyle(this.element.nativeElement, 'border-radius', '50%');
    this.renderer.setStyle(this.element.nativeElement, 'padding', '5px');
    this.renderer.setStyle(this.element.nativeElement, 'outline', 'none');
    this.renderer.setStyle(this.element.nativeElement, 'font-size', '24px');
    this.renderer.setProperty(this.element.nativeElement, 'placeholder', 'my funky input');
    this.element.nativeElement.focus();

    this.renderer.listen(this.element.nativeElement, 'keydown', event => {
      if (this.keyCount % 2 == 0) {
      this.renderer.setStyle(this.element.nativeElement, 'background-color', this.evenColor);
      this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
      } else {
        this.renderer.setStyle(this.element.nativeElement, 'background-color', this.oddColor);
        this.renderer.setStyle(this.element.nativeElement, 'color', 'white');
      }
      this.keyCount++;

      if (this.keyCount > 9 ) {
        this.renderer.removeStyle(this.element.nativeElement, 'border-radius');
        this.renderer.removeStyle(this.element.nativeElement, 'red');
        this.renderer.removeStyle(this.element.nativeElement, 'outline');
      }
    });
  }
}
