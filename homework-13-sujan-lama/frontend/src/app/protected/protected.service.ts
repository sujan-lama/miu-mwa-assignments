import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProtectedService {
  constructor(private client: HttpClient) {}

  getData() {
    return this.client.get('http://localhost:3000/api/protected');
  }
}
