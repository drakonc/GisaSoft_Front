
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Patient, Appointment, DataService } from './services/data.service';


export type ActiveView = 'dashboard' | 'patient-list' | 'patient-form' | 'appointment-list' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, DashboardComponent, PatientFormComponent, PatientListComponent, AppointmentListComponent, LoginComponent, ProfileComponent, AppointmentFormComponent]
})
export class AppComponent {
  private dataService = inject(DataService);

  isLoggedIn = signal(false);
  isSidebarOpen = signal(false);
  activeView = signal<ActiveView>('dashboard');
  patientToEdit = signal<Patient | null>(null);
  
  isProfileMenuOpen = signal(false);
  isAppointmentModalOpen = signal(false);
  appointmentToEdit = signal<Appointment | null>(null);

  readonly pageInfo = computed(() => {
    switch (this.activeView()) {
      case 'dashboard':
        return { title: 'Dashboard', subtitle: 'Resumen de la actividad reciente de la clínica.' };
      case 'patient-list':
        return { title: 'Todos los Pacientes', subtitle: 'Gestione el registro de sus pacientes.' };
      case 'patient-form':
        const title = this.patientToEdit() ? 'Editar Paciente' : 'Añadir Nuevo Paciente';
        const subtitle = `Rellene el formulario para ${this.patientToEdit() ? 'actualizar el paciente' : 'añadir un nuevo paciente'}.`;
        return { title, subtitle };
      case 'appointment-list':
        return { title: 'Lista de Citas', subtitle: 'Vea y gestione las citas de los pacientes.' };
      case 'profile':
        return { title: 'Mi Perfil', subtitle: 'Gestione su información personal.' };
      default:
        return { title: '', subtitle: '' };
    }
  });

  onLoginSuccess() {
    this.isLoggedIn.set(true);
    this.activeView.set('dashboard');
  }

  onLogout() {
    this.isLoggedIn.set(false);
  }

  toggleSidebar() {
    this.isSidebarOpen.update(v => !v);
  }
  
  toggleProfileMenu() {
    this.isProfileMenuOpen.update(v => !v);
  }

  onViewChange(view: ActiveView) {
    if (view === 'patient-form') {
      this.patientToEdit.set(null); // Ensure we're in "add" mode by default
    }
    this.activeView.set(view);
    this.isProfileMenuOpen.set(false);
    this.closeMobileSidebar();
  }

  onEditPatient(patient: Patient) {
    this.patientToEdit.set(patient);
    this.activeView.set('patient-form');
    this.closeMobileSidebar();
  }

  onSavePatient(patient: Patient) {
    if (patient.id) {
      this.dataService.updatePatient(patient);
    } else {
      this.dataService.addPatient(patient);
    }
    this.activeView.set('patient-list');
  }

  onCancelPatientForm() {
    this.patientToEdit.set(null);
    this.activeView.set('patient-list');
  }
  
  onAddAppointment() {
    this.appointmentToEdit.set(null);
    this.isAppointmentModalOpen.set(true);
  }
  
  onEditAppointment(appointment: Appointment) {
    this.appointmentToEdit.set(appointment);
    this.isAppointmentModalOpen.set(true);
  }

  onDeleteAppointment(id: number) {
    if (confirm('¿Está seguro de que desea eliminar esta cita?')) {
      this.dataService.deleteAppointment(id);
    }
  }
  
  onCloseAppointmentModal() {
    this.isAppointmentModalOpen.set(false);
    this.appointmentToEdit.set(null);
  }

  onSaveAppointment(appointment: Appointment) {
    if (appointment.id) {
      this.dataService.updateAppointment(appointment);
    } else {
      this.dataService.addAppointment(appointment);
    }
    this.onCloseAppointmentModal();
  }

  private closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
