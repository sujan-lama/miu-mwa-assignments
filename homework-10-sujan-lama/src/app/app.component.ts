import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>First instance of counter</p>
    <app-counter
      [counter]="childCounterInitValue"
      (counterValueEmitter)="getCounterFromChild($event)"
    ></app-counter>
    <br />
    <p>Second instance of counter</p>
    <app-counter
      [counter]="childCounterInitValue"
      (counterValueEmitter)="getCounterFromChild($event)"
    ></app-counter>
    <br />
    <p>Third instance of counter</p>
    <app-counter
      [counter]="childCounterInitValue"
      (counterValueEmitter)="getCounterFromChild($event)"
    ></app-counter>
  `,
  styles: [],
})
export class AppComponent {
  title = 'Homework 10: Counter';
  childCounterInitValue = 5;

  getCounterFromChild(data: number) {
    this.childCounterInitValue = data;
  }
}
