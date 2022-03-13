import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private router: Router) {}

  login(data: any) {
    localStorage.setItem('user', JSON.stringify(data));
    this.router.navigate(['/protected'])
  }

  isLoggedIn(): boolean {
    const user = localStorage.getItem('user');
    if (!user) return false;
    return true;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
