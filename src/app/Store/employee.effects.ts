import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';
import {
  deleteEmployee,
  deleteEmployeeSuccess,
  emptyAction,
  loadEmployee,
  loadEmployeeFailure,
  loadEmployeeSuccess,
} from './employee.action';
import { catchError, exhaustMap, map, of, switchMap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class empEffects {
  // constructor(private actions$: Actions, private service: EmployeeService) {}
  actions$ = inject(Actions);
  service = inject(EmployeeService);
  toastr = inject(ToastrService);

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
  _deleteEmployee = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteEmployee),
      switchMap((action) => {
        return this.service.deleteEmployee(action.empId).pipe(
          switchMap((data) => {
            return of(
              deleteEmployeeSuccess({ empId: action.empId }),
              this.showAlert(`Deleted User Successfully`, 'pass')
            );
          }),
          catchError((err) => of(this.showAlert(err.message, 'fail')))
        );
      })
    )
  );

  showAlert(message: string, response: responseType) {
    if (response == 'pass') {
      this.toastr.success(message, 'Deleted');
    } else if (response == 'fail') {
      this.toastr.error(message, 'Failed');
    }
    return emptyAction();
  }
}
