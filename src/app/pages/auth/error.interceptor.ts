import { HttpInterceptorFn, HttpErrorResponse, HttpInterceptor, HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { MessageService } from 'primeng/api';
import { environment } from '../../../environments/environments.development';
@Injectable()
export class errorInterceptor implements HttpInterceptor {
    constructor(private messageService: MessageService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                // console.error('HTTP Error:', error);
                if (error.status === 401) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Unauthorized',
                        detail: error.error.message
                    });
                    
                    // Check if current page is login page
                    const currentUrl = window.location.pathname;
                    const isLoginPage = currentUrl.includes('/auth/login') || currentUrl.includes('/login');
                    
                    if (!isLoginPage) {
                        localStorage.clear();
                        window.location.href = `${environment.routeToLogin}/auth/login`;
                        // location.reload();
                    }
                } else if (error.status === 419) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Session Expired',
                        detail: error.error.message
                    });
                    
                    // Check if current page is login page
                    const currentUrl = window.location.pathname;
                    const isLoginPage = currentUrl.includes('/auth/login') || currentUrl.includes('/login');
                    
                    if (!isLoginPage) {
                        localStorage.clear();
                        window.location.href = `${environment.routeToLogin}/auth/login`;
                        // location.reload();
                    }
                } else if (error.status === 500) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Server Error',
                        detail: error.error.message
                        // detail: 'Internal server error occurred. Please try again later.'
                    });
                } else if (error.status === 404) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Not Found',
                        detail: error.error.message
                        // detail: 'The requested resource was not found.'
                    });
                } else if (error.status === 403) {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Forbidden',
                        detail: error.error.message
                        // detail: 'You do not have permission to access this resource.'
                    });
                } else {
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error',
                        detail: error.error?.message || 'An unexpected error occurred.'
                    });
                }

                // Always return an observable
                return throwError(() => new Error(error.message));
            })
        );
        // throw new Error('Method not implemented.');
    }
}
