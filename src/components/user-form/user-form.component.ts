
import { Component, ChangeDetectionStrategy, output, input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { User, DataService } from '../../services/data.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent implements OnInit {
  user = input<User | null>(null);
  save = output<User>();
  cancel = output<void>();

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);
  
  roles = this.dataService.roles;
  locations = this.dataService.locations;

  userForm = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    roleId: [null as number | null, Validators.required],
    locationId: [null as number | null, Validators.required],
    status: ['active' as 'active' | 'inactive', Validators.required]
  });

  readonly title = computed(() => this.user() ? 'Editar Usuario' : 'Añadir Nuevo Usuario');

  ngOnInit() {
    const userData = this.user();
    if (userData) {
      this.userForm.patchValue(userData);
    }
  }

  get f() { return this.userForm.controls; }

  onSubmit() {
    if (this.userForm.valid) {
      this.save.emit(this.userForm.getRawValue() as User);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
