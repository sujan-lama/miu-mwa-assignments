import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, mergeMap, Observable, of } from 'rxjs';
import { SignupService } from './signup.service';
import Response from '../models/response';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css'],
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private router: Router,
    private signupService: SignupService,
    private toastr: ToastrService

  ) {
    this.signupForm = formBuilder.group({
      name: ['', Validators.compose([Validators.required])],
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
          ),
        ]),
        this.emailUniqueValidator.bind(this),
      ],
      password: [
        '',
        Validators.compose([Validators.required, Validators.minLength(6)]),
      ],
    });
  }

  onSubmit() {
    this.signupService
      .signup(this.signupForm.value)
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
        if (v.success) {
          this.toastr.success(v.message);
          this.signupForm.reset();
          this.router.navigate(['/login']);
          return;
        }

        this.toastr.error(v.message);
      });
  }

  emailUniqueValidator(control: FormControl): Promise<any> | Observable<any> {
    return this.signupService.isEmailUnique(control.value).pipe(
      map((v) => v as Response),
      mergeMap((v) => (v.success ? of(null) : of({ unique: true })))
    );
  }

  ngOnInit(): void {}
}
