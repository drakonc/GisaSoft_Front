
import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';

interface StatCard {
  title: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
  iconBg: string;
  iconPath: string;
}

interface RevenueData {
  month: string;
  value: number;
}

interface RecentAppointment {
    patientImage: string;
    patientName: string;
    doctorName: string;
    time: string;
    status: 'scheduled' | 'completed' | 'canceled';
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [CommonModule, SafeHtmlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  readonly activeTab = signal<'overview' | 'activity'>('overview');

  readonly stats = signal<StatCard[]>([
    { title: 'Pacientes Activos', value: '352', change: '+15 este mes', changeType: 'increase', iconBg: 'bg-blue-100', iconPath: 'M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.278 1 1 0 0 0 0-1.414L18.25 12.16a1 1 0 0 0-1.414 0l-1.625 1.625a1 1 0 0 1-1.414 0l-1.625-1.625a1 1 0 0 0-1.414 0L9 14.25l-2.28-2.28a1 1 0 0 0-1.414 1.414l2.28 2.28a1 1 0 0 0 1.414 0l1.625-1.625a1 1 0 0 1 1.414 0l1.625 1.625a1 1 0 0 0 1.414 0L15 19.128Z' },
    { title: 'Citas Hoy', value: '28', change: '60% completadas', changeType: 'neutral', iconBg: 'bg-indigo-100', iconPath: 'M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z' },
    { title: 'Total de Pacientes', value: '1,245', change: '7% de crecimiento', changeType: 'increase', iconBg: 'bg-emerald-100', iconPath: 'm12.71,6.29a1,1,0,0,0-1.42,0L3.71,13.85a1,1,0,0,0,0,1.42,1,1,0,0,0,1.41,0l7.59-7.59a1,1,0,0,0,0-1.42Z' },
    { title: 'Tasa de Recuperación', value: '89.5%', change: '4.8% más que ayer', changeType: 'increase', iconBg: 'bg-rose-100', iconPath: 'm20.29,8.29-4-4a1,1,0,0,0-1.42,1.42l1.29,1.29H8A1,1,0,0,0,8,9h9.17l-1.3,1.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,0-1.42Z' },
  ]);

  readonly revenueData = signal<RevenueData[]>([
    { month: 'Ene', value: 20 }, { month: 'Feb', value: 30 }, { month: 'Mar', value: 25 },
    { month: 'Abr', value: 45 }, { month: 'May', value: 35 }, { month: 'Jun', value: 50 },
    { month: 'Jul', value: 22 }, { month: 'Ago', value: 32 }, { month: 'Sep', value: 28 },
    { month: 'Oct', value: 18 }, { month: 'Nov', value: 29 }, { month: 'Dic', value: 33 },
  ]);

  readonly recentAppointments = signal<RecentAppointment[]>([
    { patientImage: 'https://i.pravatar.cc/150?u=carlos', patientName: 'Carlos Ramirez', doctorName: 'Dr. Garcia', time: '10:00 AM', status: 'scheduled' },
    { patientImage: 'https://i.pravatar.cc/150?u=sofia', patientName: 'Sofia Torres', doctorName: 'Dra. Hernandez', time: '11:30 AM', status: 'completed' },
    { patientImage: 'https://i.pravatar.cc/150?u=ana', patientName: 'Ana Gomez', doctorName: 'Dr. Garcia', time: '09:00 AM', status: 'canceled' },
  ]);

  getChangeClass(changeType: 'increase' | 'decrease' | 'neutral'): string {
    switch (changeType) {
      case 'increase': return 'text-green-500 bg-green-100/60';
      case 'decrease': return 'text-red-500 bg-red-100/60';
      case 'neutral': return 'text-indigo-500 bg-indigo-100/60';
      default: return '';
    }
  }

  getStatusClass(status: 'scheduled' | 'completed' | 'canceled'): string {
    switch (status) {
      case 'scheduled': return 'text-blue-500';
      case 'completed': return 'text-green-500';
      case 'canceled': return 'text-red-500';
      default: return '';
    }
  }
}
