import { createReducer } from '@ngrx/store';
import { employeeState } from './employee.state';

const _employeeReducer = createReducer(employeeState);

export function employeeReducer(state: any, action: any) {
  return employeeReducer(state, action);
}
