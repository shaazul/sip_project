 import { inject, Injectable } from '@angular/core';
 import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { DepartmentService } from '../rnd/department.service';
import { loadDepartment, loadDepartmentSuccess } from './action';

@Injectable()
export class DepartmentEffects {
  private actions$ = inject(Actions);
//   private departmentService = inject(DeparmentService);

  constructor(private departmentService: DepartmentService) {}

  loadDepartment$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadDepartment),
      mergeMap(() =>
        this.departmentService.getDepartments().pipe(
          map((departments:any) => loadDepartmentSuccess({ departments })),
          catchError(() => of({ type: '[Department] Load Department Failure' }))
        )
      )
    )
  );
}   