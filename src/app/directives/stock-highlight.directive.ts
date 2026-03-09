import { Directive, ElementRef, Input, OnChanges, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appStockHighlight]',
  standalone: true
})
export class StockHighlightDirective implements OnChanges {
  @Input('appStockHighlight') stock: number = 0;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnChanges(): void {
    const stockLevel = Number(this.stock);
    if (stockLevel === 0) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#ffebee');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#c62828');
    } else if (stockLevel < 10) {
      this.renderer.setStyle(this.el.nativeElement, 'background-color', '#fff3e0');
      this.renderer.setStyle(this.el.nativeElement, 'color', '#ef6c00');
    } else {
      this.renderer.removeStyle(this.el.nativeElement, 'background-color');
      this.renderer.removeStyle(this.el.nativeElement, 'color');
    }
  }
}
