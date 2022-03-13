import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <h1>Component</h1>
    <br />
    <h2>Solution 1:</h2>
    <p colorize>The text will change color every second</p>
    <br />
    <h2>Solution 2:</h2>
    <p [makeBigger]="2" [style.fontSize.px]="16">
      1. when double-click the component, it will increase its size by 2px
    </p>
    <p [makeBigger]="6" [style.fontSize.px]="16">
      2. when double-click the component, it will increase its size by 2px
    </p>
    <br />
    <h2>Solution 3:</h2>
    <p>"Assaad" text is changed into : {{ 'Asaad' | swapLetter: 'a':'@' }}</p>
  `,
  styles: [],
})
export class AppComponent {
  title = 'homework-11-sujan-lama';
}
