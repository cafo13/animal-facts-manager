import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactsComponent } from './facts.component';
import { AuthModule } from '@auth0/auth0-angular';
import { DecimalPipe } from '@angular/common';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('FactsComponent', () => {
  let component: FactsComponent;
  let fixture: ComponentFixture<FactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        FactsComponent,
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
      providers: [DecimalPipe, HttpClient, HttpHandler],
    }).compileComponents();

    fixture = TestBed.createComponent(FactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
