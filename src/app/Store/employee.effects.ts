import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { EmployeeService } from '../services/employee.service';

@Injectable()
export class empEffects {
  constructor(private actions$: Actions, private service: EmployeeService) {}
}
