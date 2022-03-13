import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private client: HttpClient) {}

  getAllCourses() {
    return this.client.get('http://localhost:3000/api/courses');
  }

  deleteCourse(id: number) {
    return this.client.delete(`http://localhost:3000/api/courses/${id}`);
  }
}
