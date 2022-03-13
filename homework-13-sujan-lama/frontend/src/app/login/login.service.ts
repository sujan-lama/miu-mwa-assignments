import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private client: HttpClient) {}

  login(body: { email: string; password: string }) {
    return this.client.post('http://localhost:3000/api/users/login', body);
  }
}
