import { createReducer, on } from '@ngrx/store';
import { employeeState } from './employee.state';
import {
  deleteEmployeeSuccess,
  loadEmployeeFailure,
  loadEmployeeSuccess,
} from './employee.action';

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
  }),
  on(deleteEmployeeSuccess, (state, action) => {
    const _newData = state.list.filter((item) => item.id != action.empId);
    return {
      ...state,
      list: _newData,
      errorMessage: ' ',
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
