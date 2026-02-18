import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';
import { LayoutService } from '../service/layout.service';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from './app.configurator';
import { MenuModule } from 'primeng/menu';
@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule, StyleClassModule, MenuModule],
    template: `<div class="flex flex-col h-full">
            <!-- <label class="px-4 pt-4 pb-2 text-xs text-muted-color">MENU</label> -->
            <ul class="layout-menu">
                <ng-container *ngFor="let item of model; let i = index">
                    <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                    <li *ngIf="item.separator" class="menu-separator"></li>
                </ng-container>
            </ul>
        </div>`
})
export class AppMenu {
    @Output() logout = new EventEmitter<any>();
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'MENU',
                items: [
                    {label: 'Dashboard',icon: 'pi pi-th-large', routerLink: ['/main/dashboard-a']},
                    {label: 'Floor Navigation',icon: 'pi pi-sitemap', routerLink: ['/main/floor']},
                    {label: 'Chiller Plant',icon: 'pi pi-slack',routerLink: ['/main/chiller']},
                    {label: 'Services', icon: 'pi pi-wrench', items: [
                            {label: 'Air Conditioning',items: [
                                    {label: 'Air Handling Unit (AHU)',routerLink: ['/main/ahu']},
                                    {label: 'Variable Air Volume (VAV)',routerLink: ['/main/vav']},
                                    {label: 'Fan Coil Unit (FCU)',routerLink: ['/main/fcu']}
                            ]},

                            {label: 'Mechanical Ventilation',routerLink: ['/main/mv']},
                            {label: 'Generator Set',routerLink: ['/main/genset']},
                            {label: 'Pump',routerLink: ['/main/pump']},
                            {label: 'Electrical', items: [
                                    {label: 'Power Distribution Board (PDB)',routerLink: ['/main/pdb']},
                                    {label: 'Breaker',routerLink: ['/main/breaker']}
                            ]}]},

                    {label: 'Alarm',icon: 'pi pi-exclamation-triangle',routerLink: ['/main/alarm']},
                    {label: 'User List',icon: 'pi pi-users',routerLink: ['/main/user']},
                    {label: 'Event Log', icon: 'pi pi-warehouse', routerLink: ['/main/eventlog']},
                ]
            }
        ];
    }


    constructor(
        public layoutService: LayoutService,
        public router: Router
    ) { }
}
