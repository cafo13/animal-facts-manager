import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthButtonComponent } from './auth-button.component';
import { AuthModule } from '@auth0/auth0-angular';

describe('AuthButtonComponent', () => {
  let component: AuthButtonComponent;
  let fixture: ComponentFixture<AuthButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthButtonComponent,
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

    fixture = TestBed.createComponent(AuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
