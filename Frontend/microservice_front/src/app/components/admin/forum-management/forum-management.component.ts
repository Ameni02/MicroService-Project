import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../../Services_groupe/forum.service';
import { Thread } from '../../../models/thread.model';

@Component({
  selector: 'app-forum-management',
  templateUrl: './forum-management.component.html',
  styleUrls: ['./forum-management.component.css']
})
export class ForumManagementComponent implements OnInit {
  threads: Thread[] = [];
  selectedThread: Thread | null = null;
  loading = false;
  error = '';

  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    this.loadThreads();
  }

  loadThreads(): void {
    this.loading = true;
    this.error = '';

    this.forumService.getAllThreads().subscribe({
      next: (threads) => {
        this.threads = threads;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Failed to load threads. Please try again.';
        this.loading = false;
        console.error('Error loading threads:', error);
      }
    });
  }

  viewThreadDetails(thread: Thread): void {
    if (thread.id) {
      this.loading = true;
      this.forumService.getThreadById(thread.id).subscribe({
        next: (threadDetails) => {
          this.selectedThread = threadDetails;
          this.loading = false;
        },
        error: (error) => {
          this.error = 'Failed to load thread details. Please try again.';
          this.loading = false;
          console.error('Error loading thread details:', error);
        }
      });
    }
  }

  closeThreadDetails(): void {
    this.selectedThread = null;
  }

  toggleThreadLock(thread: Thread, event: Event): void {
    event.stopPropagation();

    if (thread.id) {
      this.forumService.toggleThreadLock(thread.id).subscribe({
        next: (updatedThread) => {
          // Update the thread in the list
          const index = this.threads.findIndex(t => t.id === thread.id);
          if (index !== -1) {
            this.threads[index] = updatedThread;
          }

          // Update selected thread if it's the same one
          if (this.selectedThread && this.selectedThread.id === thread.id) {
            this.selectedThread = updatedThread;
          }
        },
        error: (error) => {
          console.error('Error toggling thread lock:', error);
        }
      });
    }
  }

  deleteThread(thread: Thread, event: Event): void {
    event.stopPropagation();

    if (!confirm(`Are you sure you want to delete the thread "${thread.title}"?`)) {
      return;
    }

    if (thread.id) {
      this.forumService.deleteThread(thread.id).subscribe({
        next: () => {
          // Remove the thread from the list
          this.threads = this.threads.filter(t => t.id !== thread.id);

          // Close thread details if it's the same one
          if (this.selectedThread && this.selectedThread.id === thread.id) {
            this.selectedThread = null;
          }
        },
        error: (error) => {
          console.error('Error deleting thread:', error);
        }
      });
    }
  }

  deleteReply(replyId: number | undefined, threadId: number | undefined): void {
    if (!replyId || !threadId) return;

    if (!confirm('Are you sure you want to delete this reply?')) {
      return;
    }

    this.forumService.deleteReply(threadId, replyId).subscribe({
      next: () => {
        // Refresh thread details
        if (this.selectedThread && this.selectedThread.id === threadId) {
          this.viewThreadDetails(this.selectedThread);
        }
      },
      error: (error) => {
        console.error('Error deleting reply:', error);
      }
    });
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }
}
