import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [
    ButtonModule,
    RouterModule
  ],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent {
    constructor(private router: Router) { }

  goToDashboardComponent() {
    this.router.navigate(['/package/login-1']);
  }

    goToUnityComponent() {
    this.router.navigate(['/package/description']);
  }
}
