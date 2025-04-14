import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-rating-stars',
  template: `
    <div class="rating-stars" [class.editable]="editable">
      <span *ngFor="let star of stars; let i = index"
            class="star"
            [class.filled]="i < rating"
            (click)="onStarClick(i + 1)">
        ★
      </span>
    </div>
  `,
  styles: [`
    .rating-stars {
      display: inline-flex;
      gap: 4px;
    }
    .star {
      font-size: 1.25rem;
      color: #ddd;
      cursor: default;
    }
    .star.filled {
      color: #ffd700;
    }
    .editable .star {
      cursor: pointer;
    }
    .editable .star:hover {
      color: #ffd700;
    }
  `]
})
export class RatingStarsComponent {
  @Input() rating: number = 0;
  @Input() editable: boolean = false;
  @Output() ratingChange = new EventEmitter<number>();

  stars = Array(5).fill(0);

  onStarClick(rating: number): void {
    if (this.editable) {
      this.rating = rating;
      this.ratingChange.emit(rating);
    }
  }
}
