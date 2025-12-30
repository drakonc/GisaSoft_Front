
import { Component, ChangeDetectionStrategy, output, input, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Role, DataService, Permission } from '../../services/data.service';

@Component({
  selector: 'app-permission-assignment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-40 bg-black bg-opacity-50 flex items-center justify-center p-4" (click)="close.emit()">
      <div class="relative bg-white rounded-lg shadow-xl w-full max-w-2xl" (click)="$event.stopPropagation()">
        <!-- Modal Header -->
        <div class="flex items-center justify-between p-4 border-b">
          <h3 class="text-lg font-semibold text-gray-900">
            Asignar Permisos a: <span class="text-blue-600">{{ role().name }}</span>
          </h3>
          <button (click)="close.emit()" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center">
            <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
            <span class="sr-only">Cerrar modal</span>
          </button>
        </div>
        <!-- Modal Body -->
        <form [formGroup]="permissionsForm" (ngSubmit)="onSubmit()">
            <div class="p-6 max-h-[60vh] overflow-y-auto">
                <div class="overflow-x-auto">
                    <table class="w-full text-sm text-left text-gray-500">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 sticky top-0">
                            <tr>
                                <th scope="col" class="px-6 py-3">Permiso</th>
                                <th scope="col" class="px-6 py-3">Categoría</th>
                                <th scope="col" class="px-6 py-3 text-center">Asignar</th>
                            </tr>
                        </thead>
                        <tbody>
                            @for (permission of allPermissions(); track permission.id) {
                                <tr class="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{{ permission.name }}</th>
                                    <td class="px-6 py-4">{{ permission.category }}</td>
                                    <td class="px-6 py-4 text-center">
                                        <input type="checkbox" [formControlName]="permission.id" class="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer">
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <!-- Modal Footer -->
            <div class="flex items-center p-4 border-t border-gray-200 rounded-b justify-end">
                <button (click)="close.emit()" type="button" class="py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">Cancelar</button>
                <button type="submit" class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-3">
                    Guardar Cambios
                </button>
            </div>
        </form>
      </div>
    </div>
  `
})
export class PermissionAssignmentComponent implements OnInit {
  role = input.required<Role>();
  save = output<{ roleId: number; permissionIds: number[] }>();
  close = output<void>();

  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  allPermissions = this.dataService.permissions;
  permissionsForm: FormGroup;

  constructor() {
    this.permissionsForm = this.fb.group({});
    this.allPermissions().forEach(permission => {
        this.permissionsForm.addControl(permission.id.toString(), this.fb.control(false));
    });
  }

  ngOnInit() {
    const assignedPermissionIds = new Set(this.role().permissionIds);
    const formValues: { [key: string]: boolean } = {};
    for (const permission of this.allPermissions()) {
        formValues[permission.id] = assignedPermissionIds.has(permission.id);
    }
    this.permissionsForm.setValue(formValues);
  }

  onSubmit() {
    const selectedPermissionIds = Object.entries(this.permissionsForm.value)
      .filter(([, value]) => value)
      .map(([key]) => parseInt(key, 10));
    
    this.save.emit({
        roleId: this.role().id!,
        permissionIds: selectedPermissionIds
    });
  }
}
