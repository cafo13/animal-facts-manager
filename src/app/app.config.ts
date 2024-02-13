import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AuthModule } from '@auth0/auth0-angular';

import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { DecimalPipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    DecimalPipe,
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(
      AuthModule.forRoot({
        domain: environment.auth0Domain,
        clientId: environment.auth0ClientId,
        authorizationParams: {
          redirect_uri: window.location.origin,
          audience: environment.auth0Audience,
          scope:
            'openid profile email get:fact approve:fact create:fact delete:fact get:fact unapprove:fact update:fact',
        },
      })
    ),
  ],
};
