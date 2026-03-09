import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDiscountHighlight]',
  standalone: true
})
export class DiscountHighlightDirective implements OnChanges {
  @Input('appDiscountHighlight') discount: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const discountLevel = Number(this.discount);
    if (discountLevel > 0) {
      if (discountLevel >= 20) {
        this.renderer.setStyle(this.el.nativeElement, 'background-color', '#e8f5e9'); // light green
        this.renderer.setStyle(this.el.nativeElement, 'color', '#2e7d32');
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
      } else {
        this.renderer.setStyle(this.el.nativeElement, 'color', '#43a047');
        this.renderer.setStyle(this.el.nativeElement, 'font-weight', '500');
      }
      this.renderer.setStyle(this.el.nativeElement, 'padding', '2px 6px');
      this.renderer.setStyle(this.el.nativeElement, 'border-radius', '4px');
      this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
      this.renderer.setStyle(this.el.nativeElement, 'margin-left', '8px');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
      this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
      this.renderer.removeStyle(this.el.nativeElement, 'padding');
      this.renderer.removeStyle(this.el.nativeElement, 'border-radius');
      this.renderer.removeStyle(this.el.nativeElement, 'display');
      this.renderer.removeStyle(this.el.nativeElement, 'margin-left');
    }
  }
}
