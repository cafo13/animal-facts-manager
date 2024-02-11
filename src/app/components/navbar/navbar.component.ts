import { Component } from '@angular/core';
import { NgbNavConfig, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthButtonComponent } from '../auth-button/auth-button.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgbNavModule, AuthButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.sass',
})
export class NavbarComponent {
  constructor(config: NgbNavConfig) {
    // customize default values of navs used by this component tree
    config.destroyOnHide = false;
    config.roles = false;
  }
}
