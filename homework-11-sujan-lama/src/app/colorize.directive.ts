import { Directive, ElementRef, HostBinding, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colorize]',
})
export class ColorizeDirective {
  @HostBinding('style.color') hostColor: any;

  private colorArray = ['red', 'blue', 'green', 'yellow', 'maroon'];
  private index = 0;

  constructor(private hostElement: ElementRef, private renderer2: Renderer2) {
    setInterval(() => {
      this.hostColor = this.colorArray[this.index];
      if (this.index === this.colorArray.length) {
        this.index = 0;
      } else this.index++;
    }, 1000);
  }
}
