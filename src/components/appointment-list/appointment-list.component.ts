
import { Component, ChangeDetectionStrategy, output, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Appointment } from '../../services/data.service';
import { AppointmentFormComponent } from '../appointment-form/appointment-form.component';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  imports: [CommonModule, AppointmentFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentListComponent {
  sidebarToggle = output<void>();

  private dataService = inject(DataService);
  appointments = this.dataService.appointments;

  isModalOpen = signal(false);
  appointmentToEdit = signal<Appointment | null>(null);

  openAddModal() {
    this.appointmentToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(appointment: Appointment) {
    this.appointmentToEdit.set(appointment);
    this.isModalOpen.set(true);
  }

  closeModal() {
    this.isModalOpen.set(false);
    this.appointmentToEdit.set(null);
  }

  saveAppointment(appointment: Appointment) {
    if (appointment.id) {
      this.dataService.updateAppointment(appointment);
    } else {
      this.dataService.addAppointment(appointment);
    }
    this.closeModal();
  }

  deleteAppointment(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar esta cita?')) {
      this.dataService.deleteAppointment(id);
    }
  }

  getStatusClass(status: 'scheduled' | 'completed' | 'canceled') {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return '';
    }
  }
}
