
import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService, Location } from '../../services/data.service';
import { LocationFormComponent } from '../location-form/location-form.component';

@Component({
  selector: 'app-location-list',
  standalone: true,
  templateUrl: './location-list.component.html',
  imports: [CommonModule, LocationFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LocationListComponent {
  private dataService = inject(DataService);
  locations = this.dataService.locations;

  isModalOpen = signal(false);
  locationToEdit = signal<Location | null>(null);

  openAddModal() {
    this.locationToEdit.set(null);
    this.isModalOpen.set(true);
  }

  openEditModal(location: Location) {
    this.locationToEdit.set(location);
    this.isModalOpen.set(true);
  }

  handleCloseModal() {
    this.isModalOpen.set(false);
    this.locationToEdit.set(null);
  }

  handleSaveLocation(location: Location) {
    if (location.id) {
      this.dataService.updateLocation(location);
    } else {
      this.dataService.addLocation(location);
    }
    this.handleCloseModal();
  }

  deleteLocation(id: number | undefined) {
    if (id !== undefined && confirm('¿Está seguro de que desea eliminar esta sede?')) {
      this.dataService.deleteLocation(id);
    }
  }
}
