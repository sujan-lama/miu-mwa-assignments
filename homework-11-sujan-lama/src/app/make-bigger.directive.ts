import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[makeBigger]',
})
export class MakeBiggerDirective {
  @Input('makeBigger') size: any;

  @HostListener('dblclick') makeSizeBigger() {
    let currentSize = parseInt(
      window
        .getComputedStyle(this.hostElement.nativeElement)
        .getPropertyValue('font-size')
    );

    currentSize = currentSize + this.size;

    this.renderer.setStyle(
      this.hostElement.nativeElement,
      'font-size',
      `${currentSize}px`
    );
  }

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.hostElement.nativeElement, 'cursor', 'default');
  }
}
