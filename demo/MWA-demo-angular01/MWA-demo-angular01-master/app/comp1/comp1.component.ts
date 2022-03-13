import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comp1',
  template: `
    <h1>Component 1:</h1>
      <ul> 
        <li>Message 1: {{message1}}</li>
        <li>Message 2: {{message2}}</li>
        <li>Message 3: {{message3}}</li>
      </ul>
      <p><ng-content></ng-content></p>
  `
})
export class Comp1Component {
  public message1;
  @Input() message2: string = '';
  @Input() message3: string = '';

  constructor() {
    this.message1 = 'default message from testing'
  }

}
