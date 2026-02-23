import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';
import { ToastModule } from 'primeng/toast';
import { AuthService } from './auth.service';
import { GeneralService } from '../service/general.service';
import { LayoutService } from '../../layout/service/layout.service';
import { MessageService } from 'primeng/api';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-login',
    standalone: true,
    styleUrl: './auth.scss',
    imports: [ButtonModule, CheckboxModule, InputTextModule, PasswordModule, FormsModule, RouterModule, RippleModule, AppFloatingConfigurator, ToastModule, CommonModule],
    template: `
        <div style="position: relative; z-index: 9"><app-floating-configurator /></div>
        <p-toast></p-toast>
        <div class="login-background bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
            <div class="flex flex-col items-center justify-center">
                <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 107, 243, 0) 30%)">
                    <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                        <div class="text-center mb-8" style="width: 30vw">
                            <img src="assets/icons/WACH logo night.svg" alt="ProHawk" style='width: 50%; height: auto; margin: auto'/>
                            <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">Welcome to ICC (HTA)</div>
                            <span class="text-muted-color font-medium">Sign in to continue</span>
                        </div>

                        <form (ngSubmit)="onSignIn()" #loginForm="ngForm" novalidate>
                            <div>
                                <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Email</label>
                                <input
                                    pInputText
                                    id="email1"
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    class="w-full md:w-[30rem]"
                                    [(ngModel)]="username"
                                    #emailModel="ngModel"
                                    required
                                    email
                                    [fluid]="true"
                                    autocomplete="username"
                                />
                                <div class="mt-1 mb-2 text-sm text-red-500" *ngIf="(emailModel?.invalid && (emailModel?.dirty || emailModel?.touched))">
                                    <span *ngIf="emailModel?.errors?.['required']">Email is required.</span>
                                    <span *ngIf="!emailModel?.errors?.['required'] && emailModel?.errors?.['email']">Please enter a valid email.</span>
                                </div>

                                <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2" style="padding-top: 1rem;">Password</label>
                                <p-password
                                    id="password1"
                                    name="password"
                                    [(ngModel)]="password"
                                    #passwordModel="ngModel"
                                    placeholder="Password"
                                    [toggleMask]="true"
                                    styleClass="mb-1 w-full"
                                    [fluid]="true"
                                    [feedback]="false"
                                    required
                                    autocomplete="current-password"
                                ></p-password>
                                <div class="mt-1 mb-2 text-sm text-red-500" *ngIf="(passwordModel?.invalid && (passwordModel?.dirty || passwordModel?.touched))">
                                    <span *ngIf="passwordModel?.errors?.['required']">Password is required.</span>
                                </div>

                                <div class="flex items-center justify-between mt-2 mb-8 gap-8" style="padding-top: 1rem;">
                                    <div class="flex items-center">
                                        <p-checkbox [(ngModel)]="checked" id="rememberme1" name="rememberMe" binary class="mr-2"></p-checkbox>
                                        <label for="rememberme1">Remember me</label>
                                    </div>
                                    <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">Forgot password?</span>
                                </div>
                                <p-button label="Sign In" styleClass="w-full" type="submit" [disabled]="isLoading && loginForm.invalid"></p-button>
                                <div class="mt-2 text-sm text-red-500" *ngIf="submitted && loginForm.invalid">
                                    <div *ngIf="emailModel?.errors?.['required']">Please fill in the email.</div>
                                    <div *ngIf="!emailModel?.errors?.['required'] && emailModel?.errors?.['email']">Please enter a valid email.</div>
                                    <div *ngIf="passwordModel?.errors?.['required']">Please fill in the password.</div>
                                </div>
                                <div class="flex items-center justify-center mt-3">
                                    <span>Don't have an account? <span class=" no-underline ml-1 text-right cursor-pointer text-primary">Register</span></span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `
})
export class Login implements OnInit {
    username: string = '';

    password: string = '';

    checked: boolean = false;

    isLoading: boolean = false;
    errorMessage: string = '';
    submitted: boolean = false;

    constructor(private router: Router, private authService: AuthService, private generalService: GeneralService, private layoutService: LayoutService, private messageService: MessageService) {}

    ngOnInit() {
        try {
            const remembered = localStorage.getItem('rememberMeEmail');
            const rememberFlag = localStorage.getItem('rememberMeChecked');
            if (rememberFlag === 'true' && remembered) {
                this.username = remembered;
                this.checked = true;
            }
        } catch {}
    }
    handleEnter(event: KeyboardEvent): void {
        if (event.key === 'Enter') {
            this.onSignIn()
        }
    }
    onSignIn() {
        this.submitted = true;
        this.errorMessage = '';
        const username = (this.username || '').trim();
        const password = (this.password || '').trim();
        if (!username || !password) {
            // Let inline validators show; keep early return
            return;
        }
        this.isLoading = true;

        this.authService.login(username, password).subscribe({
            next: () => {
                // After login, fetch user details (greeting + preferences)
                // this.generalService.getUserDetail().subscribe({
                //     next: (resp: any) => {
                //         let user: any = {};
                //         let prefs: any = {};
                //         try {
                //             user = resp?.user || resp?.data?.user || resp?.data || {};
                //             prefs = user?.preferences || {};
                //             localStorage.setItem('userData', JSON.stringify(user));
                //         } catch {}

                //         const detailMessage = resp?.message || 'User details retrieved successfully';
                //         // Persist toast request for landing page to pick up
                //         try {
                //             sessionStorage.setItem('postLoginToast', JSON.stringify({ severity: 'success', summary: 'Success', detail: detailMessage }));
                //         } catch {}
                //         // Navigate first; toast will be shown on landing
                //         this.router.navigateByUrl('/landing').then(() => {
                //             // Apply preferences AFTER navigation so login screen visuals don't change
                //             this.layoutService.layoutConfig.update((state) => ({
                //                 ...state,
                //                 darkTheme: typeof prefs.darkTheme === 'boolean' ? prefs.darkTheme : state.darkTheme,
                //                 menuMode: 'overlay',
                //                 preset: prefs.preset || state.preset,
                //                 primary: prefs.primary || state.primary,
                //                 surface: prefs.surface || state.surface
                //             }));
                //             this.isLoading = false;
                //             // Remember me handling
                //             try {
                //                 if (this.checked) {
                //                     localStorage.setItem('rememberMeEmail', this.username);
                //                     localStorage.setItem('rememberMeChecked', 'true');
                //                 } else {
                //                     localStorage.removeItem('rememberMeEmail');
                //                     localStorage.setItem('rememberMeChecked', 'false');
                //                 }
                //             } catch {}
                //         });
                //     },
                //     error: () => {
                //         // If user detail fails, continue to app
                //         this.isLoading = false;
                //         this.router.navigateByUrl('/landing');
                //     }
                // });
            },
        });
    }
}
