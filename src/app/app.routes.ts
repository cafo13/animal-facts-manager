import { Routes } from '@angular/router';
import { FactsComponent } from './components/facts/facts.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'facts', pathMatch: 'full' },
  {
    path: 'facts',
    component: FactsComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
