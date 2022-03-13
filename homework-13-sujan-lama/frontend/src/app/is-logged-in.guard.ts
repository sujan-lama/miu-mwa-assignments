import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthorizationService } from './authorization.service';

@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(
    private router: Router,
    private authorizationService: AuthorizationService,
    private toastr: ToastrService
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.authorizationService.isLoggedIn()) {
      this.toastr.error('Not authorized');
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
