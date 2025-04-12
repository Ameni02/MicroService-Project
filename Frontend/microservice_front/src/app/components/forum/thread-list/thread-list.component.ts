import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { ForumService } from '../../../services/forum.service';
import { Thread } from '../../../models/thread.model';

@Component({
  selector: 'app-thread-list',
  templateUrl: './thread-list.component.html',
  styleUrls: ['./thread-list.component.css']
})
export class ThreadListComponent implements OnInit, OnDestroy {
  @Output() threadSelected = new EventEmitter<Thread>();
  
  threads: Thread[] = [];
  loading = true;
  error = '';
  private subscription: Subscription | null = null;
  
  constructor(private forumService: ForumService) { }

  ngOnInit(): void {
    // Subscribe to threads observable from service
    this.subscription = this.forumService.threads$.subscribe({
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
    
    // Initial load of threads
    this.loadThreads();
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  loadThreads(): void {
    this.loading = true;
    this.error = '';
    
    this.forumService.getAllThreads().subscribe({
      error: (error) => {
        this.error = 'Failed to load threads. Please try again.';
        this.loading = false;
        console.error('Error loading threads:', error);
      }
    });
  }

  selectThread(thread: Thread): void {
    this.threadSelected.emit(thread);
  }

  getFormattedDate(date: Date | undefined): string {
    if (!date) return '';
    return new Date(date).toLocaleString();
  }

  getPreviewContent(content: string): string {
    return content.length > 150 ? content.substring(0, 150) + '...' : content;
  }
}
