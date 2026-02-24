import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-design',
  standalone: true,
  imports: [
    CommonModule,
    FieldsetModule,
    DividerModule,
    StepperModule,
    ButtonModule,
  ],
  templateUrl: './design.component.html',
  styleUrl: './design.component.scss'
})

export class DesignComponent {
  activeTab: 'design' | 'desc' = 'design';

  activeStep = 1;
  constructor(private router: Router) { }

  goToDescription() {
    this.router.navigate(['package/description']);
  }

  goToDesign() {
    this.router.navigate(['package/design'])
  }
}
