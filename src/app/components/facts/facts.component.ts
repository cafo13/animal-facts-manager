import { Component } from '@angular/core';
import { AuthButtonComponent } from '../auth-button/auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Fact, FactService } from '../../services/fact.service';
import { ApprovedPipe } from '../../pipes/approved.pipe';

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [CommonModule, AuthButtonComponent, AsyncPipe, ApprovedPipe],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.sass',
})
export class FactsComponent {
  facts$: Observable<Fact[]>;

  constructor(public auth: AuthService, public factService: FactService) {
    this.facts$ = factService.getAllFacts();
    this.facts$.subscribe((facts) =>
      console.log(`loaded ${facts.length} facts`)
    );
  }
}
