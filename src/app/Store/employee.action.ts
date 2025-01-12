import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee';

export const LOAD_EMPLOYEE = '[employee] getall';
export const LOAD_EMPLOYEE_SUCCESS = '[employee] getall success';
export const LOAD_EMPLOYEE_FAILURE = '[employee] getall failure';

export const DELETE_EMPLOYEE = '[employee] delete ';
export const DELETE_EMPLOYEE_SUCCESS = '[employee] delete success';

export const loadEmployee = createAction(LOAD_EMPLOYEE);
export const loadEmployeeSuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list: Employee[] }>()
);
export const loadEmployeeFailure = createAction(
  LOAD_EMPLOYEE_FAILURE,
  props<{ errMsg: string }>()
);

export const deleteEmployee = createAction(
  DELETE_EMPLOYEE,
  props<{ empId: number }>()
);
export const deleteEmployeeSuccess = createAction(
  DELETE_EMPLOYEE_SUCCESS,
  props<{ empId: number }>()
);

export const emptyAction = createAction('Empty Action');
