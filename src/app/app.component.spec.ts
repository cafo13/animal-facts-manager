import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthModule } from '@auth0/auth0-angular';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        HeaderComponent,
        AuthModule.forRoot({
          domain: 'some-domain',
          clientId: 'some-client-id',
          authorizationParams: {
            redirect_uri: window.location.origin,
            audience: 'some-audience',
            scope:
              'openid profile email get:fact approve:fact create:fact delete:fact get:fact unapprove:fact update:fact',
          },
        }),
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
