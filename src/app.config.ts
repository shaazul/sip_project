import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { ApplicationConfig, isDevMode } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withEnabledBlockingInitialNavigation, withInMemoryScrolling } from '@angular/router';
import Aura from '@primeng/themes/aura';
import { providePrimeNG } from 'primeng/config';
import { MessageService } from 'primeng/api';
import { appRoutes } from './app.routes';
import { tokenInterceptor } from './app/token.interceptor';
import { errorInterceptor } from './app/pages/auth/error.interceptor';

import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

// Import your reducers
import { departmentReducer } from './app/state/reducer';
import { DepartmentEffects } from './app/state/effect';
// import { CounterEffects } from './app/state/counter.effects';

import { provideEchartsCore } from 'ngx-echarts';
import * as echarts from 'echarts';

export const appConfig: ApplicationConfig = {
    
    providers: [
    MessageService,
    provideRouter(appRoutes, withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }), withEnabledBlockingInitialNavigation()),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideHttpClient(withInterceptorsFromDi()),
    {
        provide: HTTP_INTERCEPTORS,
        useClass: errorInterceptor,
        multi: true
    },
    provideAnimationsAsync(),
    providePrimeNG({ theme: { preset: Aura, options: { darkModeSelector: '.app-dark' } } }),
    MessageService,
    provideStore({ department: departmentReducer }),
    provideEffects([DepartmentEffects]),
    provideEchartsCore({ echarts })
],
    
};
