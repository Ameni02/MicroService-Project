import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForumService } from 'src/app/Services_groupe/forum.service';
import { Thread } from '../../../models/thread.model';
import { Reply } from '../../../models/reply.model';

@Component({
  selector: 'app-thread-detail',
  templateUrl: './thread-detail.component.html',
  styleUrls: ['./thread-detail.component.css']
})
export class ThreadDetailComponent implements OnInit, OnDestroy {
  @Input() thread: Thread | null = null;
  @Output() back = new EventEmitter<void>();

  showReplyForm = false;
  currentThread: Thread | null = null;
  loading = false;
  error = '';
  private subscription: Subscription | null = null;

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    // Subscribe to current thread observable from service
    this.subscription = this.forumService.currentThread$.subscribe({
      next: (thread) => {
        if (thread) {
          this.currentThread = thread;
          this.loading = false;
        }
      },
      error: (error) => {
        this.error = 'Failed to load thread details. Please try again.';
        this.loading = false;
        console.error('Error loading thread details:', error);
      }
    });

    // Load thread details if we have a thread ID
    if (this.thread && this.thread.id) {
      this.loadThreadDetails(this.thread.id);
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadThreadDetails(threadId: number): void {
    this.loading = true;
    this.error = '';

    this.forumService.getThreadById(threadId).subscribe({
      error: (error) => {
        this.error = 'Failed to load thread details. Please try again.';
        this.loading = false;
        console.error('Error loading thread details:', error);
      }
    });
  }

  toggleReplyForm(): void {
    this.showReplyForm = !this.showReplyForm;
  }

  onReplyCreated(): void {
    this.showReplyForm = false;

    // Reload thread details to get the new reply
    if (this.currentThread && this.currentThread.id) {
      this.loadThreadDetails(this.currentThread.id);
    }
  }

  // This method is kept for potential future use but is not currently exposed in the user interface
  // Only admin users can lock/unlock threads through the admin interface
  toggleThreadLock(): void {
    if (this.currentThread && this.currentThread.id) {
      this.forumService.toggleThreadLock(this.currentThread.id).subscribe({
        next: (updatedThread) => {
          this.currentThread = updatedThread;
        },
        error: (error) => {
          console.error('Error toggling thread lock:', error);
        }
      });
    }
  }

  goBack(): void {
    this.back.emit();
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }
}
