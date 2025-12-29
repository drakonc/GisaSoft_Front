
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Role } from '../../services/data.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent {
  addRole = output<void>();
  editRole = output<Role>();

  private dataService = inject(DataService);
  roles = this.dataService.roles;
  private allPermissions = this.dataService.permissions;

  getPermissionNames(permissionIds: number[]): string[] {
    return this.allPermissions()
      .filter(p => permissionIds.includes(p.id))
      .map(p => p.name);
  }

  deleteRole(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar este rol?')) {
      this.dataService.deleteRole(id);
    }
  }
}
