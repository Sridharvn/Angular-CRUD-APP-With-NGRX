import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import {
  loadEmployee,
  loadEmployeeFailure,
  loadEmployeeSuccess,
} from './employee.action';
import { catchError, exhaustMap, map, of } from 'rxjs';

@Injectable()
export class empEffects {
  // constructor(private actions$: Actions, private service: EmployeeService) {}
  actions$ = inject(Actions);
  service = inject(EmployeeService);

  _loadEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(loadEmployee),
      exhaustMap((action) => {
        return this.service.getEmployees().pipe(
          map((data) => {
            return loadEmployeeSuccess({ list: data });
          }),
          catchError((err) => of(loadEmployeeFailure({ errMsg: err.message })))
        );
      })
    )
  );
}
