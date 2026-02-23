import { Component, ElementRef, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AppMenu } from './app.menu';
import { LayoutService } from '../service/layout.service';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { AuthService } from '../../pages/auth/auth.service';
import { GeneralService } from '../../pages/service/general.service';
import { MessageService } from 'primeng/api';

import { AppFloatingConfigurator } from './app.floatingconfigurator';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule, AppMenu, MenuModule, AppFloatingConfigurator],
    template: ` <div class="layout-sidebar flex flex-col justify-between mt-4 bg-surface-0 dark:bg-surface-900">
        <div>
            <app-menu (logout)="logout($event)"></app-menu>
        </div>
        <div class="p-3 text-xs text-muted-color border-t border-surface-200 dark:border-surface-800 flex items-center justify-between">
            <div class="flex items-center justify-between w-full">

            <!-- LEFT: SETTINGS -->
            <div class="relative">
                <button 
                    type="button" 
                    class="flex items-center gap-2 text-muted-color hover:text-primary p-2 rounded-lg hover:bg-surface-100 dark:hover:bg-surface-800"
                    (click)="menu.toggle($event)"
                    aria-label="Settings menu">
                    <i class="pi pi-cog"></i>
                        <span>Settings</span>
                    <i class="pi pi-chevron-down text-xs"></i>
                </button>

                <p-menu 
                    #menu 
                    [model]="settingsMenu" 
                    [popup]="true"
                    appendTo="body">
                </p-menu>
             </div>

            <!-- RIGHT: VERSION -->
            <span class="opacity-80 text-xs">
                Version 0.0.1
            </span>

            </div>

            <div class="flex items-center gap-2">
                <!-- <button type="button" class="layout-topbar-action" (click)="toggleDarkMode()" [title]="layoutService.isDarkTheme() ? 'Switch to Light' : 'Switch to Dark'">
                    <i class="pi" [ngClass]="{ 'pi-moon': !layoutService.isDarkTheme(), 'pi-sun': layoutService.isDarkTheme() }"></i>
                </button> -->
                <!-- <span class="opacity-80">Version 0.0.1</span> -->
                <div style="display: none;">
                    <app-floating-configurator />
                </div>
            </div>
        </div>
    </div>`
})
export class AppSidebar {
    @Output() logoutSb = new EventEmitter<any>();

    settingsMenu: MenuItem[] = [];

    constructor(public el: ElementRef, public layoutService: LayoutService, private router: Router, private authService: AuthService, private generalService: GeneralService, private messageService: MessageService) {
        this.initializeSettingsMenu();
    }

    ngOnInit() {
        this.initializeSettingsMenu();
    }

    initializeSettingsMenu() {
        this.settingsMenu = [

            {
                label: 'Logout',
                icon: 'pi pi-sign-out',
                command: () => this.handleLogout()
            },
            // {
            //     label: 'Marquee',
            //     icon: 'pi pi-cog',
            //     command: () => this.goToPage('marquee')
            // }
        ];
    }
    // goToPage(type:any){
    //     if(type === 'marquee') {
    //             this.router.navigate(['/marquee-setting']);
    //     }

    // }

    handleLogout() {
        // this.authService.logout();
        this.router.navigate(['/package/login-1']);
    }

    logout($event: any) {
        this.logoutSb.emit($event);
    }

    toggleDarkMode() {
        const newDark = !this.layoutService.isDarkTheme();
        this.layoutService.layoutConfig.update((state) => ({ ...state, darkTheme: newDark }));

        // Persist preference to backend
        const prefs = {
            darkTheme: newDark,
            menuMode: this.layoutService.layoutConfig().menuMode,
            preset: this.layoutService.layoutConfig().preset,
            primary: this.layoutService.layoutConfig().primary,
            surface: this.layoutService.layoutConfig().surface
        } as any;
        // this.generalService.updateUserPreference(prefs).subscribe({
        //     next: () => { },
        //     error: () => {
        //         this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'Could not save theme preference' });
        //     }
        // });
    }
}
