import { Component, OnDestroy, computed, inject } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { LayoutService } from '../service/layout.service';
import { BadgeModule } from 'primeng/badge';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { interval, Subscription } from 'rxjs';
import { HttpService } from '../../pages/service/http.service';
import { GeneralService } from '../../pages/service/general.service';
import { IconService } from '../../pages/service/icon.service';
import { AuthService } from '../../pages/auth/auth.service';
import moment from 'moment-timezone';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [
        RouterModule,
        CommonModule,
        StyleClassModule,
        BadgeModule,
        OverlayBadgeModule,
        MenuModule,
        ButtonModule,
        DialogModule, 
        AppConfigurator
    ],
    template: `
<div class="layout-topbar bg-surface-0 dark:bg-surface-900">
  <div class="flex items-center justify-between w-full px-2 sm:px-3">
    
    <!-- LEFT: menu + logo -->
    <div class="flex items-center gap-2 sm:gap-3 shrink-0">
      <!-- <button class="layout-menu-button layout-topbar-action" (click)="layoutService.onMenuToggle()">
        <i class="pi pi-bars"></i>
      </button> -->
      <a class="layout-topbar-logo" routerLink="/package/landing">
        <img src="assets/icons/RDM_Logo.png" alt="RDM"
             class="layout-topbar-logo-image w-24 sm:w-32 md:w-40 lg:w-48 h-auto" />
      </a>
    </div>

    <!-- RIGHT: buttons + dark mode toggle -->
    <div class="flex items-center gap-4">
      <button pButton type="button" label="Home" class="p-button-text" routerLink="/package/landing"></button>
      <button pButton type="button" label="Contact" class="p-button-text"></button>

      <!-- Dark mode toggle -->
      <p-button type="button" (onClick)="toggleDarkMode()" [rounded]="true"
        [icon]="isDarkTheme() ? 'pi pi-moon' : 'pi pi-sun'" severity="secondary">
      </p-button>

      <!-- App Configurator -->
      <div class="relative">
        <app-configurator></app-configurator>
      </div>
    </div>

  </div>
</div>

  `
})

export class AppTopbar implements OnDestroy {

    LayoutService = inject(LayoutService);
    isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

    toggleDarkMode() {
        this.LayoutService.layoutConfig.update(state => ({ ...state, darkTheme: !state.darkTheme }));
    }

    items!: MenuItem[];
    today: any;
    totalAlarm: any;
    private subscription: Subscription;
    private timeSubscription?: Subscription;
    userName: string = 'User';
    greeting: string = 'HELLO';
    currentTime: string = '';
    temperature: number = 25.4;
    weatherIcon: string = 'assets/icons/Cloudy.png';
    announcementText: string = '';

    userMenuItems: MenuItem[] = [];

    currentUser: any;
    visibleUser: boolean = false;

    constructor(
        public layoutService: LayoutService,
        private httpService: HttpService,
        private generalService: GeneralService,
        private iconService: IconService,
        private authService: AuthService,
        private router: Router
    ) {
        this.loadUser();
        this.updateTime();
        this.loadAnnouncement();
        this.loadWeather();

        this.subscription = interval(30000).subscribe(() => {
            this.loadUser();
            this.updateTime();
            this.loadAnnouncement();
            this.loadWeather();
        });
        this.timeSubscription = interval(1000).subscribe(() => this.updateTime());
    }

    ngOnDestroy() {
        this.subscription?.unsubscribe();
        this.timeSubscription?.unsubscribe();
    }

    private loadUser() {
        try {
            const stored = localStorage.getItem('userData');
            if (stored) {
                const user = JSON.parse(stored);
                this.userName = user?.name || user?.username || 'User';
                if (user?.greeting && typeof user.greeting === 'string') {
                    this.greeting = user.greeting;
                }
            }
        } catch { }
    }

    private updateTime() {
        this.currentTime = moment().format('DD/MM/YYYY, h:mm A');
        this.updateMenuItems();
    }

    private updateMenuItems() {
        this.userMenuItems = [
            { label: `${this.greeting}`, icon: 'pi pi-user', disabled: true, styleClass: 'user-menu-header' },
            { label: this.currentTime, icon: 'pi pi-clock', disabled: true, styleClass: 'user-menu-time' },
            { label: `${this.temperature}°c`, icon: 'pi pi-cloud', disabled: true, styleClass: 'user-menu-weather' },
            { separator: true },
            { label: 'Profile', icon: 'pi pi-user', command: () => this.onProfileClick() },
            { label: 'Settings', icon: 'pi pi-cog', command: () => this.onSettingsClick() },
            { separator: true },
            { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.onLogoutClick() }
        ];
    }

    onProfileClick() {
        console.log('Profile clicked');
    }

    onSettingsClick() {
        console.log('Settings clicked');
        this.router.navigate(['/settings']);
    }

    onLogoutClick() {
        this.authService.logout();
    }

    private loadAnnouncement() {
        this.generalService.getAnnouncement().subscribe({
            next: (resp: any) => {
                const list = resp?.announcements || resp?.data || [];
                if (list.length === 0) {
                    this.announcementText = 'No announcement today';
                } else {
                    this.announcementText = list.map((x: any) => x.message).join(' ● ') || ' ';
                }
            },
            error: () => { this.announcementText = ' '; }
        });
    }

    private loadWeather() {
        this.generalService.getWeather().subscribe({
            next: (resp: any) => {
                const w = resp?.weather || resp?.data || {};
                const temp = w?.temperature ?? w?.temp;
                const condition = w?.condition || '';
                this.temperature = typeof temp === 'string' ? parseFloat(temp) : (temp ?? this.temperature);
                this.weatherIcon = this.iconService.getWeatherIcon(condition);
                this.updateMenuItems();
            },
            error: () => { }
        });
    }

    apiGetUserDetails() {
        const user = localStorage.getItem('userData');
        this.currentUser = user ? JSON.parse(user) : null;
        this.visibleUser = true;
    }
}
