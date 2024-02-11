import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment.prod';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth0_domain,
        clientId: environment.auth0_client_id,
        authorizationParams: {
          redirect_uri: window.location.origin,
        },
      })
    ),
  ],
};
