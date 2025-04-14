import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ResponseService } from '../../../Services_groupe/response.service';
import { Response } from '../../../models/response.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-response-list',
  templateUrl: './response-list.component.html',
  styleUrls: ['./response-list.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class ResponseListComponent implements OnInit {
  responses: Response[] = [];
  loading = false;
  error: string | null = null;
  feedbackId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private responseService: ResponseService
  ) {}

  ngOnInit(): void {
    this.feedbackId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.feedbackId) {
      this.loadResponses();
    }
  }

  loadResponses(): void {
    if (!this.feedbackId) return;

    this.loading = true;
    this.error = null;

    this.responseService.getResponsesByFeedbackId(this.feedbackId).subscribe({
      next: (responses) => {
        this.responses = responses;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load responses';
        this.loading = false;
      }
    });
  }
}
