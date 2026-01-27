import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadDepartment } from '../state/action';
import { selectDepartments, selectLoading } from '../state/selector';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-test',
    standalone: true,
    imports: [ AsyncPipe, CommonModule],
    template: `
   <div style="background: red;"> Hellooo</div>
    <ul>
        <li *ngFor="let department of department$ | async">
            {{ department.departmentName }}
        </li>
        <li *ngIf="loading$ | async">Loading...</li>
    </ul>
    `
})
export class Test implements OnInit {

    private store = inject(Store);

    department$ = this.store.select(selectDepartments);
    loading$ = this.store.select(selectLoading);

    ngOnInit() {
        // Dispatch an action to load departments when the app initializes
        this.store.dispatch(loadDepartment());

        console.log(this.department$.subscribe(departments => {
            console.log('Departments loaded:', departments  || 'No departments found');
        }));
        console.log('Loading state:', this.loading$);
        this.loading$.subscribe(loading => {
            console.log('Loading state:', loading);
        });
        console.log(this.loading$);
    }
}
