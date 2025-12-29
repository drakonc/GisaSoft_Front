
import { Component, ChangeDetectionStrategy, output, input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Role, DataService, Permission } from '../../services/data.service';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleFormComponent implements OnInit {
  role = input<Role | null>(null);
  save = output<Role>();
  cancel = output<void>();

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  allPermissions = this.dataService.permissions;

  roleForm = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    description: ['', Validators.required],
    permissions: this.fb.group({})
  });

  readonly titleInfo = computed(() => {
    const isEditing = !!this.role();
    return {
      title: isEditing ? 'Editar Rol' : 'Añadir Nuevo Rol',
      subtitle: `Rellene el formulario para ${isEditing ? 'actualizar el rol' : 'añadir un nuevo rol'}.`
    };
  });

  constructor() {
    this.buildPermissionsForm();
  }

  ngOnInit() {
    const roleData = this.role();
    if (roleData) {
      this.roleForm.patchValue({
        id: roleData.id,
        name: roleData.name,
        description: roleData.description,
      });
      
      const permissionsValue: { [key: string]: boolean } = {};
      for (const permission of this.allPermissions()) {
          permissionsValue[permission.id] = roleData.permissionIds.includes(permission.id);
      }
      this.roleForm.controls.permissions.setValue(permissionsValue);
    }
  }

  private buildPermissionsForm() {
    const permissionsGroup = this.roleForm.get('permissions') as FormControl;
    this.allPermissions().forEach(permission => {
        (permissionsGroup as any).addControl(permission.id.toString(), this.fb.control(false));
    });
  }

  get f() { return this.roleForm.controls; }

  onSubmit() {
    if (this.roleForm.valid) {
      const formValue = this.roleForm.getRawValue();
      const selectedPermissionIds = Object.entries(formValue.permissions)
        .filter(([, value]) => value)
        .map(([key]) => parseInt(key, 10));

      const roleToSave: Role = {
        id: formValue.id ?? undefined,
        name: formValue.name,
        description: formValue.description,
        permissionIds: selectedPermissionIds
      };
      
      this.save.emit(roleToSave);
    } else {
      this.roleForm.markAllAsTouched();
    }
  }
}
