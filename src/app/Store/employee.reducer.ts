import { createReducer, on } from '@ngrx/store';
import { employeeState } from './employee.state';
import {
  addEmployeeSuccess,
  deleteEmployeeSuccess,
  getEmployee,
  loadEmployeeFailure,
  loadEmployeeSuccess,
  updateEmployeeSuccess,
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
  }),
  on(addEmployeeSuccess, (state, action) => {
    const _newData = { ...action.data };
    return {
      ...state,
      list: [...state.list, _newData],
      errorMessage: ' ',
    };
  }),
  on(updateEmployeeSuccess, (state, action) => {
    const _newData = state.list.map((item) => {
      return item.id == action.data.id ? action.data : item;
    });
    return {
      ...state,
      list: _newData,
      errorMessage: ' ',
    };
  }),
  on(getEmployee, (state, action) => {
    let _newData = state.list.find((item) => item.id == action.empId);
    if (_newData == null) {
      _newData = state.empObj;
    }
    return {
      ...state,
      empObj: _newData,
    };
  })
);

export function employeeReducer(state: any, action: any) {
  return _employeeReducer(state, action);
}
