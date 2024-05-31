import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideAnimations, BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HammerModule } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
  provideAnimations(),
  importProvidersFrom(BrowserAnimationsModule),
    importProvidersFrom(NoopAnimationsModule),
    [importProvidersFrom(HammerModule)]
  ]
};
