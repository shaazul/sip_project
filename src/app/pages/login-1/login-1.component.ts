import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { PasswordModule } from 'primeng/password';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';

import { Router } from '@angular/router';

import { AppFloatingConfigurator } from '../../layout/component/app.floatingconfigurator';

@Component({
  selector: 'app-login-1',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    CheckboxModule,
    PasswordModule,
    InputTextModule,
    ToastModule,
    AppFloatingConfigurator
  ],
  templateUrl: './login-1.component.html',
  styleUrl: './login-1.component.scss'
})
export class Login1Component {

  username = '';
  password = '';
  checked = false;
  submitted = false;

  onSignIn() {
    this.submitted = true;

    if (!this.username || !this.password) {
      return;
    }

    console.log('Login success', this.username, this.password, this.checked);
  }

  constructor(private router: Router) { }

  goToUC() {
    this.router.navigate(['main/dashboard-a']);
  }
}
