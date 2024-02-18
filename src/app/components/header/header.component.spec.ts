import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AuthModule } from '@auth0/auth0-angular';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
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

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
