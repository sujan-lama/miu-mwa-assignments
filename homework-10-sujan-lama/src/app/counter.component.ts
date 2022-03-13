import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <div>
      <button (click)="decrement()">-</button>
      {{ counterValue }}
      <button (click)="increment()">+</button>
    </div>
  `,
  styles: [],
})
export class CounterComponent {
  @Input('counter')
  counterValue!: number;

  @Output()
  counterValueEmitter: EventEmitter<number> = new EventEmitter();

  increment = () => {
    this.counterValue++;
    this.emitValueToParent();
  };
  decrement = () => {
    this.counterValue--;
    this.emitValueToParent();
  };

  emitValueToParent() {
    this.counterValueEmitter.emit(this.counterValue);
  }
}
