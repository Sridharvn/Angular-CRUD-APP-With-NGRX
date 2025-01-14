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
import { Store } from '@ngrx/store';
import { deleteEmployee, loadEmployee } from '../../Store/employee.action';
import { getEmpList } from '../../Store/employee.selector';

@Component({
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatDialogModule, MatTableModule],
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.scss',
})
export class EmployeeComponent implements OnInit, OnDestroy {
  empList: Employee[] = [];
  dataTable!: MatTableDataSource<Employee>;
  displayedColumns = ['id', 'name', 'doj', 'role', 'salary', 'action'];
  subscriptions = new Subscription();
  constructor(private dialog: MatDialog, private store: Store) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }
  getAllEmployees() {
    this.store.dispatch(loadEmployee());
    this.store.select(getEmpList).subscribe((response) => {
      this.empList = response;
      this.dataTable = new MatTableDataSource(this.empList);
    });
  }

  addEmployee() {
    this.openPopup(0);
  }

  openPopup(id: number) {
    this.dialog
      .open(AddEmployeeComponent, {
        width: '50%',
        enterAnimationDuration: '1000ms',
        exitAnimationDuration: '1000ms',
        data: {
          code: id,
        },
      })
      .afterClosed()
      .subscribe(() => this.getAllEmployees());
  }
  editEmployee(id: number) {
    this.openPopup(id);
  }
  deleteEmployee(id: number) {
    if (confirm('Are you sure?')) {
      this.store.dispatch(deleteEmployee({ empId: id }));
    }
  }
}
