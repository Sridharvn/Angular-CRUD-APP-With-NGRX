import { MatButtonModule } from '@angular/material/button';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
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
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectEmployee } from '../../Store/employee.selector';
import {
  updateEmployee,
  addEmployee,
  getEmployee,
} from '../../Store/employee.action';

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
export class AddEmployeeComponent implements OnInit, OnDestroy {
  private subscription: Subscription = new Subscription();

  constructor(
    private ref: MatDialogRef<AddEmployeeComponent>,
    private toaster: ToastrService,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  title = 'Add Employee';
  isEdit: boolean = false;
  dialogData: any;
  empForm = new FormGroup({
    id: new FormControl(0),
    name: new FormControl('', Validators.required),
    doj: new FormControl(new Date(), Validators.required),
    role: new FormControl('', Validators.required),
    salary: new FormControl(0, Validators.required),
  });

  ngOnInit() {
    this.dialogData = this.data;
    if (this.data.code > 0) {
      this.isEdit = true;
      this.title = 'Edit Employee';
      this.store.dispatch(getEmployee({ empId: this.dialogData.code }));
      this.store.select(selectEmployee).subscribe((response) => {
        if (response != null) {
          this.empForm.setValue({
            id: response.id,
            name: response.name,
            doj: new Date(response.doj),
            role: response.role,
            salary: response.salary,
          });
        }
      });
    }
  }

  saveEmployee() {
    if (this.empForm.valid) {
      let _data: Employee = {
        id: this.empForm.get('id')?.value ?? 0,
        name: this.empForm.get('name')?.value ?? '',
        doj: this.empForm.get('doj')?.value ?? new Date(),
        role: this.empForm.get('role')?.value ?? '',
        salary: this.empForm.get('salary')?.value ?? 0,
      };
      if (this.isEdit) {
        this.store.dispatch(updateEmployee({ data: _data }));
        this.closePopup();
      } else {
        this.store.dispatch(addEmployee({ data: _data }));
        this.closePopup();
      }
    }
  }

  closePopup() {
    this.ref.close();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
