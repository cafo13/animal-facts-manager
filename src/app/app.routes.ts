import { Routes } from '@angular/router';
import { FactsComponent } from './components/facts/facts.component';

export const routes: Routes = [
  { path: '', redirectTo: 'facts', pathMatch: 'full' },
  {
    path: 'facts',
    component: FactsComponent,
  },
];
