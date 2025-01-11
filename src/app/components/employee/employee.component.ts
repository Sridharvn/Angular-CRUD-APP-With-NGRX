import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AddEmployeeComponent } from '../add-employee/add-employee.component';
import { Employee } from '../../models/employee';
import {
  MatTable,
  MatTableDataSource,
  MatTableModule,
} from '@angular/material/table';
import { EmployeeService } from '../../services/employee.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList: Employee[] = [];
  dataTable!: MatTableDataSource<Employee>;
  displayedColumn = ['id', 'name', 'doj', 'role', 'salary', 'action '];
  subscriptions = new Subscription();
  constructor(private dialog: MatDialog, private service: EmployeeService) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  getAllEmployees() {
    let sub = this.service.getEmployees().subscribe((response) => {
      this.empList = response;
    });
    this.subscriptions.add(sub);
  }

  addEmployee() {
    this.dialog.open(AddEmployeeComponent, {
      width: '50%',
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '1000ms',
    });
  }
}
