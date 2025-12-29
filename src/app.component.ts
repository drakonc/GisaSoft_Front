
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PatientFormComponent } from './components/patient-form/patient-form.component';
import { PatientListComponent } from './components/patient-list/patient-list.component';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { Patient, DataService } from './services/data.service';
import { inject } from '@angular/core';

export type ActiveView = 'dashboard' | 'patient-list' | 'patient-form' | 'appointment-list' | 'profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SidebarComponent, DashboardComponent, PatientFormComponent, PatientListComponent, AppointmentListComponent, LoginComponent, ProfileComponent]
})
export class AppComponent {
  private dataService = inject(DataService);

  isLoggedIn = signal(false);
  isSidebarOpen = signal(false);
  activeView = signal<ActiveView>('dashboard');
  patientToEdit = signal<Patient | null>(null);

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

  onViewChange(view: ActiveView) {
    if (view === 'patient-form') {
      this.patientToEdit.set(null); // Ensure we're in "add" mode by default
    }
    this.activeView.set(view);
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

  private closeMobileSidebar() {
    if (window.innerWidth < 1024) {
      this.isSidebarOpen.set(false);
    }
  }
}
