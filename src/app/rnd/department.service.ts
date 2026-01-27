import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createFeatureSelector } from '@ngrx/store';
import { DepartmentState } from '../state/reducer';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {

  constructor(private http: HttpClient) { }

  getDepartments() {
    return this.http.get('https://api.freeprojectapi.com/api/EmployeeApp/GetDepartments');
  } 
}

export const selectDepartmentState = createFeatureSelector<DepartmentState>('department');
