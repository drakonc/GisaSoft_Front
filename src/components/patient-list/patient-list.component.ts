
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Patient } from '../../services/data.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListComponent {
  addPatient = output<void>();
  editPatient = output<Patient>();

  private dataService = inject(DataService);
  patients = this.dataService.patients;

  deletePatient(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar a este paciente?')) {
      this.dataService.deletePatient(id);
    }
  }

  getStatusClass(status: 'active' | 'discharged') {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }
}
