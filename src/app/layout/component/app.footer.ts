import { Component } from '@angular/core';
import { ChatbotComponent } from '../../shared/chatbot/chatbot.component';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [ChatbotComponent],
    template: `<div class="layout-footer">
        <div class="footer-left">
            <app-chatbot></app-chatbot>
        </div>
        <div class="footer-center">
            Admin by <b>RDMA</b>
        </div>
        <div class="footer-right"></div>
    </div>`
})
export class AppFooter {}
