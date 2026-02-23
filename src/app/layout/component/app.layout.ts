import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AppTopbar } from './app.topbar';
import { AppSidebar } from './app.sidebar';
import { AppFooter } from './app.footer';
import { LayoutService } from '../service/layout.service';

import { MessageService } from 'primeng/api';
import { HttpService } from '../../pages/service/http.service';
import { environment } from '../../../environments/environments.development';
import { ToastModule } from 'primeng/toast';

import { ActivatedRoute } from '@angular/router';
@Component({
    selector: 'app-layout',
    standalone: true,
    imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppFooter, ToastModule ],
    template: `
    <!-- <div class="layout-wrapper" [ngClass]="containerClass">
            <app-topbar></app-topbar>
            <app-sidebar (logoutSb)="logout($event)"></app-sidebar>
            <div class="layout-main-container">
                <div class="layout-main">
                    <router-outlet></router-outlet>
                </div>
                <app-footer></app-footer>
            </div>
            <div class="layout-mask animate-fadein"></div>
        </div>
        <p-toast /> -->
        <div class="layout-wrapper" [ngClass]="containerClass">
            <app-topbar></app-topbar>
            <app-sidebar></app-sidebar>
            
            <div class="layout-main-container">
                <div class="layout-main mb-1">
                    <!-- Scrollable content -->
                    <div class="router-container">
                        <router-outlet></router-outlet>
                    </div>
                </div>

                <app-footer></app-footer>
            </div>

            <div class="layout-mask animate-fadein"></div>
        </div>
        <p-toast />
        `
})
export class AppLayout {
    overlayMenuOpenSubscription: Subscription;

    menuOutsideClickListener: any;

    @ViewChild(AppSidebar) appSidebar!: AppSidebar;

    @ViewChild(AppTopbar) appTopBar!: AppTopbar;

    constructor(
        public layoutService: LayoutService,
        public renderer: Renderer2,
        public router: Router,
        private httpService: HttpService,
        private messageService: MessageService,
        private route: ActivatedRoute
    ) {
        this.overlayMenuOpenSubscription = this.layoutService.overlayOpen$.subscribe(() => {
            if (!this.menuOutsideClickListener) {
                this.menuOutsideClickListener = this.renderer.listen('document', 'click', (event) => {
                    if (this.isOutsideClicked(event)) {
                        this.hideMenu();
                    }
                });
            }

            if (this.layoutService.layoutState().staticMenuMobileActive) {
                this.blockBodyScroll();
            }
        });

        this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
            this.hideMenu();
        });

        // this.route.queryParams.subscribe((params) => {
        //     const token = localStorage.getItem('token');
        //     const data = localStorage.getItem('userData');
        //     // if(params['token'] !== undefined && params['user'] !== undefined){
        //     // if (params['token'] !== undefined) {
        //     //     console.log('masuk sini takkkkkkkkk')
        //     //     localStorage.setItem('token', params['token']);
        //     //     this.apiGetUserDetails();
        //     //     // localStorage.setItem('userData2', params['user'])
        //     // }

        //     this.apiGetUserDetails();
        //     //  if(!token && !data) {
        //     //     localStorage.setItem('token', params['token'])
        //     //     localStorage.setItem('userData', params['user'])
        //     //  }
        // });
    }

    // apiGetUserDetails() {
    //     const url = environment.apiEndPoint + environment.api_base + '/user/detail';

    //     this.httpService.getData(url).subscribe({
    //         next: (response: any) => {
    //             const user:any = response.user
    //             const jsonString = JSON.stringify(user);
    //             localStorage.setItem('userData', jsonString);

    //             const layout = {
    //                 preset: user.preferences.preset,
    //                 primary: user.preferences.primary,
    //                 surface: user.preferences.surface,
    //                 darkTheme: user.preferences.darkTheme,
    //                 menuMode: 'overlay'
    //             };

    //             localStorage.setItem('layout-config', JSON.stringify(layout));
    //         },
    //         error: (error) => {}
    //     });
    // }

    isOutsideClicked(event: MouseEvent) {
        const sidebarEl = document.querySelector('.layout-sidebar');
        const topbarEl = document.querySelector('.layout-menu-button');
        const eventTarget = event.target as Node;

        return !(sidebarEl?.isSameNode(eventTarget) || sidebarEl?.contains(eventTarget) || topbarEl?.isSameNode(eventTarget) || topbarEl?.contains(eventTarget));
    }

    hideMenu() {
        this.layoutService.layoutState.update((prev) => ({ ...prev, overlayMenuActive: false, staticMenuMobileActive: false, menuHoverActive: false }));
        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
            this.menuOutsideClickListener = null;
        }
        this.unblockBodyScroll();
    }

    blockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.add('blocked-scroll');
        } else {
            document.body.className += ' blocked-scroll';
        }
    }

    unblockBodyScroll(): void {
        if (document.body.classList) {
            document.body.classList.remove('blocked-scroll');
        } else {
            document.body.className = document.body.className.replace(new RegExp('(^|\\b)' + 'blocked-scroll'.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        }
    }

    get containerClass() {
        return {
            'layout-static': this.layoutService.layoutConfig().menuMode === 'overlay',
            // 'layout-static': this.layoutService.layoutConfig().menuMode === 'static',
            'layout-static-inactive': this.layoutService.layoutState().staticMenuDesktopInactive && this.layoutService.layoutConfig().menuMode === 'static',
            'layout-overlay-active': this.layoutService.layoutState().overlayMenuActive,
            'layout-mobile-active': this.layoutService.layoutState().staticMenuMobileActive
        };
    }

    ngOnDestroy() {
        if (this.overlayMenuOpenSubscription) {
            this.overlayMenuOpenSubscription.unsubscribe();
        }

        if (this.menuOutsideClickListener) {
            this.menuOutsideClickListener();
        }
    }

    logout($event: any) {
        if ($event) {
            const url = environment.apiEndPoint + environment.api_base + '/logout';
            this.httpService.postData(url, null).subscribe({
                next: (response: any) => {
                    setTimeout(() => {
                        localStorage.clear();
                        window.location.href = `${environment.routeToLogin}/auth/login`;
                        // window.location.href = `http://178.128.53.199/admin/auth/login`;
                    }, 500);
                    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Successfully logout!' });
                },
                error: (error: any) => {
                    this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message });
                }
            });
        }
    }
}
