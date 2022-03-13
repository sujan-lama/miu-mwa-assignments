import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <p>My first app</p>
    <div>{{ name }}</div>

    <app-sujan
      [city]="city"
      [potato]="street"
      (streetChange)="doSomething($event)"
    >
      <p #parentPara>I'm your content Mr. Sujan</p>
    </app-sujan>

    <input [value]="name" (keyup)="name = $any($event.target).value" />
    <!-- <input [value]="name" (keyup)="keyIsUp($event)" /> -->
  `,
  styles: [''],
})
export class AppComponent {
  // constructor() {
  //   setTimeout(() => {
  //     this.name = 'Xuzan Lama';
  //   }, 5000);
  // }
  name = 'Sujan Lama';
  city = { name: 'Ottumwa' };
  street = '1000 N 4th Street';

  doSomething(event: { msg: string }) {
    console.log(event.msg);
  }

  keyIsUp(e: any) {
    this.name = e.target.value;
  }
}
