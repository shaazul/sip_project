import { Component } from '@angular/core';
import { ChatbotComponent } from '../../shared/chatbot/chatbot.component';

@Component({
    standalone: true,
    selector: 'app-footer',
    imports: [],
    template: `<div class="layout-footer">
        <div class="layout-footer">
            <div class="footer-center">
                Admin by <b>RDMA</b>
            </div>
        </div>
    `,
    styles: [`
        .layout-footer {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 3rem;
        }
    `]
})
export class AppFooter { }
