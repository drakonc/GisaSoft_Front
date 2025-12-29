
import { Component, ChangeDetectionStrategy, output, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Appointment } from '../../services/data.service';

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppointmentFormComponent implements OnInit {
  appointment = input<Appointment | null>(null);
  save = output<Appointment>();
  close = output<void>();

  appointmentForm = this.fb.group({
    id: [null as number | null],
    patientName: ['', Validators.required],
    doctorName: ['', Validators.required],
    date: ['', Validators.required],
    time: ['', Validators.required],
    status: ['scheduled' as 'scheduled' | 'completed' | 'canceled', Validators.required]
  });
  
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const appointmentData = this.appointment();
    if (appointmentData) {
      this.appointmentForm.patchValue(appointmentData);
    }
  }

  get f() { return this.appointmentForm.controls; }

  onSubmit() {
    if (this.appointmentForm.valid) {
      this.save.emit(this.appointmentForm.getRawValue() as Appointment);
    } else {
      this.appointmentForm.markAllAsTouched();
    }
  }
}
