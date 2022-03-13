import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private client: HttpClient) {}

  isEmailUnique(email: string) {
    return this.client.get(`http://localhost:3000/api/users/verify/${email}`);
  }

  signup(body: { name: string; email: string; password: string }) {
    return this.client.post('http://localhost:3000/api/users/signup', body);
  }
}
