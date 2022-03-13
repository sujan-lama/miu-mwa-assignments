import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="nav">
      <ul>
        <li><a [routerLink]="['/', 'home']">Home</a></li>
        <li><a [routerLink]="['/', 'course']">Course</a></li>
      </ul>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [
    `
      ul {
        list-style-type: none;
        margin: -8px;
        padding: 0;
        overflow: hidden;
        background-color: #323639;
      }

      li {
        float: left;
      }

      li a {
        display: block;
        color: white;
        text-align: center;
        padding: 14px 16px;
        text-decoration: none;
      }

      /* Change the link color to #111 (black) on hover */
      li a:hover {
        background-color: #111;
      }
    `,
  ],
})
export class AppComponent {
  title = 'homework-12-sujan-lama';
}
