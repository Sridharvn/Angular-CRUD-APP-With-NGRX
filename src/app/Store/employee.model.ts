import { Employee } from '../models/employee';

export interface EmployeeModel {
  list: Employee[];
  errorMessage: string;
}
