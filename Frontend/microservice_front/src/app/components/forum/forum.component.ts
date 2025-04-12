import { Component, OnInit } from '@angular/core';
import { ForumService } from '../../services/forum.service';
import { Thread } from '../../models/thread.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  showNewThreadForm = false;
  selectedThread: Thread | null = null;
  
  constructor(public forumService: ForumService) { }

  ngOnInit(): void {
    // Load all threads when component initializes
    this.loadThreads();
  }

  loadThreads(): void {
    this.forumService.getAllThreads().subscribe({
      next: () => {
        // Data is handled by the BehaviorSubject in the service
      },
      error: (error) => {
        console.error('Error loading threads:', error);
      }
    });
  }

  toggleNewThreadForm(): void {
    this.showNewThreadForm = !this.showNewThreadForm;
  }

  onThreadCreated(): void {
    this.showNewThreadForm = false;
    this.loadThreads();
  }

  onThreadSelected(thread: Thread): void {
    this.selectedThread = thread;
    this.forumService.getThreadById(thread.id!).subscribe({
      error: (error) => {
        console.error('Error loading thread details:', error);
      }
    });
  }

  closeThreadDetails(): void {
    this.selectedThread = null;
  }
}
