import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { PermissionsService } from "./permissions.service";
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: "root"
})
export class RoleGuard {
  constructor(
    private authService: AuthService,
    private permissionsService: PermissionsService,
    private router: Router,
     private messageService: MessageService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(["/auth/login"]);
      return false;
    }
    const requiredPermissions = route.data["permissions"];
    
    if (
      requiredPermissions &&
      requiredPermissions.some((permission:any) => this.permissionsService.hasPermission(permission))
    ) {
      return true;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: 'Opss!! Access Denied!' });
      return false;
    }
  }
}
