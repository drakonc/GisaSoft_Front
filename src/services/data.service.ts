
import { Injectable, signal } from '@angular/core';

export interface Patient {
  id?: number;
  name: string;
  condition: 'Cardiología' | 'Neurología' | 'Oncología' | 'General';
  lastAppointment: string;
  notes: string;
  isActive: boolean;
  status: 'active' | 'discharged';
}

export interface Appointment {
    id?: number;
    patientName: string;
    doctorName: string;
    date: string;
    time: string;
    status: 'scheduled' | 'completed' | 'canceled';
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private nextPatientId = 4;
  private nextAppointmentId = 4;

  readonly patients = signal<Patient[]>([
    { id: 1, name: 'Carlos Ramirez', condition: 'Cardiología', lastAppointment: '2024-07-15', notes: 'Revisión anual de marcapasos.', isActive: true, status: 'active' },
    { id: 2, name: 'Sofia Torres', condition: 'Neurología', lastAppointment: '2024-06-20', notes: 'Seguimiento de migrañas crónicas.', isActive: true, status: 'active' },
    { id: 3, name: 'Luis Morales', condition: 'Oncología', lastAppointment: '2024-08-01', notes: 'Inicio de nuevo ciclo de quimioterapia.', isActive: false, status: 'discharged' },
  ]);

  readonly appointments = signal<Appointment[]>([
      { id: 1, patientName: 'Carlos Ramirez', doctorName: 'Dr. Garcia', date: '2024-08-15', time: '10:00 AM', status: 'scheduled' },
      { id: 2, patientName: 'Sofia Torres', doctorName: 'Dra. Hernandez', date: '2024-08-12', time: '11:30 AM', status: 'completed' },
      { id: 3, patientName: 'Ana Gomez', doctorName: 'Dr. Garcia', date: '2024-08-10', time: '09:00 AM', status: 'canceled' },
  ]);

  // Patient Methods
  addPatient(patient: Omit<Patient, 'id'>) {
    const newPatient: Patient = { ...patient, id: this.nextPatientId++ };
    this.patients.update(patients => [...patients, newPatient]);
  }

  updatePatient(updatedPatient: Patient) {
    this.patients.update(patients => 
      patients.map(p => p.id === updatedPatient.id ? updatedPatient : p)
    );
  }

  deletePatient(id: number) {
    this.patients.update(patients => patients.filter(p => p.id !== id));
  }

  // Appointment Methods
  addAppointment(appointment: Omit<Appointment, 'id'>) {
      const newAppointment: Appointment = { ...appointment, id: this.nextAppointmentId++ };
      this.appointments.update(appointments => [...appointments, newAppointment]);
  }

  updateAppointment(updatedAppointment: Appointment) {
      this.appointments.update(appointments => 
          appointments.map(a => a.id === updatedAppointment.id ? updatedAppointment : a)
      );
  }

  deleteAppointment(id: number) {
      this.appointments.update(appointments => appointments.filter(a => a.id !== id));
  }
}
