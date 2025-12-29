
import { Component, ChangeDetectionStrategy, output, input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Patient } from '../../services/data.service';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PatientFormComponent implements OnInit {
  sidebarToggle = output<void>();
  patient = input<Patient | null>(null);
  save = output<Patient>();
  cancel = output<void>();

  patientForm = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    condition: [null as 'Cardiología' | 'Neurología' | 'Oncología' | 'General' | null, Validators.required],
    lastAppointment: ['', Validators.required],
    notes: ['', Validators.maxLength(500)],
    isActive: [true],
    status: ['active' as 'active' | 'discharged', Validators.required]
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const patientData = this.patient();
    if (patientData) {
      this.patientForm.patchValue(patientData);
    }
  }

  get f() { return this.patientForm.controls; }

  onSubmit() {
    if (this.patientForm.valid) {
      this.save.emit(this.patientForm.getRawValue() as Patient);
    } else {
      this.patientForm.markAllAsTouched();
    }
  }
}
