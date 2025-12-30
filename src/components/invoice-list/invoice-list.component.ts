
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Invoice } from '../../services/data.service';
import { InvoiceFormComponent } from '../invoice-form/invoice-form.component';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  templateUrl: './invoice-list.component.html',
  imports: [CommonModule, InvoiceFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InvoiceListComponent {
  private dataService = inject(DataService);
  invoices = this.dataService.invoices;

  isModalOpen = signal(false);
  invoiceToEdit = signal<Invoice | null>(null);

  openAddModal() {
    this.invoiceToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(invoice: Invoice) {
    this.invoiceToEdit.set(invoice);
    this.isModalOpen.set(true);
  }

  handleCloseModal() {
    this.isModalOpen.set(false);
    this.invoiceToEdit.set(null);
  }

  handleSaveInvoice(invoice: Invoice) {
    if (invoice.id) {
      this.dataService.updateInvoice(invoice);
    } else {
      this.dataService.addInvoice(invoice);
    }
    this.handleCloseModal();
  }

  deleteInvoice(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar esta factura?')) {
      this.dataService.deleteInvoice(id);
    }
  }

  getStatusClass(status: 'paid' | 'pending' | 'overdue') {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
    }
  }

  formatCurrency(amount: number) {
    return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(amount);
  }
}
