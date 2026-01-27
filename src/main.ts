import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app.config';
import { AppComponent } from './app.component';
import { provideRouter, withEnabledBlockingInitialNavigation } from '@angular/router';
import { appRoutes } from './app.routes';


// bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
bootstrapApplication(AppComponent, appConfig), {
  providers: [
    provideRouter(
      appRoutes,
    //   withScrollRestoration(), // Scroll to top when navigating
      withEnabledBlockingInitialNavigation() // Wait for guards before loading
    ),

  ]
};
