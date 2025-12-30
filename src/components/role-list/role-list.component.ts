
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Role } from '../../services/data.service';
import { RoleFormComponent } from '../role-form/role-form.component';
import { PermissionAssignmentComponent } from '../permission-assignment/permission-assignment.component';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  imports: [CommonModule, RoleFormComponent, PermissionAssignmentComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoleListComponent {
  private dataService = inject(DataService);
  roles = this.dataService.roles;
  private allPermissions = this.dataService.permissions;

  isRoleModalOpen = signal(false);
  isPermissionModalOpen = signal(false);
  selectedRole = signal<Role | null>(null);
  roleModalTitle = signal('');

  getPermissionNames(permissionIds: number[]): string[] {
    return this.allPermissions()
      .filter(p => permissionIds.includes(p.id))
      .map(p => p.name);
  }

  openAddRoleModal(): void {
    this.selectedRole.set(null);
    this.roleModalTitle.set('Añadir Nuevo Rol');
    this.isRoleModalOpen.set(true);
  }

  openEditRoleModal(role: Role): void {
    this.selectedRole.set(role);
    this.roleModalTitle.set('Editar Rol');
    this.isRoleModalOpen.set(true);
  }

  openPermissionModal(role: Role): void {
    this.selectedRole.set(role);
    this.isPermissionModalOpen.set(true);
  }

  handleCloseModals(): void {
    this.isRoleModalOpen.set(false);
    this.isPermissionModalOpen.set(false);
    this.selectedRole.set(null);
  }

  handleSaveRole(roleData: Omit<Role, 'permissionIds'>): void {
    if (roleData.id) {
      this.dataService.updateRole(roleData);
    } else {
      this.dataService.addRole(roleData);
    }
    this.handleCloseModals();
  }

  handleSavePermissions(data: { roleId: number; permissionIds: number[] }): void {
    this.dataService.updateRolePermissions(data.roleId, data.permissionIds);
    this.handleCloseModals();
  }

  deleteRole(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar este rol?')) {
      this.dataService.deleteRole(id);
    }
  }
}
