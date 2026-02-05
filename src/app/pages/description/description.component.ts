import { Component } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DividerModule } from 'primeng/divider';
import { FieldsetModule } from 'primeng/fieldset';
import { Router } from '@angular/router';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [BreadcrumbModule, DividerModule, FieldsetModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent {
  activeTab: 'desc' | 'design' = 'desc';

  home = { icon: 'pi pi-home' };

    constructor(private router: Router) { }

  goToDescription() {
    this.router.navigate(['package/description']);
  }

  goToDesign(){
    this.router.navigate(['package/design'])
  }
}