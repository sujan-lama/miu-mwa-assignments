import { Component } from '@angular/core';

@Component({
  selector: 'app-comp4',
  template: `
  <h1>Component 4:</h1>
    <p>Two-way Data Binding:</p>
    <p>Message: {{message}}</p>
    <input [value]="message" (input)="twoWays($event)">
  `
})
export class Comp4Component {
  public message: string = 'Default Message';
  twoWays(event: any) {
    this.message = event?.target?.value;
  }
}
