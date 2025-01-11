import { MatButtonModule } from '@angular/material/button';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-employee',
  imports: [
    MatCardModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatInputModule,
    MatIconModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-employee.component.html',
  styleUrl: './add-employee.component.scss',
})
export class AddEmployeeComponent {
  constructor(
    private employeeService: EmployeeService,
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toaster: ToastrService
  ) {}
  title = 'Add Employee';
  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });
  saveEmployee() {
    if (this.empForm.valid) {
      let _data: Employee = {
        id: this.empForm.get('id')?.value ?? 0,
        name: this.empForm.get('name')?.value ?? '',
        doj: this.empForm.get('doj')?.value ?? new Date(),
        role: this.empForm.get('role')?.value ?? '',
        salary: this.empForm.get('salary')?.value ?? 0,
      };
      this.employeeService.addEmployee(_data).subscribe(() => {
        // alert('saved');
        this.toaster.success('Added User', 'Created');
        this.closePopup();
      });
    }
  }
  closePopup() {
    this.ref.close();
  }
}
