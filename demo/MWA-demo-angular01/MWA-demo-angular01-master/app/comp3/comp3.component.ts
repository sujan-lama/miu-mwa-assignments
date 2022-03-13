import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comp3',
  template: `
    <h1>Component 3:</h1>
    <p>Output "data Obj" to Parent: <button (click)="emitMessage()">Click to Output!</button></p>
  `
})
export class Comp3Component {
  public data = {
      'firstname': 'Asaad', 
      'lastname': 'Saad'
  };
  @Output() messageEmitter = new EventEmitter();

  emitMessage() {
    this.messageEmitter.emit(this.data);
  }
}
