import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee';

export const LOAD_EMPLOYEE = 'employee getall';
export const LOAD_EMPLOYEE_SUCCESS = 'employee getall success';
export const LOAD_EMPLOYEE_FAILURE = 'employee getall failure';
const loadAllEmployees = createAction(LOAD_EMPLOYEE);
const loadAllEmployeesSuccess = createAction(
  LOAD_EMPLOYEE_SUCCESS,
  props<{ list: Employee[] }>()
);
const loadAllEmployeesFailure = createAction(
  LOAD_EMPLOYEE_FAILURE,
  props<{ errMsg: string }>()
);
