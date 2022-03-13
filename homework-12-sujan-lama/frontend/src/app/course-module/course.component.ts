import { Component, OnInit } from '@angular/core';
import { CourseService } from './course.service';
import { Response } from '../response/response';
import { map } from 'rxjs';
@Component({
  selector: 'app-course',
  template: `
    <br />
    <h1>Courses</h1>
    <div *ngIf="!loading; else loadingContent">
      <button class="refresh" (click)="getAllCourses()">Refresh</button>
      <div class="courseBlock" *ngFor="let course of courses">
        <p>{{ course.name }}</p>
        <button (click)="deleteCourses(course._id)">Delete</button>
      </div>
    </div>

    <ng-template #loadingContent>
      <p class="loading">Loading data...</p>
    </ng-template>
  `,
  styles: [
    `
      p {
        display: inline;
        margin-right: 16px;
      }

      .loading {
        font-size: 20px;
      }

      .refresh {
        float: right;
        margin-bottom: 16px;
        margin-right: 8px;
        padding: 4px;
      }
      .courseBlock {
        clear: both;
        padding: 16px;
        margin: 8px;
        border: 1px solid black;
      }

      button {
        float: clear;
      }
    `,
  ],
})
export class CourseComponent implements OnInit {
  courses: any = [];
  loading: boolean = false;
  constructor(private courseService: CourseService) {
    this.getAllCourses();
  }

  getAllCourses() {
    this.loading = true;
    this.courseService
      .getAllCourses()
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
        this.courses = v.data;
        this.loading = false;
      });
  }

  deleteCourses(id: number) {
    this.loading = true;
    this.courseService
      .deleteCourse(id)
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
        if (!v.success) {
          alert(v.message);
          return;
        }
        this.getAllCourses();
      });
  }
  ngOnInit(): void {}
}
