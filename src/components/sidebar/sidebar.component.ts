
import { Component, ChangeDetectionStrategy, signal, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHtmlPipe } from '../../pipes/safe-html.pipe';
import { ActiveView } from '../../app.component';

interface SubMenuItem {
  name: string;
  active: boolean;
  view: ActiveView;
}

interface MenuItem {
  icon: string;
  name: string;
  active: boolean;
  badge?: number;
  subItems?: SubMenuItem[];
  expanded?: boolean;
  view?: ActiveView;
}

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  imports: [CommonModule, SafeHtmlPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  viewChange = output<ActiveView>();
  
  readonly menuItems = signal<MenuItem[]>([
    { 
      name: 'Dashboard', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />', 
      active: true,
      view: 'dashboard',
    },
    { 
      name: 'Pacientes', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-2.278 1 1 0 0 0 0-1.414L18.25 12.16a1 1 0 0 0-1.414 0l-1.625 1.625a1 1 0 0 1-1.414 0l-1.625-1.625a1 1 0 0 0-1.414 0L9 14.25l-2.28-2.28a1 1 0 0 0-1.414 1.414l2.28 2.28a1 1 0 0 0 1.414 0l1.625-1.625a1 1 0 0 1 1.414 0l1.625 1.625a1 1 0 0 0 1.414 0L15 19.128Z" />',
      active: false,
      expanded: false,
      subItems: [
        { name: 'Todos los Pacientes', active: false, view: 'patient-list' },
        { name: 'Añadir Nuevo', active: false, view: 'patient-form' },
      ]
    },
     { 
      name: 'Citas', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0h18M12 12.75h.008v.008H12v-.008Z" />',
      active: false,
      view: 'appointment-list'
    },
    { 
      name: 'Facturación', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h6m-6 2.25h6M3 17.25a1.5 1.5 0 0 1-1.5-1.5V6.75a1.5 1.5 0 0 1 1.5-1.5h15a1.5 1.5 0 0 1 1.5 1.5v8.25a1.5 1.5 0 0 1-1.5 1.5H3Z" />', 
      active: false, 
      view: 'dashboard' 
    },
    { 
      name: 'Configuración', 
      icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />', 
      active: false,
      expanded: false,
      subItems: [
        { name: 'Roles', active: false, view: 'role-list' },
        { name: 'Usuarios', active: false, view: 'dashboard' },
        { name: 'Sedes', active: false, view: 'dashboard' },
      ]
    },
  ]);

  readonly accountItems = signal<MenuItem[]>([
      { name: 'Mi Perfil', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />', active: false, view: 'profile'},
      { name: 'Ajustes', icon: '<path stroke-linecap="round" stroke-linejoin="round" d="M9.594 3.94c.09-.542.56-1.003 1.11-1.226M15 20.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm1.25-2.032c.318-.28.65-.544.996-.796M11.25 14.25a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm-1.542-2.032a2.25 2.25 0 0 0-2.226-2.226M15 3.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-3.456 2.032c.318.28.65.544.996.796M3 7.5a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm-1.542 2.032a2.25 2.25 0 0 0 2.226 2.226M3 15.75a2.25 2.25 0 1 1 4.5 0 2.25 2.25 0 0 1-4.5 0Zm1.542-2.032a2.25 2.25 0 0 0-2.226-2.226" />', active: false, view: 'dashboard'},
  ]);

  selectMenuItem(selectedItem: MenuItem) {
    if (selectedItem.subItems) {
      const isCurrentlyExpanded = !!this.menuItems().find(
        i => i.name === selectedItem.name
      )?.expanded;
      this.menuItems.update(items =>
        items.map(item => ({
          ...item,
          expanded: item.name === selectedItem.name ? !isCurrentlyExpanded : false,
        }))
      );
    } else {
      this.menuItems.update(items =>
        items.map(item => ({
          ...item,
          active: item.name === selectedItem.name,
          expanded: false,
          subItems: item.subItems
            ? item.subItems.map(si => ({ ...si, active: false }))
            : undefined,
        }))
      );
      this.accountItems.update(items => items.map(item => ({ ...item, active: false })));
      if (selectedItem.view) {
        this.viewChange.emit(selectedItem.view);
      }
    }
  }

  selectSubMenuItem(parentItem: MenuItem, selectedSubItem: SubMenuItem) {
    this.menuItems.update(items =>
      items.map(item => ({
        ...item,
        active: item.name === parentItem.name,
        expanded: item.name === parentItem.name, // Keep parent expanded, collapse others
        subItems: item.subItems?.map(sub => ({
          ...sub,
          active: sub.name === selectedSubItem.name,
        })),
      }))
    );
    this.accountItems.update(items => items.map(item => ({ ...item, active: false })));
    this.viewChange.emit(selectedSubItem.view);
  }

  selectAccountItem(selectedItem: MenuItem) {
    this.accountItems.update(items =>
      items.map(item => ({ ...item, active: item.name === selectedItem.name }))
    );
    this.menuItems.update(items =>
      items.map(item => ({
        ...item,
        active: false,
        expanded: false,
        subItems: item.subItems
          ? item.subItems.map(si => ({ ...si, active: false }))
          : undefined,
      }))
    );
    if (selectedItem.view) {
      this.viewChange.emit(selectedItem.view);
    }
  }
}
