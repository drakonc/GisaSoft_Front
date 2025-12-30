
import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RoleListComponent } from './components/role-list/role-list.component';
import { InvoiceListComponent } from './components/invoice-list/invoice-list.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { Appointment, DataService, User } from './services/data.service';

export type ActiveView = 'dashboard' | 'patient-list' | 'appointment-list' | 'profile' | 'role-list' | 'invoice-list' | 'user-list' | 'location-list' | 'user-form';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SidebarComponent, DashboardComponent, PatientListComponent, AppointmentListComponent, 
    LoginComponent, ProfileComponent, AppointmentFormComponent, RoleListComponent,
    InvoiceListComponent, UserListComponent, LocationListComponent, UserFormComponent
  ]
})
export class AppComponent {
  private dataService = inject(DataService);

  isLoggedIn = signal(false);
  isSidebarOpen = signal(true);
  activeView = signal<ActiveView>('dashboard');
  
  isProfileMenuOpen = signal(false);
  isAppointmentModalOpen = signal(false);
  appointmentToEdit = signal<Appointment | null>(null);
  userToEdit = signal<User | null>(null);

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
    this.activeView.set(view);
    this.isProfileMenuOpen.set(false);
    this.closeMobileSidebar();
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

  onAddUser() {
    this.userToEdit.set(null);
    this.onViewChange('user-form');
  }

  onEditUser(user: User) {
    this.userToEdit.set(user);
    this.onViewChange('user-form');
  }

  onSaveUser(user: User) {
    if (user.id) {
      this.dataService.updateUser(user);
    } else {
      this.dataService.addUser(user);
    }
    this.onViewChange('user-list');
  }

  onCancelUserForm() {
    this.userToEdit.set(null);
    this.onViewChange('user-list');
  }

  private closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
