import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../Services_groupe/forum.service';
import { Reply } from '../../../models/reply.model';

@Component({
  selector: 'app-reply-form',
  templateUrl: './reply-form.component.html',
  styleUrls: ['./reply-form.component.css']
})
export class ReplyFormComponent implements OnInit {
  @Input() threadId!: number;
  @Output() replyCreated = new EventEmitter<Reply>();
  @Output() cancel = new EventEmitter<void>();

  replyForm: FormGroup;
  submitting = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService
  ) {
    this.replyForm = this.fb.group({
      content: ['', [Validators.required, Validators.minLength(5)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.replyForm.invalid) {
      this.markFormGroupTouched(this.replyForm);
      return;
    }

    this.submitting = true;
    this.error = '';

    const newReply: Reply = this.replyForm.value;

    this.forumService.createReply(this.threadId, newReply).subscribe({
      next: (createdReply) => {
        this.submitting = false;
        this.replyForm.reset();
        this.replyCreated.emit(createdReply);
      },
      error: (error) => {
        this.submitting = false;
        this.error = 'Failed to create reply. Please try again.';
        console.error('Error creating reply:', error);
      }
    });
  }

  onCancel(): void {
    this.replyForm.reset();
    this.cancel.emit();
  }

  // Helper method to mark all controls as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
