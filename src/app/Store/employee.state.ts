import { EmployeeModel } from './employee.model';
import { Employee } from '../models/employee';

export const employeeState: EmployeeModel = {
  list: [],
  errorMessage: '',
  empObj: {
    id: 0,
    name: '',
    doj: new Date(),
    role: '',
    salary: 0,
  },
};
