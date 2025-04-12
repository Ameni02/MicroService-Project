import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ForumService } from '../../../services/forum.service';
import { Thread } from '../../../models/thread.model';

@Component({
  selector: 'app-thread-form',
  templateUrl: './thread-form.component.html',
  styleUrls: ['./thread-form.component.css']
})
export class ThreadFormComponent implements OnInit {
  @Output() threadCreated = new EventEmitter<Thread>();
  @Output() cancel = new EventEmitter<void>();
  
  threadForm: FormGroup;
  submitting = false;
  error = '';
  
  constructor(
    private fb: FormBuilder,
    private forumService: ForumService
  ) {
    this.threadForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      content: ['', [Validators.required, Validators.minLength(10)]],
      author: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.threadForm.invalid) {
      this.markFormGroupTouched(this.threadForm);
      return;
    }
    
    this.submitting = true;
    this.error = '';
    
    const newThread: Thread = this.threadForm.value;
    
    this.forumService.createThread(newThread).subscribe({
      next: (createdThread) => {
        this.submitting = false;
        this.threadForm.reset();
        this.threadCreated.emit(createdThread);
      },
      error: (error) => {
        this.submitting = false;
        this.error = 'Failed to create thread. Please try again.';
        console.error('Error creating thread:', error);
      }
    });
  }

  onCancel(): void {
    this.threadForm.reset();
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
