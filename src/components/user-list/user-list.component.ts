
import { Component, ChangeDetectionStrategy, inject, signal, computed, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, User } from '../../services/data.service';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent {
  private dataService = inject(DataService);
  users = this.dataService.users;
  private roles = this.dataService.roles;
  private locations = this.dataService.locations;

  addUser = output<void>();
  editUser = output<User>();
  
  private rolesMap = computed(() => new Map(this.roles().map(role => [role.id, role.name])));
  private locationsMap = computed(() => new Map(this.locations().map(loc => [loc.id, loc.name])));

  getRoleName(roleId: number): string {
    return this.rolesMap().get(roleId) || 'N/A';
  }

  getLocationName(locationId: number): string {
    return this.locationsMap().get(locationId) || 'N/A';
  }

  deleteUser(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar a este usuario?')) {
      this.dataService.deleteUser(id);
    }
  }

  getStatusClass(status: 'active' | 'inactive') {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  }
}
