import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import Response from '../models/response';
import { map } from 'rxjs';
import { Router } from '@angular/router';
import { AuthorizationService } from '../authorization.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private authorizationService: AuthorizationService,
    private toastr: ToastrService
  ) {
    this.loginForm = formBuilder.group({
      email: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^[\w]{1,}[\w.+-]{0,}@[\w-]{1,}([.][a-zA-Z]{2,}|[.][\w-]{2,}[.][a-zA-Z]{2,})$/
          ),
        ]),
      ],
      password: ['', Validators.compose([Validators.required])],
    });
  }

  onSubmit() {
    this.loginService
      .login(this.loginForm.value)
      .pipe(map((v) => v as Response))
      .subscribe((v) => {
        if (!v.success) {
          this.toastr.error(v.message);
          return;
        }

        this.authorizationService.login(v.data);
        this.toastr.success(v.message);
      });
  }
  ngOnInit(): void {}
}
