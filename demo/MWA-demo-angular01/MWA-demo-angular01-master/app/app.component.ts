import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <app-comp1 message2="{{message2}}" [message3]="message3">
    Content of Component
  </app-comp1>

  <app-comp2></app-comp2>

  <app-comp3 (messageEmitter)="showOutputData($event)"></app-comp3>

  <p>Data output from Component 3:</p>
  <ul>
    <li>First Name: {{outputData?.firstname}}</li>
    <li>Last Name: {{outputData?.lastname}}</li>
  </ul>

  <app-comp4></app-comp4>

  <app-comp5>
    <p #myParentParagraph>Parent Paragraph</p> 
    Access from Parent Template: {{myParentParagraph.textContent}}
  </app-comp5>

  <app-comp6></app-comp6> 
  `
})
export class AppComponent {
  public message2: string = "Message 2 from Parent Component";
  public message3: string = "Message 3 from Parent Component";

  public outputData: any;

  showOutputData(data: string) {
    this.outputData = data;
  }
}
