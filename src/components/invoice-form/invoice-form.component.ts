
import { Component, ChangeDetectionStrategy, output, input, OnInit, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Invoice } from '../../services/data.service';

@Component({
  selector: 'app-invoice-form',
  standalone: true,
  templateUrl: './invoice-form.component.html',
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceFormComponent implements OnInit {
  invoice = input<Invoice | null>(null);
  save = output<Invoice>();
  close = output<void>();

  private fb = inject(FormBuilder);

  invoiceForm = this.fb.group({
    id: [null as number | null],
    invoiceNumber: ['', Validators.required],
    patientName: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(0.01)]],
    date: ['', Validators.required],
    status: ['pending' as 'paid' | 'pending' | 'overdue', Validators.required]
  });

  readonly title = computed(() => this.invoice() ? 'Editar Factura' : 'Añadir Nueva Factura');

  ngOnInit() {
    const invoiceData = this.invoice();
    if (invoiceData) {
      this.invoiceForm.patchValue(invoiceData);
    }
  }

  get f() { return this.invoiceForm.controls; }

  onSubmit() {
    if (this.invoiceForm.valid) {
      this.save.emit(this.invoiceForm.getRawValue() as Invoice);
    } else {
      this.invoiceForm.markAllAsTouched();
    }
  }
}
