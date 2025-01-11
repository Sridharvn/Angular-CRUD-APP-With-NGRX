import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  api = 'http://localhost:3000/employee';
  constructor(private http: HttpClient) {}

  getEmployees() {
    return this.http.get<Employee[]>(this.api);
  }

  getEmployeeById(id: number) {
    return this.http.get<Employee>(`${this.api}/${id}`);
  }

  addEmployee(employee: Employee) {
    return this.http.post<Employee>(this.api, employee);
  }

  updateEmployee(id: number, employee: Employee) {
    return this.http.put<Employee>(`${this.api}/${id}`, employee);
  }

  deleteEmployee(id: number) {
    debugger;
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
