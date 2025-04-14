import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  standalone: true,
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  @Input() isArchived: boolean = false;

  get statusClass(): string {
    if (this.isArchived) {
      return 'archived';
    }
    return this.status.toLowerCase();
  }
}
