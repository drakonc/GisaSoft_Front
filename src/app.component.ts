
import { Component, ChangeDetectionStrategy, signal, computed, inject } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { RoleFormComponent } from './components/role-form/role-form.component';
import { Patient, Appointment, Role, DataService } from './services/data.service';


export type ActiveView = 'dashboard' | 'patient-list' | 'patient-form' | 'appointment-list' | 'profile' | 'role-list' | 'role-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, DashboardComponent, PatientFormComponent, PatientListComponent, AppointmentListComponent, LoginComponent, ProfileComponent, AppointmentFormComponent, RoleListComponent, RoleFormComponent]
})
export class AppComponent {
  private dataService = inject(DataService);

  isLoggedIn = signal(true);
  isSidebarOpen = signal(true);
  activeView = signal<ActiveView>('dashboard');
  patientToEdit = signal<Patient | null>(null);
  roleToEdit = signal<Role | null>(null);
  
  isProfileMenuOpen = signal(false);
  isAppointmentModalOpen = signal(false);
  appointmentToEdit = signal<Appointment | null>(null);

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
    if (view === 'role-form') {
      this.roleToEdit.set(null);
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

  onEditRole(role: Role) {
    this.roleToEdit.set(role);
    this.activeView.set('role-form');
    this.closeMobileSidebar();
  }

  onSaveRole(role: Role) {
    if (role.id) {
      this.dataService.updateRole(role);
    } else {
      this.dataService.addRole(role);
    }
    this.activeView.set('role-list');
  }

  onCancelRoleForm() {
    this.roleToEdit.set(null);
    this.activeView.set('role-list');
  }

  private closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
