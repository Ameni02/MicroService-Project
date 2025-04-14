import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseService } from '../../../Services_groupe/response.service';
import { Response } from '../../../models/response.model';

@Component({
  selector: 'app-response-form',
  templateUrl: './response-form.component.html',
  styleUrls: ['./response-form.component.css']
})
export class ResponseFormComponent implements OnInit {
  @Input() feedbackId: string = '';
  @Output() submit = new EventEmitter<Response>();
  @Output() cancel = new EventEmitter<void>();

  responseForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private responseService: ResponseService
  ) {
    this.responseForm = this.fb.group({
      author: ['', [Validators.required, Validators.minLength(3)]],
      content: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.responseForm.valid) {
      this.loading = true;
      const responseData = {
        ...this.responseForm.value,
        feedbackId: this.feedbackId
      };

      this.responseService.createResponse(responseData).subscribe({
        next: (response) => {
          this.submit.emit(response);
          this.resetForm();
        },
        error: (err) => {
          this.error = 'Failed to create response';
          this.loading = false;
        }
      });
    }
  }

  resetForm(): void {
    this.responseForm.reset();
    this.loading = false;
    this.error = null;
  }
}
