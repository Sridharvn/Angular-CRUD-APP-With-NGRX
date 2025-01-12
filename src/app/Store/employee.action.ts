import { createAction, props } from '@ngrx/store';
import { Employee } from '../models/employee';

export const LOAD_EMPLOYEE = '[employee] getall';
export const LOAD_EMPLOYEE_SUCCESS = '[employee] getall success';
export const LOAD_EMPLOYEE_FAILURE = '[employee] getall failure';

export const GET_EMPLOYEE = '[employee] get employee ';

export const DELETE_EMPLOYEE = '[employee] delete ';
export const DELETE_EMPLOYEE_SUCCESS = '[employee] delete success';
export const ADD_EMPLOYEE = '[employee] add ';
export const ADD_EMPLOYEE_SUCCESS = '[employee] add success';
export const UPDATE_EMPLOYEE = '[employee] update ';
export const UPDATE_EMPLOYEE_SUCCESS = '[employee] update success';

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
export const addEmployee = createAction(
  ADD_EMPLOYEE,
  props<{ data: Employee }>()
);
export const addEmployeeSuccess = createAction(
  ADD_EMPLOYEE_SUCCESS,
  props<{ data: Employee }>()
);
export const updateEmployee = createAction(
  UPDATE_EMPLOYEE,
  props<{ data: Employee }>()
);
export const updateEmployeeSuccess = createAction(
  UPDATE_EMPLOYEE_SUCCESS,
  props<{ data: Employee }>()
);
export const getEmployee = createAction(
  GET_EMPLOYEE,
  props<{ empId: number }>()
);

export const emptyAction = createAction('Empty Action');
