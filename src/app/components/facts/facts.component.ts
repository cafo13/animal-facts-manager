import { Component, QueryList, ViewChildren } from '@angular/core';
import { AuthButtonComponent } from '../auth-button/auth-button.component';
import { AuthService } from '@auth0/auth0-angular';
import { AsyncPipe, CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbHighlight, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import {
  NgbdSortableHeader,
  SortEvent,
} from '../../directives/sortable.directive';
import { Observable } from 'rxjs';
import { Fact, FactService } from '../../services/fact.service';
import { ApprovedPipe } from '../../pipes/approved.pipe';

@Component({
  selector: 'app-facts',
  standalone: true,
  imports: [
    CommonModule,
    AuthButtonComponent,
    DecimalPipe,
    FormsModule,
    AsyncPipe,
    NgbHighlight,
    NgbdSortableHeader,
    NgbPaginationModule,
    ApprovedPipe,
  ],
  templateUrl: './facts.component.html',
  styleUrl: './facts.component.sass',
})
export class FactsComponent {
  facts$: Observable<Fact[]>;
  total$: Observable<number>;

  @ViewChildren(NgbdSortableHeader) headers:
    | QueryList<NgbdSortableHeader>
    | undefined;

  constructor(public auth: AuthService, public factService: FactService) {
    this.facts$ = factService.facts$;
    this.total$ = factService.total$;
  }

  onSort({ column, direction }: SortEvent) {
    // resetting other headers
    this.headers?.forEach((header: any) => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.factService.sortColumn = column;
    this.factService.sortDirection = direction;
  }
}
