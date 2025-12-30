
import { Component, ChangeDetectionStrategy, output, input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Location } from '../../services/data.service';

@Component({
  selector: 'app-location-form',
  standalone: true,
  templateUrl: './location-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationFormComponent implements OnInit {
  location = input<Location | null>(null);
  save = output<Location>();
  close = output<void>();

  private fb = inject(FormBuilder);

  locationForm = this.fb.group({
    id: [null as number | null],
    name: ['', Validators.required],
    address: ['', Validators.required],
    phone: ['', Validators.required],
    city: ['', Validators.required],
  });

  readonly title = computed(() => this.location() ? 'Editar Sede' : 'Añadir Nueva Sede');

  ngOnInit() {
    const locationData = this.location();
    if (locationData) {
      this.locationForm.patchValue(locationData);
    }
  }

  get f() { return this.locationForm.controls; }

  onSubmit() {
    if (this.locationForm.valid) {
      this.save.emit(this.locationForm.getRawValue() as Location);
    } else {
      this.locationForm.markAllAsTouched();
    }
  }
}
