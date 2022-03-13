import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <ul>
        <li><a [routerLink]="['/', 'home']">Home</a></li>
        <li style="float:right"><a [routerLink]="['/', 'login']">Login</a></li>
        <li style="float:right">
          <a [routerLink]="['/', 'signup']">Signup</a>
        </li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent {
  title = 'homework-13-sujan-lama';
}
