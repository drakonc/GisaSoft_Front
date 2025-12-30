
import { Component, ChangeDetectionStrategy, output, input, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Role } from '../../services/data.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  role = input<Role | null>(null);
  title = input.required<string>();
  save = output<Omit<Role, 'permissionIds'>>();
  close = output<void>();

  private fb = inject(FormBuilder);

  roleForm = this.fb.group({
    id: [null as number | null],
    code: ['', Validators.required],
    name: ['', Validators.required],
    description: ['', Validators.required],
  });

  ngOnInit() {
    const roleData = this.role();
    if (roleData) {
      this.roleForm.patchValue(roleData);
    }
  }

  get f() { return this.roleForm.controls; }

  onSubmit() {
    if (this.roleForm.valid) {
      this.save.emit(this.roleForm.getRawValue() as Omit<Role, 'permissionIds'>);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}
