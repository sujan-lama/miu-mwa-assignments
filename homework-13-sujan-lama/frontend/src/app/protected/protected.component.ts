import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AuthorizationService } from '../authorization.service';
import Response from '../models/response';
import { ProtectedService } from './protected.service';

@Component({
  selector: 'app-protected',
  template: `
    <div style="padding:16px">
      <p>protected works!</p>
      <button style="float:right;margin-right:16px" (click)="logout()">
        Logout
      </button>
      {{ data }}
    </div>
  `,
  styles: [],
})
export class ProtectedComponent implements OnInit {
  data: string = '';
  constructor(
    private service: ProtectedService,
    private authService: AuthorizationService
  ) {
    this.fetchData();
  }

  fetchData() {
    this.service
      .getData()
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
        this.data = v.data.secret;
      });
  }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
