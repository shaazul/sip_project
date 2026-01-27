import { Routes } from '@angular/router';
import { AppLayout } from './app/layout/component/app.layout';
import { Notfound } from './app/pages/notfound/notfound';
import { SettingsComponent } from './app/pages/settings/settings.component';
import { ChangePasswordComponent } from './app/pages/settings/change-password/change-password.component';
import { AuthGuard } from './app/pages/auth/auth.guard';
import { RoleGuard } from './app/pages/auth/role.guard';
import { LandingPageComponent } from './app/pages/landing-page/landing-page.component';
import { MarqueeSettingComponent } from './app/pages/marquee-setting/marquee-setting.component';

import { UserTemplateComponent } from './app/pages/user/user-template/user-template.component';
import { Test } from './app/pages/test';
import { CatalogueComponent } from './app/pages/catalogue/catalogue.component';
import { Login } from './app/pages/auth/login';
import { Login1Component } from './app/pages/login-1/login-1.component';
import { DashboardAComponent } from './app/pages/dashboard-a/dashboard-a.component';
import { TableComponent } from './app/pages/table/table.component';
import { AhuTableComponent } from './app/pages/ahu-table/ahu-table.component';
import { VavComponent } from './app/pages/vav/vav.component';
import { GensetComponent } from './app/pages/genset/genset.component';
import { PdbComponent } from './app/pages/pdb/pdb.component';
import { UserListComponent } from './app/pages/user-list/user-list.component';
import { MvComponent } from './app/pages/mv/mv.component';
import { FcuComponent } from './app/pages/fcu/fcu.component';
import { PumpComponent } from './app/pages/pump/pump.component';
import { BreakerComponent } from './app/pages/breaker/breaker.component';
import { AlarmComponent } from './app/pages/alarm/alarm.component';
import { FloorComponent } from './app/pages/floor/floor.component';
import { AppLayout2 } from './app/layout/component/app.layout-2';

export const appRoutes: Routes = [
    // Redirect the root URL to login
    { path: '', pathMatch: 'full', redirectTo: 'auth/login' },
    // { path: 'catalogue', pathMatch: 'full', component: CatalogueComponent },
    // Load auth routes early to avoid capturing by the shell route
    // { path: 'auth', loadChildren: () => import('./app/pages/auth/auth.routes').then(m => m.default) },
    // {
    //     path: '',
    //     component: AppLayout,
    //     // canActivate: [AuthGuard],
    //     children: [
    //         { path: '', component: LandingPageComponent },
    //         // { path: 'catalogue', component: CatalogueComponent},
    //         { path: 'chiller', component: TableComponent},
    //         { path: 'ahu', component: AhuTableComponent},
    //         { path: 'vav', component: VavComponent},
    //         { path: 'genset', component: GensetComponent},
    //         { path: 'pdb', component: PdbComponent},
    //         { path: 'user', component:UserListComponent},
    //         { path: 'mv', component: MvComponent},
    //         { path: 'fcu', component: FcuComponent},
    //         { path: 'pump', component: PumpComponent},
    //         { path: 'breaker', component: BreakerComponent},
    //         { path: 'alarm', component: AlarmComponent},
    //         { path: 'floor', component: FloorComponent},
    //         { path: 'dashboard-a', component: DashboardAComponent},
    //         { path: 'login-1', component: Login1Component},
    //         { path: 'landing', component: LandingPageComponent },
    //         { path: 'change-password', component: ChangePasswordComponent },
    //         { path: 'settings', component: SettingsComponent },
    //         { path: 'testing-page', component: Test },
    //         { path: 'profile', component: UserTemplateComponent },
    //         { path: 'marquee-setting', component: MarqueeSettingComponent },
    //     ]
    // },
    {
        path: 'main',
        component: AppLayout,
        // canActivate: [AuthGuard],
        children: [
            { path: '', component: LandingPageComponent },
            // { path: 'landing', component: LandingPageComponent },
            // { path: 'catalogue', component: CatalogueComponent},
            { path: 'chiller', component: TableComponent},
            { path: 'ahu', component: AhuTableComponent},
            { path: 'vav', component: VavComponent},
            { path: 'genset', component: GensetComponent},
            { path: 'pdb', component: PdbComponent},
            { path: 'user', component:UserListComponent},
            { path: 'mv', component: MvComponent},
            { path: 'fcu', component: FcuComponent},
            { path: 'pump', component: PumpComponent},
            { path: 'breaker', component: BreakerComponent},
            { path: 'alarm', component: AlarmComponent},
            { path: 'floor', component: FloorComponent},
            { path: 'dashboard-a', component: DashboardAComponent},
            { path: 'login-1', component: Login1Component},
            { path: 'landing', component: LandingPageComponent },
            { path: 'change-password', component: ChangePasswordComponent },
            { path: 'settings', component: SettingsComponent },
            { path: 'testing-page', component: Test },
            { path: 'profile', component: UserTemplateComponent },
            { path: 'marquee-setting', component: MarqueeSettingComponent },
        ]
    },
     {
        path: 'package',
        component: AppLayout2,
        // canActivate: [AuthGuard],
        children: [
            { path: 'landing', component: LandingPageComponent },
            { path: 'catalogue', component: CatalogueComponent},
        ]
    },
    { path: 'notfound', component: Notfound },
    { path: '**', redirectTo: '/notfound' }
];
