import { createReducer, on } from '@ngrx/store';
import { employeeState } from './employee.state';
import { loadEmployeeFailure, loadEmployeeSuccess } from './employee.action';

const _employeeReducer = createReducer(
  employeeState,
  on(loadEmployeeSuccess, (state, action) => {
    return {
      ...state,
      list: action.list,
      errorMessage: '',
    };
  }),
  on(loadEmployeeFailure, (state, action) => {
    return {
      ...state,
      list: [],
      errorMessage: action.errMsg,
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return employeeReducer(state, action);
}
