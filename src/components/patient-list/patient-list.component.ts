
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Patient } from '../../services/data.service';
import { PatientFormComponent } from '../patient-form/patient-form.component';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  imports: [CommonModule, PatientFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientListComponent {
  private dataService = inject(DataService);
  patients = this.dataService.patients;

  isModalOpen = signal(false);
  patientToEdit = signal<Patient | null>(null);

  openAddModal() {
    this.patientToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(patient: Patient) {
    this.patientToEdit.set(patient);
    this.isModalOpen.set(true);
  }

  handleCloseModal() {
    this.isModalOpen.set(false);
    this.patientToEdit.set(null);
  }

  handleSavePatient(patient: Patient) {
    if (patient.id) {
      this.dataService.updatePatient(patient);
    } else {
      this.dataService.addPatient(patient);
    }
    this.handleCloseModal();
  }

  deletePatient(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar a este paciente?')) {
      this.dataService.deletePatient(id);
    }
  }

  getStatusClass(status: 'active' | 'discharged') {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800';
  }
}
