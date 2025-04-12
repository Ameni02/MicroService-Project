import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-status-badge',
  template: `
    <span class="status-badge" [ngClass]="{
      'status-open': status === 'OPEN',
      'status-in-progress': status === 'IN_PROGRESS',
      'status-resolved': status === 'RESOLVED',
      'status-archived': isArchived
    }">
      {{ status }}
    </span>
  `,
  styles: [`
    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 1rem;
      font-size: 0.875rem;
      font-weight: 500;
    }
    .status-open {
      background-color: #e3f2fd;
      color: #1976d2;
    }
    .status-in-progress {
      background-color: #fff3e0;
      color: #f57c00;
    }
    .status-resolved {
      background-color: #e8f5e9;
      color: #388e3c;
    }
    .status-archived {
      background-color: #f5f5f5;
      color: #616161;
    }
  `]
})
export class StatusBadgeComponent {
  @Input() status: string = '';
  @Input() isArchived: boolean = false;
} 
