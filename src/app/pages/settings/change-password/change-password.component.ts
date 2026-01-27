import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { HttpService } from '../../service/http.service';
import { environment } from '../../../../environments/environments.development';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

import { ToastModule } from 'primeng/toast';
@Component({
    selector: 'app-change-password',
    imports: [CommonModule, FormsModule, ButtonModule, CardModule, PasswordModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent {
    oldPassword: any = '';
    newPassword: any = '';
    reconfirmPassword: any = '';

    constructor(
        private httpService: HttpService,
        private service: MessageService,
        private router: Router,
        private messageService: MessageService
    ) {}
    apiChangePassword() {
        const url = environment.apiEndPoint + environment.api_base + '/user-access/change-password';
        const formData = new FormData();

        formData.append('old_password', this.oldPassword?.toString() || '');
        formData.append('password', this.newPassword?.toString() || '');
        formData.append('password_confirmation', this.reconfirmPassword?.toString() || '');

        this.httpService.postData(url, formData).subscribe({
            next: (response: any) => {
                this.oldPassword = '';
                this.newPassword = '';
                this.reconfirmPassword = '';
                // this.router.navigate(['/watchdog']);
                this.messageService.add({ severity: 'success', summary: 'Success', detail: response.message });
            },
            error: (error) => {}
        });
    }
}
