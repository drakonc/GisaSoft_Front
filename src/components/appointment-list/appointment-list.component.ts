
import { Component, ChangeDetectionStrategy, output, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Appointment } from '../../services/data.service';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentListComponent {
  addAppointment = output<void>();
  editAppointment = output<Appointment>();
  deleteAppointment = output<number>();

  private dataService = inject(DataService);
  appointments = this.dataService.appointments;

  getStatusClass(status: 'scheduled' | 'completed' | 'canceled') {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'canceled': return 'bg-red-100 text-red-800';
      default: return '';
    }
  }
}
