
import { Component, ChangeDetectionStrategy, output } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent {
  sidebarToggle = output<void>();
}
